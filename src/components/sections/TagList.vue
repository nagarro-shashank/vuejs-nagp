<template>
  <div class="tags">
    <a
      class="tag-pill tag-default"
      v-bind:class="{ active: currentTag == tag, '': !currentTag == tag }"
      v-for="tag in tags"
      :key="tag"
      v-on:click="toggleTag(tag)"
    >
      {{ tag }}
    </a>
  </div>
</template>

<script>
export default {
  name: "TagList",
  components: {},
  created() {
    this.$store.dispatch("fetchTags");
  },
  computed: {
    tags() {
      return this.$store.getters.getTags;
    },
    currentTag() {
      return this.$store.getters.getCurrentTag;
    }
  },
  methods: {
    toggleTag(tag) {
      if (tag == this.currentTag) {
        this.$store.dispatch("resetCurrentTag");
      } else {
        this.$store.dispatch("setCurrentTag", tag);
        this.$store.dispatch("fetchArticlesForTag", tag);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active {
  background-color: #3d8b3d;
}
</style>
