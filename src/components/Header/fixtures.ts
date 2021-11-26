import { Routes } from "../../constants";

interface Route {
  name: string;
  path: Routes;
}

export const routes: Route[] = [
  {
    path: Routes.HOME,
    name: "Home",
  },
  {
    path: Routes.POSTS,
    name: "Posts",
  },
  {
    name: "Todos",
    path: Routes.TODOS,
  },
];
