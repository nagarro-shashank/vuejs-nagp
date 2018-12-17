import Vue from "vue";
import Vuex from "vuex";
import appService from "./app.service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: [],
    totalArticlePages: 1,
    page: 1,
    userArticles: [],
    favoriteArticles: [],
    taggedArticles: [],
    comments: [],
    currentUser: null,
    profile: null,
    currentArticle: null,
    isLoggedIn: false,
    tags: [],
    currentTag: null,
    otherUserProfile: null,
    otherUserArticles: [],
    otherUserfavoriteArticles: [],
    notifications: [],
    notificationCount: 0
  },
  getters: {
    isLoggedIn(state) {
      if (window.localStorage.getItem("user") === null) {
        state.isLoggedIn = false;
      } else {
        state.currentUser = JSON.parse(window.localStorage.getItem("user"));
        state.isLoggedIn = true;
      }
      return state.isLoggedIn;
    },
    getArticles(state) {
      return state.articles;
    },
    getTotalArticlesPages(state) {
      return state.totalArticlePages;
    },
    getPage(state) {
      return state.page;
    },
    getUserArticles(state) {
      return state.userArticles;
    },
    getFavoriteArticles(state) {
      return state.favoriteArticles;
    },
    getOtherUserArticles(state) {
      return state.otherUserArticles;
    },
    getOtherUserFavoriteArticles(state) {
      return state.otherUserfavoriteArticles;
    },
    getCurrentArticle(state) {
      return state.currentArticle;
    },
    getCurrentUser(state) {
      return state.currentUser;
    },
    getProfile(state) {
      return state.profile;
    },
    getOtherUserProfile(state) {
      return state.otherUserProfile;
    },
    getComments(state) {
      return state.comments;
    },
    getTags(state) {
      return state.tags;
    },
    getCurrentTag(state) {
      return state.currentTag;
    },
    getTaggedArticles(state) {
      return state.taggedArticles;
    },
    getNotifications(state) {
      return state.notifications;
    }
  },
  actions: {
    fetchArticles(context) {
      appService.fetchArticles(context);
    },
    fetchArticle(context, slug) {
      if (slug != "create") {
        appService.fetchArticle(context, slug);
      }
    },
    fetchUserArticles(context) {
      appService.fetchUserArticles(context, context.state.currentUser.username);
    },
    fetchOtherUserProfile(context, user) {
      appService.fetchOtherUserProfile(context, user);
    },
    fetchOtherUserArticles(context, user) {
      appService.fetchOtherUserArticles(context, user);
    },
    fetchOtherFavoriteArticles(context, user) {
      appService.fetchOtherFavoriteArticles(context, user);
    },
    fetchArticlesForPage(context, page) {
      appService.fetchArticlesForPage(context, page);
    },
    createArticle(context, article) {
      appService.createArticle(context, article);
    },
    deleteArticle(context, slug) {
      appService.deleteArticle(context, slug);
    },
    updateArticle(context, data) {
      appService.updateArticle(context, data.slug, data.article);
    },
    favoriteArticle(context, data) {
      appService.favoriteArticle(context, data.slug, data.favorite);
    },
    fetchComments(context, slug) {
      appService.fetchComments(context, slug);
    },
    createComment(context, data) {
      appService.createComment(context, data.slug, data.comment);
    },
    deleteComment(context, data) {
      appService.deleteComment(context, data.slug, data.commentId);
    },
    registerUser(context, credentials) {
      appService.registerUser(context, credentials);
    },
    loginUser(context, credentials) {
      appService.loginUser(context, credentials);
    },
    fetchProfile(context) {
      appService.fetchProfile(context, context.state.currentUser.username);
    },
    fetchTags(context) {
      appService.fetchTags(context);
    },
    fetchArticlesForTag(context, tag) {
      appService.fetchArticlesForTag(context, tag);
    },
    fetchFavoriteArticles(context) {
      appService.fetchFavoriteArticles(
        context,
        context.state.currentUser.username
      );
    },
    logout(context) {
      context.commit("resetUserDetails");
    },
    setCurrentTag(context, tag) {
      context.commit("setCurrentTag", tag);
    },
    resetCurrentTag(context) {
      context.commit("resetCurrentTag");
    },
    deleteNotification(context, id) {
      context.commit("deleteNotification", id);
    },
    followUser(context, user) {
      appService.followUser(context, user);
    },
    unFollowUser(context, user) {
      appService.unFollowUser(context, user);
    }
  },
  mutations: {
    updateLoggedInUser(state, user) {
      window.localStorage.setItem("token", user.token);
      window.localStorage.setItem("user", JSON.stringify(user));
      state.currentUser = user;
      state.isLoggedIn = true;
    },
    updateArticles(state, data) {
      state.articles = data.articles;
      state.totalArticlePages = data.articlesCount / 5;
    },
    updateArticlesForPage(state, data) {
      state.page = data.page;
      state.articles = data.articles;
    },
    updateArticle(state, articleUpdated) {
      let updatedArticles = state.articles;
      let indexArticles = updatedArticles.findIndex(
        article => article.slug === articleUpdated.slug
      );
      let indexFavoriteArticles = state.favoriteArticles.findIndex(
        article => article.slug === articleUpdated.slug
      );
      let indexTaggedArticles = state.taggedArticles.findIndex(
        article => article.slug === articleUpdated.slug
      );
      let indexUserArticles = state.userArticles.findIndex(
        article => article.slug === articleUpdated.slug
      );
      let indexOtherUserArticles = state.otherUserArticles.findIndex(
        article => article.slug === articleUpdated.slug
      );
      let indexOtherUserfavoriteArticles = state.otherUserfavoriteArticles.findIndex(
        article => article.slug === articleUpdated.slug
      );
      if (indexUserArticles >= 0)
        Vue.set(state.userArticles, indexUserArticles, articleUpdated);
      if (indexArticles >= 0)
        Vue.set(state.articles, indexArticles, articleUpdated);
      if (indexTaggedArticles >= 0)
        Vue.set(state.taggedArticles, indexTaggedArticles, articleUpdated);
      if (indexFavoriteArticles >= 0)
        Vue.set(state.favoriteArticles, indexFavoriteArticles, articleUpdated);
      if (indexOtherUserArticles >= 0)
        Vue.set(state.otherUserArticles, indexArticles, articleUpdated);
      if (indexOtherUserfavoriteArticles >= 0)
        Vue.set(state.otherUserfavoriteArticles, indexArticles, articleUpdated);
      if (
        state.currentArticle &&
        state.currentArticle.slug == articleUpdated.slug
      ) {
        state.currentArticle = articleUpdated;
      }
    },
    updateCurrentArticle(state, articleUpdated) {
      let updatedArticles = state.articles;
      let indexArticles = updatedArticles.findIndex(
        article => article.slug === articleUpdated.slug
      );
      let indexFavoriteArticles = state.favoriteArticles.findIndex(
        article => article.slug === articleUpdated.slug
      );
      let indexTaggedArticles = state.taggedArticles.findIndex(
        article => article.slug === articleUpdated.slug
      );
      let indexOtherUserArticles = state.otherUserArticles.findIndex(
        article => article.slug === articleUpdated.slug
      );
      let indexOtherUserfavoriteArticles = state.otherUserfavoriteArticles.findIndex(
        article => article.slug === articleUpdated.slug
      );
      let indexUserArticles = state.userArticles.findIndex(
        article => article.slug === articleUpdated.slug
      );
      if (indexArticles >= 0)
        Vue.set(state.articles, indexArticles, articleUpdated);
      if (indexUserArticles >= 0)
        Vue.set(state.userArticles, indexUserArticles, articleUpdated);
      if (indexTaggedArticles >= 0)
        Vue.set(state.taggedArticles, indexTaggedArticles, articleUpdated);
      if (indexFavoriteArticles >= 0)
        Vue.set(state.favoriteArticles, indexFavoriteArticles, articleUpdated);
      if (indexOtherUserArticles >= 0)
        Vue.set(state.otherUserArticles, indexArticles, articleUpdated);
      if (indexOtherUserfavoriteArticles >= 0)
        Vue.set(state.otherUserfavoriteArticles, indexArticles, articleUpdated);
      state.currentArticle = articleUpdated;
    },
    updateFavoriteArticles(state, articles) {
      state.favoriteArticles = articles;
    },
    updateProfile(state, profile) {
      state.profile = profile;
    },
    updateUserArticles(state, articles) {
      state.userArticles = articles;
    },
    updateTagArticles(state, articles) {
      state.taggedArticles = articles;
    },
    updateCurrentArticleComments(state, comments) {
      state.comments = comments;
    },
    updateComment(state, updatedComment) {
      state.comments.push(updatedComment);
    },
    deleteComment(state, id) {
      let indexComments = state.comments.findIndex(
        comment => comment.id === id
      );
      if (indexComments >= 0) state.comments.splice(indexComments, 1);
    },
    updateOtherUserProfile(state, profile) {
      state.otherUserProfile = profile;
    },
    updateOtherUserArticles(state, articles) {
      state.otherUserArticles = articles;
    },
    updateOtherUserFavoriteArticles(state, articles) {
      state.otherUserfavoriteArticles = articles;
    },
    updateTags(state, tags) {
      state.tags = tags;
    },
    setCurrentTag(state, tag) {
      state.currentTag = tag;
    },
    resetCurrentTag(state) {
      state.currentTag = null;
    },
    resetUserDetails(state) {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      state.isLoggedIn = false;
      state.userArticles = [];
      state.currentUser = null;
      state.profile = null;
      state.currentArticle = null;
      state.favoriteArticles = [];
    },
    addErrors(state, errors) {
      for (var i = 0; i < errors.length; i++) {
        state.notifications.push({
          id: state.notificationCount++,
          msg: errors[i],
          type: "error"
        });
      }
    },
    deleteNotification(state, id) {
      let indexNotification = state.notifications.findIndex(
        notification => notification.id === id
      );
      state.notifications.splice(indexNotification, 1);
    },
    followUser(state, username) {
      if (
        state.currentArticle &&
        state.currentArticle.author.username == username
      ) {
        state.currentArticle.author.following = true;
      }
      if (
        state.otherUserProfile &&
        state.otherUserProfile.profile.username == username
      ) {
        state.otherUserProfile.profile.following = true;
      }
    },
    unFollowUser(state, username) {
      if (
        state.currentArticle &&
        state.currentArticle.author.username == username
      ) {
        state.currentArticle.author.following = false;
      }
      if (
        state.otherUserProfile &&
        state.otherUserProfile.profile.username == username
      ) {
        state.otherUserProfile.profile.following = false;
      }
    }
  }
});
