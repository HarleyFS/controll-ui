import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("@/views/DashboardView.vue"),
    },
    {
      path: "/agenda",
      name: "/agenda",
      component: () => import("../views/AgendaView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/pacient",
      component: () => import("../views/PatientView.vue"),
      children: [
        {
          path: "",
          name: "pacient",
          component: () => import("../views/patient/PatientList.vue"),
        },
      ],
    },
  ],
});

export default router;
