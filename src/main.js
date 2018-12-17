import Vue from "vue";
import App from "./App.vue";
import store from "./store/app.store";
import router from "./store/app.routes";
import "./assets/main.css";
import moment from "moment";

Vue.filter("formatDateShort", function(value) {
  if (value) {
    return moment(String(value)).format("MMMM Do");
  }
});

Vue.filter("formatDateLong", function(value) {
  if (value) {
    return moment(String(value)).format("MMMM Do YYYY");
  }
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
