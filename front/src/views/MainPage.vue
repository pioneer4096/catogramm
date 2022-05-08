<template>
  <q-page class="">
    <div v-if="loading">Загрузка....</div>
    <div v-else-if="user" class="user-content">
      <div class="user-page">
        <div class="float-left narrow-column-wrapper">
          <div class="narrow-column">
            <user-avatar-block />
          </div>
        </div>
        <div class="float-right wide-column-wrapper">
          <div class="wide-column">
            <user-info-block />
            <br />
            <user-feed-block />
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <div v-else>Страница не найдена или ещё не создана.</div>
  </q-page>
</template>

<script>
import http from "@/api/HttpClient.js";
import UserInfoBlock from "@/components/UserInfoBlock";
import UserAvatarBlock from "@/components/UserAvatarBlock";
import UserFeedBlock from "@/components/UserFeedBlock";

export default {
  name: "IndexPage",
  data() {
    return {
      user: null,
      loading: false,
    };
  },
  components: {
    UserAvatarBlock,
    UserInfoBlock,
    UserFeedBlock,
  },
  async mounted() {
    this.loading = true;
    try {
      const response = await http().get("/api/profile/self");
      this.user = response?.data?.user || null;
    } catch (e) {
      alert("Not authorized, no self profile info");
    }
    this.loading = false;
  },
};
</script>

<style lang="scss">
.user-content {
  padding-top: 15px;
}

.user-page {
  width: 960px;
  padding: 0 15px;
  margin: 0 auto;
}

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
