<template>
  <div>
    <div v-if="slug == 'create'">
      <div class="editor-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-10 offset-md-1 col-xs-12">
              <form @submit.prevent="createArticle">
                <fieldset>
                  <fieldset class="form-group">
                    <input
                      required
                      type="text"
                      v-model="article.title"
                      class="form-control form-control-lg"
                      placeholder="Article Title"
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      required
                      type="text"
                      v-model="article.description"
                      class="form-control"
                      placeholder="What's this article about?"
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <textarea
                      required
                      class="form-control"
                      v-model="article.body"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                    ></textarea>
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="article.tags"
                      placeholder="Enter tags"
                    />
                    <div class="tag-list"></div>
                  </fieldset>
                  <button
                    class="btn btn-lg pull-xs-right btn-primary"
                    type="submit"
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="article && slug !== 'create'" class="addEdit">
      <div v-if="!edit">
        <div class="article-page">
          <div class="banner">
            <div class="container">
              <h1>{{ article.title }}</h1>
              <div class="article-meta">
                <a href=""><img :src="article.author.image"/></a>
                <div class="info">
                  <a href="" class="author">{{ article.author.username }}</a>
                  <span class="date">{{
                    article.createdAt | formatDateShort
                  }}</span>
                </div>
                <button
                  v-if="
                    currentUser &&
                      article.author.username == currentUser.username
                  "
                  v-on:click="enableEdit"
                  class="btn btn-outline-secondary btn-sm"
                >
                  <i class="ion-edit"></i> &nbsp; Edit
                </button>
                &nbsp;&nbsp;
                <button
                  v-if="
                    currentUser &&
                      article.author.username == currentUser.username
                  "
                  v-on:click="deleteArticle"
                  class="btn btn-outline-danger btn-sm"
                >
                  <i class="ion-trash-a"></i> &nbsp; Delete
                </button>
              </div>
            </div>
          </div>
          <div class="container page">
            <div class="row article-content">
              <div class="col-md-12">
                <p>{{ article.description }}</p>
                <h2 id="introducing-ionic">{{ article.title }}</h2>
                <p>{{ article.body }}</p>
              </div>
            </div>
            <hr />
            <div class="article-actions">
              <div class="article-meta">
                <a href="profile.html"><img :src="article.author.image"/></a>
                <div class="info">
                  <a href="" class="author">{{ article.author.username }}</a>
                  <span class="date">
                    {{ article.createdAt | formatDateShort }}</span
                  >
                </div>
                <button
                  v-if="!article.author.following"
                  class="btn btn-sm btn-outline-secondary"
                  v-on:click="followUser"
                >
                  <i class="ion-plus-round"></i> &nbsp; Follow
                  {{ article.author.username }}
                </button>
                <button
                  v-if="article.author.following"
                  class="btn btn-sm btn-outline-secondary"
                  v-on:click="unFollowUser"
                >
                  <i class="ion-plus-round"></i> &nbsp; Unfollow
                  {{ article.author.username }}
                </button>
                &nbsp;
                <button
                  v-on:click="toggleFavourite"
                  v-bind:class="{
                    favorited: article.favorited,
                    '': !article.favorited
                  }"
                  class="btn btn-sm btn-outline-primary"
                >
                  <i class="ion-heart"></i> &nbsp; Favorite Post<span
                    class="counter"
                    >({{ article.favoritesCount }})</span
                  >
                </button>
              </div>
            </div>
            <CommentList :slug="slug"></CommentList>
          </div>
        </div>
      </div>
      <div v-if="edit">
        <div class="editor-page">
          <div class="container page">
            <div class="row">
              <div class="col-md-10 offset-md-1 col-xs-12">
                <form @submit.prevent="saveChanges">
                  <fieldset>
                    <fieldset class="form-group">
                      <input
                        required
                        type="text"
                        v-model="article.title"
                        class="form-control form-control-lg"
                        placeholder="Article Title"
                      />
                    </fieldset>
                    <fieldset class="form-group">
                      <input
                        required
                        type="text"
                        v-model="article.description"
                        class="form-control"
                        placeholder="What's this article about?"
                      />
                    </fieldset>
                    <fieldset class="form-group">
                      <textarea
                        required
                        class="form-control"
                        v-model="article.body"
                        rows="8"
                        placeholder="Write your article (in markdown)"
                      ></textarea>
                    </fieldset>
                    <fieldset class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        v-model="article.tags"
                        placeholder="Enter tags"
                      />
                      <div class="tag-list"></div>
                    </fieldset>
                    <button
                      class="btn btn-lg pull-xs-left btn-danger"
                      v-on:click="cancelEdit()"
                    >
                      Cancel
                    </button>
                    <button
                      class="btn btn-lg pull-xs-right btn-primary"
                      type="submit"
                    >
                      Save Article
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentList from "../sections/CommentList";
export default {
  name: "AddEditArticle",
  components: { CommentList },
  data() {
    return {
      edit: false
    };
  },
  created() {
    this.$store.dispatch("fetchComments", this.slug);
    this.$store.dispatch("fetchArticle", this.slug);
  },
  props: {
    slug: String
  },
  computed: {
    article() {
      if (this.slug == "create") {
        return {};
      } else {
        return this.$store.getters.getCurrentArticle;
      }
    },
    comments() {
      return this.$store.getters.getComments;
    },
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    saveChanges() {
      let data = {};
      let updatedArticle = {};
      updatedArticle.title = this.article.title;
      updatedArticle.description = this.article.description;
      updatedArticle.body = this.article.body;
      data.slug = this.slug;
      data.article = updatedArticle;
      this.$store.dispatch("updateArticle", data);
      this.$router.push("/");
    },
    createArticle() {
      let newArticle = {};
      newArticle.title = this.article.title;
      newArticle.description = this.article.description;
      newArticle.body = this.article.body;
      if (newArticle.tags && newArticle.tags != "") {
        newArticle.tags = this.article.tags.split(",");
      }
      this.$store.dispatch("createArticle", newArticle);
      this.$router.push("/");
    },
    deleteArticle() {
      this.$store.dispatch("deleteArticle", this.slug);
    },
    cancelEdit() {
      this.edit = false;
    },
    enableEdit() {
      this.edit = true;
    },
    toggleFavourite() {
      if (this.isLoggedIn) {
        let data = {};
        data.slug = this.article.slug;
        data.favorite = !this.article.favorited;
        this.$store.dispatch("favoriteArticle", data);
      } else {
        this.$router.push("/login");
      }
    },
    followUser() {
      this.$store.dispatch("followUser", this.article.author.username);
    },
    unFollowUser() {
      this.$store.dispatch("unFollowUser", this.article.author.username);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
