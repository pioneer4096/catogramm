<template>
  <q-page class="">
    <div v-if="loading">Загрузка....</div>
    <div v-else-if="pageOwnerProfile">
      <user-page :user="pageOwnerProfile" />
    </div>
    <div v-else>Страница не найдена или ещё не создана.</div>
  </q-page>
</template>

<script>
import UserPage from "@/components/UserPage";
import { mapGetters } from "vuex";

export default {
  name: "OtherPage",
  data() {
    return {
      userId: null,
      user: null,
      loading: false,
    };
  },
  components: {
    UserPage,
  },
  async mounted() {
    this.userId = parseInt(this.$route.params.id);
    if (isNaN(this.userId)) {
      alert("incorrect userId");
      return;
    }

    try {
      this.$store.dispatch("preparePageData", this.userId);
    } catch (e) {
      console.error("Cant prepare page data ", e);
    }

    try {
      this.$store.dispatch("getFriendStatus", this.userId);
    } catch (e) {
      console.warn("Cant get friends status ", e);
    }

    try {
      this.$store.dispatch("getFeed", this.userId);
    } catch (e) {
      console.warn("Cant get feed ", e);
    }
  },
  computed: {
    ...mapGetters(["pageOwnerProfile", "isYourPage"]),
  },
};
</script>

<style scoped></style>
