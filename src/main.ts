import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VueTheMask from "vue-the-mask";

//import "./assets/main.css";
import "v-calendar/dist/style.css";
import "@fortawesome/fontawesome-free/css/all.css";
import moment from "moment";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueTheMask as any);

app.mount("#app");

Date.prototype.toISOString = function () {
  return moment(this).format("YYYY-MM-DDTHH:mm:ss");
};
