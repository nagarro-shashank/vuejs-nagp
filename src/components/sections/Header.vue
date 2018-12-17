<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link active" to="/">Home</router-link>
        </li>
        <li v-if="loggedIn" class="nav-item">
          <router-link class="nav-link" to="/article/create">
            <i class="ion-compose"></i>&nbsp;New Post
          </router-link>
        </li>
        <li v-if="loggedIn" class="nav-item">
          <router-link class="nav-link" to="/profile">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li v-if="!loggedIn" class="nav-item">
          <router-link class="nav-link" to="/login"> Sign in </router-link>
        </li>
        <li v-if="!loggedIn" class="nav-item">
          <router-link class="nav-link" to="/register"> Sign up </router-link>
        </li>
        <li v-if="loggedIn" class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: 'UserArticles', params: { user: 'current' } }"
          >
            {{ user.username }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Header",
  computed: {
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.getters.getCurrentUser;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
