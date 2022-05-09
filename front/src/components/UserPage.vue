<template>
  <div>
    <div class="float-left narrow-column-wrapper">
      <div class="narrow-column">
        <user-avatar-block :link="user.avatarLink" :isYourPage="isYourPage" />
      </div>
    </div>
    <div class="float-right wide-column-wrapper">
      <div class="wide-column">
        <user-info-block :user="user" :isYourPage="isYourPage" />
        <br />
        <user-feed-block :isYourPage="isYourPage" />
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import UserInfoBlock from "@/components/UserInfoBlock";
import UserAvatarBlock from "@/components/UserAvatarBlock";
import UserFeedBlock from "@/components/UserFeedBlock";

export default {
  name: "UserPage",
  props: {
    user: Object,
    isYourPage: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    UserAvatarBlock,
    UserInfoBlock,
    UserFeedBlock,
  },
};
</script>

<style lang="scss">
.narrow-column-wrapper {
  width: 300px;

  .narrow-column {
  }
}

.wide-column-wrapper {
  width: 600px;

  .wide-column {
    width: 100%;
  }
}
</style>
