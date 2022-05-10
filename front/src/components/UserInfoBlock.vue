<template>
  <q-card class="user-info-card">
    <div v-if="user">
      <q-card-section>
        <div class="text-h6 q-mb-xs text-bold">{{ user.name }}</div>
        <div style="display: flex; align-items: center;">
            <div>
                <template v-if="!isRedactingStatus">
                    <small>{{ user.status }}</small> (С)
                </template>
                <template v-else>
                    <q-input dense square outlined v-model="newStatus" label="Статус" />
                </template>
            </div>
            <div v-if="isYourPage" style="margin-left: 1rem;">
                <template v-if="!isRedactingStatus">
                    <q-btn flat color="primary" label="Редактировать" @click="redactStatus"/>
                </template>
                <template v-else>
                    <q-btn flat color="primary" label="Сохранить" @click="applyStatus()"/>
                    <q-btn flat color="primary" label="Отмена" @click="cancelStatus"/>
                </template>
            </div>
        </div>
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
      newStatus: '',
      isRedactingStatus: false
    };
  },
  methods: {
    switchShowMore() {
      this.showMore = !this.showMore;
    },
      redactStatus() {
          this.newStatus = this.user.status
          this.isRedactingStatus = true
      },
      async applyStatus() {
        try {
            await this.$store.dispatch('updateProfileStatus', this.newStatus)

            this.user.status = this.newStatus
            this.newStatus = ''
            this.isRedactingStatus = false
        }
        catch(e) {
            alert('Не удалось обновить статус...')
            console.log(e)
        }
      },
      cancelStatus() {
          this.newStatus = ''
          this.isRedactingStatus = false
      }
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
