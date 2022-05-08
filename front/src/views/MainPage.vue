<template>
  <q-page class="">
    <div v-if="loading">Загрузка....</div>
    <div v-else-if="user">
      <user-page :user="user" isYourPage />
    </div>
    <div v-else>Страница не найдена или ещё не создана.</div>
  </q-page>
</template>

<script>
import http from "@/api/HttpClient.js";
import UserPage from "@/components/UserPage";

export default {
  name: "IndexPage",
  data() {
    return {
      user: null,
      loading: false,
    };
  },
  components: {
    UserPage,
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
