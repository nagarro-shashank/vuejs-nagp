<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img v-if="profile" :src="profile.profile.image" class="user-img" />
            <h4>{{ username }}</h4>
            <p v-if="profile">{{ profile.profile.bio }}</p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              v-if="isLoggedIn && profile && !profile.profile.following"
              v-on:click="followUser"
            >
              <i class="ion-plus-round"></i> &nbsp; Follow {{ username }}
            </button>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              v-if="isLoggedIn && profile && profile.profile.following"
              v-on:click="unFollowUser"
            >
              <i class="ion-plus-round"></i>&nbsp; Unfollow {{ username }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  @click.prevent="activetab = 1"
                  v-bind:class="[
                    activetab === 1 ? 'nav-link active' : 'nav-link'
                  ]"
                  >My Articles</a
                >
              </li>
              <li class="nav-item">
                <a
                  @click.prevent="activetab = 2"
                  v-bind:class="[
                    activetab === 2 ? 'nav-link active' : 'nav-link'
                  ]"
                  >Favorited Articles</a
                >
              </li>
            </ul>
          </div>
          <div v-if="activetab === 1">
            <ArticleList :type="'user'" :user="user"></ArticleList>
          </div>
          <div v-if="activetab === 2">
            <ArticleList :type="'favorite'" :user="user"></ArticleList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleList from "../sections/ArticleList";
export default {
  name: "UserArticles",
  data() {
    return {
      activetab: 1
    };
  },
  created() {
    if (this.user === "current") {
      this.$store.dispatch("fetchProfile");
    } else {
      this.$store.dispatch("fetchOtherUserProfile", this.user);
    }
  },
  props: {
    user: String
  },
  computed: {
    username() {
      if (this.user == "current")
        return this.$store.getters.getCurrentUser.username;
      else return this.user;
    },
    profile() {
      if (this.user == "current") return this.$store.getters.getProfile;
      else return this.$store.getters.getOtherUserProfile;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    followUser() {
      this.$store.dispatch("followUser", this.username);
    },
    unFollowUser() {
      this.$store.dispatch("unFollowUser", this.username);
    }
  },
  components: {
    ArticleList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
