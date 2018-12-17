<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form v-if="profile">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  disabled
                  type="text"
                  :value="profile.profile.image"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  disabled
                  :value="profile.profile.username"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  disabled
                  :value="profile.profile.bio"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
            </fieldset>
          </form>
          <button v-on:click="logout" class="btn btn-outline-danger">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  created() {
    this.$store.dispatch("fetchProfile");
  },
  computed: {
    profile() {
      return this.$store.getters.getProfile;
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
