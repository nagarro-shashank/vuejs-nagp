<template>
  <div class="article-preview">
    <div class="article-meta">
      <a href="profile.html"><img :src="article.author.image"/></a>
      <div class="info">
        <router-link
          :to="{
            name: 'UserArticles',
            params: { user: article.author.username }
          }"
          class="author"
          >{{ article.author.username }}
        </router-link>
        <span class="date">{{ article.createdAt | formatDateLong }}</span>
      </div>
      <button
        v-on:click="toggleFavourite"
        v-bind:class="{ favorited: article.favorited, '': !article.favorited }"
        class="btn btn-outline-primary btn-sm pull-xs-right"
      >
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <a @click.prevent="articleDetails" href="" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: Object
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
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
    articleDetails() {
      this.$router.push({
        name: "ArticleDetails",
        params: { slug: this.article.slug }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
