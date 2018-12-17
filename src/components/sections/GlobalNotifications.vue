<template>
  <div>
    <div
      :class="notification.type"
      v-for="notification in notifications"
      :key="notification.id"
      v-on:click="deleteNotification(notification.id)"
    >
      {{ notification.msg }}<i class="ion-trash-a pull-xs-right"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "GlobalNotifications",
  computed: {
    notifications() {
      return this.$store.getters.getNotifications;
    }
  },
  methods: {
    deleteNotification(id) {
      this.$store.dispatch("deleteNotification", id);
    }
  }
};
</script>
<style scoped>
.error {
  border: 1px solid;
  width: 50%;
  margin-left: 20%;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px;
  font-size: 15px;
  color: #b85c5c;
  border-color: #b85c5c;
}
</style>
