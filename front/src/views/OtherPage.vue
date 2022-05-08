<template>
  <q-page class="">
    <div v-if="loading">Загрузка....</div>
    <div v-else-if="user">
      <user-page :user="user" :isYourPage="isYourPage" />
    </div>
    <div v-else>Страница не найдена или ещё не создана.</div>
  </q-page>
</template>

<script>
import http from "@/api/HttpClient.js";
import UserPage from "@/components/UserPage";

export default {
  name: "OtherPage",
  data() {
    return {
      userId: null,
      user: null,
      loading: false,
      isYourPage: false,
    };
  },
  components: {
    UserPage,
  },
  async mounted() {
    this.userId = parseInt(this.$route.params.id);

    if (!isNaN(this.userId)) {
      this.loading = true;
      try {
        const response = await http().get(`/api/profile/get/${this.userId}`);
        this.user = response?.data || null;
        this.isYourPage = Boolean(this.user?.isYourPage);
      } catch (e) {
        this.user = null;
      }
      this.loading = false;
    }
  },
};
</script>

<style scoped></style>
