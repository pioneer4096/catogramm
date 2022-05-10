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
        <user-feed-block :feed="feed" :isYourPage="isYourPage" />
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
  computed: {
    feed() {
      return [
        {
          id: 1,
          ownerId: 1,
          date: '2022-04-01 12:33',
          title: 'Первоапрельская шутка',
          text: `1 апреля никому не верю`
        },
        {
          id: 2,
          ownerId: 1,
          date: '2022-04-17 19:15',
          title: 'Кому грозу в начале мая?',
          text: `Люблю грозу в начале мая
            Когда природа пробуждает
            И сонный глаз приоткрывает
            Смывая белень февраля
        `
        },
        /*{
          id: 3,
          ownerId: 1,
          date: '2022-05-05 09:59',
          title: 'Поработаем в перерывчике',
          text: `Ну вот и наступил рабочий перерыв в череде майских праздников.
            Теперь вы можете прочуствовать, как бы выглядела 3хдневная рабочая неделя!
        `
        },*/
      ]
    }
  }
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
