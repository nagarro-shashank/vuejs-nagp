import Vue from "vue";
import Router from "vue-router";
import MainSection from "../components/views/MainSection.vue";
import Register from "../components/views/Register.vue";
import Login from "../components/views/Login.vue";
import Profile from "../components/views/Profile.vue";
import AddEditArticle from "../components/views/AddEditArticle.vue";
import UserArticles from "../components/views/UserArticles.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: MainSection
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile
    },
    {
      path: "/article/:slug",
      name: "ArticleDetails",
      props: true,
      component: AddEditArticle
    },
    {
      path: "/userArticles/:user",
      name: "UserArticles",
      props: true,
      component: UserArticles
    }
  ]
});
