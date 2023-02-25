import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));

router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/home", component: "home-page" },
  { path: "/newroom", component: "newroom-page" },
  { path: "(.*)", redirect: "/home" },
]);
