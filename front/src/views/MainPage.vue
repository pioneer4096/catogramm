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
  name: "MainPage",
  data() {
    return {
      feedInitialized: false,
      user: null,
      loading: false,
    };
  },
  mounted() { // TODO избавиться от костыльных вызовов обновления ленты, локализовав логику во vuex, например
    if(this.selfId > 0 && !this.feedInitialized) {
      this.initFeed()
    }
  },
  methods: {
    async initFeed() {
      try {
        await this.$store.dispatch("getFeed", this.selfId);
      } catch (e) {
        console.warn("Cant get feed ", e);
      }
    }
  },
  components: {
    UserPage,
  },
  computed: {
    ...mapGetters(['userProfile', 'selfId']),
  },
  watch: {
    selfId(val) {
      if(val > 0 && !this.feedInitialized) {
        this.initFeed()
      }

    }
  }
};
</script>
