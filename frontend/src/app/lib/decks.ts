export type LanguageCode = string;

export type DeckId = string;
export type CardId = string;

export interface Card {
  id: CardId;
  front: string;
  back: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface Deck {
  id: DeckId;
  title: string;
  description?: string;
  sourceLanguageCode: LanguageCode; // front
  targetLanguageCode: LanguageCode; // back
  isPublic: boolean;
  cards: Card[];
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

const STORAGE_KEY = "llw.decks.v1";

function nowIso() {
  return new Date().toISOString();
}

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function getUUID() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function listDecks(): Deck[] {
  const raw = safeParse<Deck[]>(localStorage.getItem(STORAGE_KEY));
  if (!raw) return [];
  // Defensive: ensure cards array exists
  return raw.map((d) => ({ ...d, cards: Array.isArray(d.cards) ? d.cards : [] }));
}

export function getDeck(deckId: DeckId): Deck | null {
  return listDecks().find((d) => d.id === deckId) ?? null;
}

function saveDecks(decks: Deck[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

export function createDeck(input: {
  title: string;
  description?: string;
  sourceLanguageCode: LanguageCode;
  targetLanguageCode: LanguageCode;
  isPublic?: boolean;
}): Deck {
  const decks = listDecks();
  const t = nowIso();
  const deck: Deck = {
    id: getUUID(),
    title: input.title.trim(),
    description: input.description?.trim() || undefined,
    sourceLanguageCode: input.sourceLanguageCode.trim(),
    targetLanguageCode: input.targetLanguageCode.trim(),
    isPublic: input.isPublic ?? false,
    cards: [],
    createdAt: t,
    updatedAt: t,
  };
  saveDecks([deck, ...decks]);
  return deck;
}

export function updateDeck(deckId: DeckId, patch: Partial<Omit<Deck, "id" | "cards" | "createdAt">>) {
  const decks = listDecks();
  const idx = decks.findIndex((d) => d.id === deckId);
  if (idx === -1) return;

  const prev = decks[idx];
  const next: Deck = {
    ...prev,
    ...patch,
    title: patch.title !== undefined ? patch.title.trim() : prev.title,
    description:
      patch.description !== undefined ? patch.description?.trim() || undefined : prev.description,
    sourceLanguageCode:
      patch.sourceLanguageCode !== undefined ? patch.sourceLanguageCode.trim() : prev.sourceLanguageCode,
    targetLanguageCode:
      patch.targetLanguageCode !== undefined ? patch.targetLanguageCode.trim() : prev.targetLanguageCode,
    updatedAt: nowIso(),
  };
  decks[idx] = next;
  saveDecks(decks);
}

export function deleteDeck(deckId: DeckId) {
  const decks = listDecks().filter((d) => d.id !== deckId);
  saveDecks(decks);
}

export function addCard(deckId: DeckId, input: { front: string; back: string }): Card | null {
  const decks = listDecks();
  const idx = decks.findIndex((d) => d.id === deckId);
  if (idx === -1) return null;

  const t = nowIso();
  const card: Card = {
    id: getUUID(),
    front: input.front.trim(),
    back: input.back.trim(),
    createdAt: t,
    updatedAt: t,
  };
  const deck = decks[idx];
  decks[idx] = { ...deck, cards: [card, ...deck.cards], updatedAt: t };
  saveDecks(decks);
  return card;
}

export function updateCard(deckId: DeckId, cardId: CardId, patch: Partial<Pick<Card, "front" | "back">>) {
  const decks = listDecks();
  const dIdx = decks.findIndex((d) => d.id === deckId);
  if (dIdx === -1) return;

  const deck = decks[dIdx];
  const cIdx = deck.cards.findIndex((c) => c.id === cardId);
  if (cIdx === -1) return;

  const prev = deck.cards[cIdx];
  const next: Card = {
    ...prev,
    ...patch,
    front: patch.front !== undefined ? patch.front.trim() : prev.front,
    back: patch.back !== undefined ? patch.back.trim() : prev.back,
    updatedAt: nowIso(),
  };

  const nextCards = [...deck.cards];
  nextCards[cIdx] = next;
  decks[dIdx] = { ...deck, cards: nextCards, updatedAt: nowIso() };
  saveDecks(decks);
}

export function deleteCard(deckId: DeckId, cardId: CardId) {
  const decks = listDecks();
  const dIdx = decks.findIndex((d) => d.id === deckId);
  if (dIdx === -1) return;

  const deck = decks[dIdx];
  const nextCards = deck.cards.filter((c) => c.id !== cardId);
  decks[dIdx] = { ...deck, cards: nextCards, updatedAt: nowIso() };
  saveDecks(decks);
}

