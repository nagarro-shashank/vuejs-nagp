<template>
  <div id="app">
    <Header></Header>
    <GlobalNotifications></GlobalNotifications>
    <main><router-view /></main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import GlobalNotifications from "./components/sections/GlobalNotifications";
export default {
  name: "app",
  components: {
    Header,
    Footer,
    GlobalNotifications
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.getters.getCurrentUser;
    },
    notifications() {
      return this.$store.getters.getNotifications;
    }
  }
};
</script>

<style>
@import url("http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css");
@import url("https://fonts.googleapis.com/css?family=Titillium+Web");
</style>
