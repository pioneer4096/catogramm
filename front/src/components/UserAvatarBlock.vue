<template>
  <q-card class="my-card">
    <div v-if="link" class="avatar-img-wrapper">
      <img :src="link" />
    </div>
    <div v-else>Фото не загружено</div>

    <user-avatar-actions :isYourPage="isYourPage" />
  </q-card>
</template>

<script>
import UserAvatarActions from "@/components/UserAvatarActions";
export default {
  name: "UserAvatarBlock",
  props: {
    link: {
      type: String,
    },
    isYourPage: {
      type: Boolean,
      default: false,
    },
    friendsStatus: {
        type: Number,
        default: 0
    }
  },
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
