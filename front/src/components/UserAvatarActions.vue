<template>
  <q-card-actions vertical>
    <template v-if="isYourPage">
      <q-btn flat color="primary">Загрузить</q-btn>
    </template>
    <template v-else>
      <template v-if="friendStatus === 0">
        <q-btn color="primary" @click="addToFriends">Добавить в друзья</q-btn>
      </template>
      <template v-else-if="friendStatus === 1">
        <q-btn
          color="grey"
          size="md"
          label="Заявка отправлена"
          icon-right="timer"
        ></q-btn>
      </template>
      <template v-else-if="friendStatus === 2">
        <q-btn color="green" size="md" label="Это ваш друг"></q-btn>
      </template>
    </template>
  </q-card-actions>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserAvatarActions",
  props: {
    isYourPage: {
      type: Boolean,
      default: false,
    },
    user: Object
  },
  methods: {
    async addToFriends() {
      if(this.user?.id) {
        try {
          await this.$store.dispatch('addToFriend', this.user.id)
        }
        catch (e) {
          console.log('addToFriend error ', e)
          alert('Error')
        }
      }
      else {
        console.log('Cant add friend without ID ', this.user)
        alert('Error')
      }
    },
  },
  computed: {
    ...mapGetters(["friendStatus"]),
  },
};
</script>

<style scoped></style>
