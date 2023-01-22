import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/HomeView.vue"),
      children: [
        {
          path: "/",
          name: "dashboard",
          component: () => import("@/views/DashboardView.vue"),
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

        {
          path: "/agenda",
          name: "/agenda",
          component: () => import("../views/AgendaView.vue"),
        },
      ],
    },

    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },

    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
    },

    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
