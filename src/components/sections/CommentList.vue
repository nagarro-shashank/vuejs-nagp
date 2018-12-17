<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form
        v-if="isLoggedIn"
        @submit.prevent="createComment"
        class="card comment-form"
      >
        <div class="card-block">
          <textarea
            v-model="newComment"
            class="form-control"
            placeholder="Write a comment..."
            rows="3"
          ></textarea>
        </div>
        <div class="card-footer">
          <img :src="profile.profile.image" class="comment-author-img" />
          <button type="submit" class="btn btn-sm btn-primary">
            Post Comment
          </button>
        </div>
      </form>
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :slug="slug"
        :comment="comment"
      ></CommentItem>
    </div>
  </div>
</template>

<script>
import CommentItem from "./CommentItem";
export default {
  name: "CommentList",
  data() {
    return {
      newComment: null
    };
  },
  props: {
    slug: String
  },
  components: { CommentItem },
  created() {
    this.$store.dispatch("fetchProfile");
  },
  computed: {
    comments() {
      return this.$store.getters.getComments;
    },
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
    profile() {
      return this.$store.getters.getProfile;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    createComment() {
      let data = {};
      data.comment = this.newComment;
      data.slug = this.slug;
      this.newComment = null;
      this.$store.dispatch("createComment", data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
