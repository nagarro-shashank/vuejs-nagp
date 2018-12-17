<template>
  <div>
    <div v-if="!edit" class="card">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <a href="" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </a>
        &nbsp;
        <a href="" class="comment-author">{{ comment.author.username }}</a>
        <span class="date-posted">{{
          comment.createdAt | formatDateShort
        }}</span>
        <div
          v-if="
            isLoggedIn &&
              currentUser &&
              comment.author.username == currentUser.username
          "
        >
          <button
            class="btn gap btn-outline-secondary btn-sm pull-xs-right"
            v-on:click="enableEdit"
          >
            <i class="ion-edit"></i>
          </button>
          <button
            class="btn btn-outline-danger btn-sm pull-xs-right"
            v-on:click="deleteComment"
          >
            <i class="ion-trash-a"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-if="edit && isLoggedIn">
      <form @submit.prevent="editComment" class="card comment-form">
        <div class="card-block">
          <textarea
            required
            v-model="comment.body"
            class="form-control"
            placeholder="Write a comment..."
            rows="3"
          ></textarea>
        </div>
        <div class="card-footer">
          <img
            :src="comment.author.image"
            class="comment-author-img pull-xs-left"
          />
          <button
            class="btn btn-sm btn-danger pull-xs-right"
            v-on:click="cancelEdit"
            type="button"
          >
            Cancel
          </button>
          <button type="submit" class="btn btn-sm btn-primary pull-xs-left">
            Post Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentItem",
  data() {
    return {
      edit: false
    };
  },
  props: {
    comment: Object,
    slug: String
  },
  computed: {
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    deleteComment() {
      let data = {};
      data.commentId = this.comment.id;
      data.slug = this.slug;
      this.$store.dispatch("deleteComment", data);
    },
    editComment() {
      this.edit = false;
      let data = {};
      data.commentId = this.comment.id;
      data.slug = this.slug;
      this.$store.dispatch("deleteComment", data);
      data.comment = this.comment.body;
      data.slug = this.slug;
      this.$store.dispatch("createComment", data);
    },
    cancelEdit() {
      this.edit = false;
    },
    enableEdit() {
      this.edit = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gap {
  margin-right: 10px;
}
</style>
