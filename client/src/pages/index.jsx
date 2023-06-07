import { createBrowserRouter } from "react-router-dom";

import Error from "./Error";
import Signin from "./Signin";
import Signup from "./Signup";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "signin",
    element: <Signin />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);

export default router;
