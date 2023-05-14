import { createRouter, createWebHistory } from "vue-router";
import { userStore } from "@/stores/user-store";
import AuthService from "@/services/AuthenticationService";

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
          meta: { requiresAuth: true },
          component: () => import("@/views/DashboardView.vue"),
        },

        {
          path: "/patient",
          component: () => import("../views/PatientView.vue"),
          meta: { requiresAuth: true },
          children: [
            {
              path: "",
              name: "patient",
              meta: { requiresAuth: true },
              component: () => import("../views/patient/PatientList.vue"),
            },
          ],
        },

        {
          path: "/doctor",
          component: () => import("../views/DoctorView.vue"),
          children: [
            {
              path: "",
              name: "doctor",
              meta: { requiresAuth: true },
              component: () => import("../views/doctor/DoctorList.vue"),
            },
          ],
        },

        {
          path: "/agenda",
          name: "/agenda",
          meta: { requiresAuth: true },
          component: () => import("../views/AgendaView.vue"),
        },
      ],
    },

    {
      path: "/login",
      name: "login",
      meta: { requiresAuth: false },
      component: () => import("@/views/LoginView.vue"),
    },

    {
      path: "/register",
      name: "register",
      meta: { requiresAuth: false },
      component: () => import("@/views/RegisterView.vue"),
    },

    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

router.beforeEach(async (to, from, next) => {
  console.log("VERIFICANDO TOKEN...");
  const store = userStore();
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("token");
    if (to.name !== "login" && token != null) {
      await AuthService.verifyToken(token)
        .then((response) => {
          store.token = response.data;
          next();
        })
        .catch(() => {
          next({ name: "login" });
        });
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
