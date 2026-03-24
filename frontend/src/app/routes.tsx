import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";
import MatchingGame from "./pages/MatchingGame";
import WritingPractice from "./pages/WritingPractice";
import LearningPath from "./pages/LearningPath";
import Vocabulary from "./pages/Vocabulary";
import Grammar from "./pages/Grammar";
import GroupLearning from "./pages/GroupLearning";
import SpeakingPractice from "./pages/SpeakingPractice";
import VideoLessons from "./pages/VideoLessons";
import Decks from "./pages/Decks";
import DeckCreate from "./pages/DeckCreate";
import DeckDetail from "./pages/DeckDetail";
import Practice from "./pages/Practice";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/flashcards",
    Component: Flashcards,
  },
  {
    path: "/flashcards/:deckId",
    Component: Flashcards,
  },
  {
    path: "/quiz",
    Component: Quiz,
  },
  {
    path: "/quiz/:deckId",
    Component: Quiz,
  },
  {
    path: "/matching",
    Component: MatchingGame,
  },
  {
    path: "/matching/:deckId",
    Component: MatchingGame,
  },
  {
    path: "/writing",
    Component: WritingPractice,
  },
  {
    path: "/writing/:deckId",
    Component: WritingPractice,
  },
  {
    path: "/learning-path",
    Component: LearningPath,
  },
  {
    path: "/vocabulary",
    Component: Vocabulary,
  },
  {
    path: "/grammar",
    Component: Grammar,
  },
  {
    path: "/group",
    Component: GroupLearning,
  },
  {
    path: "/speaking",
    Component: SpeakingPractice,
  },
  {
    path: "/videos",
    Component: VideoLessons,
  },
  {
    path: "/decks",
    Component: Decks,
  },
  {
    path: "/decks/new",
    Component: DeckCreate,
  },
  {
    path: "/decks/:deckId",
    Component: DeckDetail,
  },
  {
    path: "/practice",
    Component: Practice,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
