<template>
  <q-card class="my-card">
    <div class="avatar-img-wrapper">
      <img src="https://cdn.quasar.dev/img/mountains.jpg" />
    </div>

    <user-avatar-actions />
  </q-card>
</template>

<script>
import UserAvatarActions from "@/components/UserAvatarActions";
export default {
  name: "UserAvatarBlock",
  components: {
    UserAvatarActions,
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  min-height: 200px;
}

.avatar-img-wrapper {
  padding: 5px 10px;

  img {
    width: 100%;
  }
}
</style>
