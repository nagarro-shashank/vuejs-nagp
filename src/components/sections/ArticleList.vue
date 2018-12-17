<template>
  <div class="articleList">
    <ArticleItem
      v-for="article in articles"
      :key="article.slug"
      :article="article"
    >
    </ArticleItem>
    <div v-if="this.type == 'all'" class="center">
      <button class="page-link" v-if="page != 1" v-on:click="previous">
        Previous
      </button>
      <span class="page-link">{{ page }}/{{ totalPages }}</span>
      <button class="page-link" v-if="page != 'totalPages'" v-on:click="next">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import ArticleItem from "./ArticleItem";

export default {
  name: "ArticleList",
  components: {
    ArticleItem
  },
  created() {
    if (this.user === "current") {
      this.$store.dispatch("fetchArticles");
      if (this.$store.getters.isLoggedIn) {
        this.$store.dispatch("fetchUserArticles");
        this.$store.dispatch("fetchFavoriteArticles");
      }
    } else {
      this.$store.dispatch("fetchOtherUserArticles", this.user);
      this.$store.dispatch("fetchOtherFavoriteArticles", this.user);
    }
  },
  props: {
    type: String,
    user: String
  },
  methods: {
    next() {
      this.$store.dispatch("fetchArticlesForPage", this.page + 1);
    },
    previous() {
      this.$store.dispatch("fetchArticlesForPage", this.page - 1);
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    page() {
      return this.$store.getters.getPage;
    },
    offSet() {
      return this.$store.getters.getTotalArticlesPages;
    },
    totalPages() {
      return this.$store.getters.getTotalArticlesPages;
    },
    articles() {
      if (this.user == "current") {
        if (this.type == "tag") {
          return this.$store.getters.getTaggedArticles;
        } else if (this.type == "user" && this.$store.getters.isLoggedIn) {
          return this.$store.getters.getUserArticles;
        } else if (this.type == "favorite" && this.$store.getters.isLoggedIn) {
          return this.$store.getters.getFavoriteArticles;
        } else {
          return this.$store.getters.getArticles;
        }
      } else {
        if (this.type == "favorite") {
          return this.$store.getters.getOtherUserFavoriteArticles;
        } else {
          return this.$store.getters.getOtherUserArticles;
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
  margin-left: 40%;
}
</style>
