<template>
  <q-card class="user-info-card">
    <div v-if="user">
      <q-card-section>
        <div class="text-h6 q-mb-xs text-bold">{{ user.name }}</div>
        <p>
          <small>{{ user.status }}</small> (С)
        </p>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <profile-list-element
          v-if="user.homeTown"
          title="Родной город"
          :value="user.homeTown"
        />
        <q-btn
          @click.prevent="switchShowMore"
          :label="showMoreButtonText"
          outline
          color="primary"
        />
        <div v-if="hasPersonal && showMore">
          <profile-list-element
            v-for="prop in user.personal"
            :title="prop.title"
            :value="prop.value"
          />
        </div>
      </q-card-section>

      <q-separator />
      <q-card-section v-if="user.stat"> Статистика </q-card-section>
    </div>
    <div v-else>Пользователь не найден</div>
  </q-card>
</template>

<script>
import ProfileListElement from "@/components/ProfileListElement";

export default {
  name: "UserInfoBlock",
  props: {
    user: {
      type: Object,
    },
    isYourPage: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ProfileListElement,
  },
  data() {
    return {
      showMore: false,
    };
  },
  methods: {
    switchShowMore() {
      this.showMore = !this.showMore;
    },
  },
  computed: {
    hasPersonal() {
      return Boolean(this.user?.personal?.length);
    },
    showMoreButtonText() {
      return this.showMore
        ? "Скрыть подробную информацию"
        : "Показать подробную информацию";
    },
  },
};
</script>

<style scoped>
.user-info-card {
  width: 100%;
}
</style>
