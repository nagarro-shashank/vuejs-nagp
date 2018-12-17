import axios from "axios";

axios.defaults.baseURL = "https://conduit.productionready.io/api";

//Articles were not showing favorite as true. Fix : Pass authorization header.

const appService = {
  getHeader() {
    if (null === window.localStorage.getItem("token")) {
      return {};
    } else {
      return {
        Authorization: "Token " + window.localStorage.getItem("token")
      };
    }
  },
  fetchArticle(context, slug) {
    axios
      .get("/articles/" + slug, { headers: this.getHeader() })
      .then(result =>
        context.commit("updateCurrentArticle", result.data.article)
      )
      .catch(console.error);
  },
  fetchArticles(context) {
    axios
      .get("/articles?limit=5", { headers: this.getHeader() })
      .then(result => context.commit("updateArticles", result.data))
      .catch(console.error);
  },
  fetchArticlesForPage(context, page) {
    axios
      .get("/articles?limit=5&offset=" + page * 5, {
        headers: this.getHeader()
      })
      .then(result =>
        context.commit("updateArticlesForPage", {
          articles: result.data.articles,
          page: page
        })
      )
      .catch(console.error);
  },
  fetchUserArticles(context, user) {
    axios
      .get("/articles?author=" + user, { headers: this.getHeader() })
      .then(result =>
        context.commit("updateUserArticles", result.data.articles)
      )
      .catch(console.error);
  },
  createArticle(context, article) {
    axios
      .post("/articles", { article: article }, { headers: this.getHeader() })
      .then(result =>
        context.commit("updateCurrentArticle", result.data.article)
      )
      .catch(console.error);
  },
  deleteArticle(context, slug) {
    axios
      .delete("/articles/" + slug, {
        headers: this.getHeader()
      })
      .then(result => console.error(result))
      .catch(console.error);
  },
  favoriteArticle(context, slug, favorite) {
    if (favorite) {
      axios
        .post(
          "/articles/" + slug + "/favorite",
          {},
          {
            headers: this.getHeader()
          }
        )
        .then(result => context.commit("updateArticle", result.data.article))
        .catch(console.error);
    } else {
      axios
        .delete("/articles/" + slug + "/favorite", {
          headers: this.getHeader()
        })
        .then(result => context.commit("updateArticle", result.data.article))
        .catch(console.error);
    }
  },
  fetchComments(context, slug) {
    axios
      .get("/articles/" + slug + "/comments")
      .then(result =>
        context.commit("updateCurrentArticleComments", result.data.comments)
      )
      .catch(console.error);
  },
  createComment(context, slug, comment) {
    axios
      .post(
        "/articles/" + slug + "/comments",
        { comment: { body: comment } },
        { headers: this.getHeader() }
      )
      .then(result => context.commit("updateComment", result.data.comment))
      .catch(console.error);
  },
  deleteComment(context, slug, commentId) {
    axios
      .delete("/articles/" + slug + "/comments/" + commentId, {
        headers: this.getHeader()
      })
      .then(() => context.commit("deleteComment", commentId))
      .catch(console.error);
  },
  updateArticle(context, slug, article) {
    axios
      .put(
        "/articles/" + slug,
        { article: article },
        { headers: this.getHeader() }
      )
      .then(result =>
        context.commit("updateCurrentArticle", result.data.article)
      )
      .catch(console.error);
  },
  registerUser(context, user) {
    axios
      .post("/users", {
        user
      })
      .then(result => context.commit("updateLoggedInUser", result.data.user))
      .catch(error => {
        let listOfErrors = Object.keys(error.response.data.errors).map(key => {
          return key + " " + error.response.data.errors[key];
        });
        context.commit("addErrors", listOfErrors);
      });
  },
  loginUser(context, user) {
    axios
      .post("/users/login", {
        user
      })
      .then(result => context.commit("updateLoggedInUser", result.data.user))
      .catch(error => {
        let listOfErrors = Object.keys(error.response.data.errors).map(key => {
          return key + " " + error.response.data.errors[key];
        });
        context.commit("addErrors", listOfErrors);
      });
  },
  fetchProfile(context, username) {
    axios
      .get("/profiles/" + username)
      .then(result => context.commit("updateProfile", result.data))
      .catch(console.error);
  },
  fetchTags(context) {
    axios
      .get("/tags")
      .then(result => context.commit("updateTags", result.data.tags))
      .catch(console.error);
  },
  fetchArticlesForTag(context, tag) {
    axios
      .get("/articles/?tag=" + tag)
      .then(result => context.commit("updateTagArticles", result.data.articles))
      .catch(console.error);
  },
  fetchFavoriteArticles(context, username) {
    axios
      .get("/articles/?favorited=" + username, { headers: this.getHeader() })
      .then(result =>
        context.commit("updateFavoriteArticles", result.data.articles)
      )
      .catch(console.error);
  },
  fetchOtherUserProfile(context, user) {
    axios
      .get("/profiles/" + user, { headers: this.getHeader() })
      .then(result => context.commit("updateOtherUserProfile", result.data))
      .catch(console.error);
  },
  fetchOtherUserArticles(context, user) {
    axios
      .get("/articles/?author=" + user, { headers: this.getHeader() })
      .then(result =>
        context.commit("updateOtherUserArticles", result.data.articles)
      )
      .catch(console.error);
  },
  fetchOtherFavoriteArticles(context, user) {
    axios
      .get("/articles/?favorited=" + user, { headers: this.getHeader() })
      .then(result =>
        context.commit("updateOtherUserFavoriteArticles", result.data.articles)
      )
      .catch(console.error);
  },
  followUser(context, user) {
    axios
      .post("/profiles/" + user + "/follow", {}, { headers: this.getHeader() })
      .then(result =>
        context.commit("followUser", result.data.profile.username)
      )
      .catch(console.error);
  },
  unFollowUser(context, user) {
    axios
      .delete("/profiles/" + user + "/follow", { headers: this.getHeader() })
      .then(result =>
        context.commit("unFollowUser", result.data.profile.username)
      )
      .catch(console.error);
  }
};

export default appService;
