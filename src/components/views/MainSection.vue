<template>
  <div>
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <a
                    @click.prevent="activetab = 1"
                    v-bind:class="[
                      activetab === 1 ? 'nav-link active' : 'nav-link'
                    ]"
                    >Global Feed</a
                  >
                </li>
                <li v-if="tag" class="nav-item">
                  <a
                    @click.prevent="activetab = 2"
                    v-bind:class="[
                      activetab === 2 ? 'nav-link active' : 'nav-link'
                    ]"
                    >#{{ tag }}</a
                  >
                </li>
              </ul>
            </div>
            <div v-if="activetab === 1">
              <ArticleList :type="'all'" :user="'current'"></ArticleList>
            </div>
            <div v-if="activetab === 2 && tag">
              <ArticleList :type="'tag'" :user="'current'"></ArticleList>
            </div>
          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>
              <div class="tag-list"><TagList></TagList></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleList from "../sections/ArticleList";
import TagList from "../sections/TagList";
export default {
  name: "MainSection",
  data() {
    return {
      activetab: 1
    };
  },
  components: {
    ArticleList,
    TagList
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    tag() {
      return this.$store.getters.getCurrentTag;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
