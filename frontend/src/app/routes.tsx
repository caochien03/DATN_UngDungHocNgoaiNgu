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
    path: "/quiz",
    Component: Quiz,
  },
  {
    path: "/matching",
    Component: MatchingGame,
  },
  {
    path: "/writing",
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
    path: "*",
    Component: NotFound,
  },
]);
