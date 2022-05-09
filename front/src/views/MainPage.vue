<template>
  <q-page class="">
    <div v-if="loading">Загрузка....</div>
    <div v-else-if="userProfile">
      <user-page :user="userProfile" isYourPage />
    </div>
    <div v-else>Страница не найдена или ещё не создана.</div>
  </q-page>
</template>

<script>
import UserPage from "@/components/UserPage";
import {mapGetters} from "vuex";

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
  computed: {
    ...mapGetters(['userProfile']),
  }
};
</script>
