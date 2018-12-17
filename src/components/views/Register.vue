<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a @click.prevent="goToLogin" href="">Have an account?</a>
          </p>
          <form @submit.prevent="handleSubmit">
            <fieldset class="form-group">
              <input
                required
                class="form-control form-control-lg"
                v-model="user.username"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                required
                class="form-control form-control-lg"
                v-model="user.email"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                required
                class="form-control form-control-lg"
                v-model="user.password"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button type="submit" class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        email: "",
        username: "",
        password: ""
      }
    };
  },
  props: {},
  methods: {
    handleSubmit() {
      this.$store.dispatch("registerUser", this.user);
      this.$router.push("/");
    },
    goToLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
