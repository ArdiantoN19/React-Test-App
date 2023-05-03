import { lazy } from "react";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";

const QuestionComponent = lazy(() => import("../pages/questions/Question"));
const ReviewComponent = lazy(() => import("../pages/review/Review"));

const withoutAuthUser = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/*",
    element: <h1>Not Found Page</h1>,
  },
];

const withAuthUser = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/question/:id",
    element: <QuestionComponent />,
  },
  {
    path: "/review/:id",
    element: <ReviewComponent />,
  },
  {
    path: "/*",
    element: <h1>Not Found Page</h1>,
  },
];

export { withAuthUser, withoutAuthUser };
