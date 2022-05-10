<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            round
            dense
            flat
            @click="sendSocket"
            color="grey-8"
            icon="message"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Messages</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge
              v-if="notificationMessagesUnreadLength"
              color="red"
              text-color="white"
              floating
            >
              {{ notificationMessagesUnreadLength }}</q-badge
            >
            <!--            <q-tooltip>Notifications</q-tooltip>-->
            <q-menu v-if="notificationMessagesUnreadLength">
              <q-list dense style="min-width: 100px">
                <template
                  v-for="notification in notificationMessagesUnreadMax"
                  :key="`notification_${notification.id}`"
                >
                  <q-item
                    @click="readNotification(notification.id)"
                    clickable
                    v-close-popup
                  >
                    <q-item-section>{{ notification.text }}</q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img :src="userAvatarLink" />
            </q-avatar>
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item>
                  <q-item-section>{{ userName }}</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section @click="logout">Выйти</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            v-for="link in links1"
            :key="link.text"
            :to="link.href"
            exact
            v-ripple
            clickable
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item
            v-for="link in links2"
            :key="link.text"
            :to="link.href"
            exact
            v-ripple
            clickable
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }} <q-badge v-if="link.demo" outline color="primary" label="demo" class="q-ml-xs" /></q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item
            v-for="link in links3"
            :key="link.text"
            :to="link.href"
            exact
            v-ripple
            clickable
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }} <q-badge v-if="link.demo" outline color="primary" label="demo" class="q-ml-xs" /></q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <div class="user-content">
        <div class="user-page">
          <router-view />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { io } from "socket.io-client";
const socket = io("ws://localhost:3000", {
  withCredentials: true,
  extraHeaders: {
    "socket-purpose-header": "abcd-dece-apza-olms-sakl",
  },
});

export default {
  name: "MyLayout",
  async mounted() {
    try {
      await this.$store.dispatch("getProfile");
    } catch (e) {
      alert("Get profiles action failed...");
    }

    socket.on("message", this.handleSocketConnection);
  },
  data() {
    return {
      leftDrawerOpen: false,
      search: "",
      links1: [{ icon: "home", href: "/", text: "Моя страница" }],
      links2: [
        { icon: "people", href: "/friends", text: "Друзья", demo: true },
        { icon: "chat", href: "/messages", text: "Мессенджер", demo: true },
        { icon: "local_movies", href: "/news", text: "Новости", demo: true },
        { icon: "thumb_up_alt", href: "/reactions", text: "Реакции", demo: true },
      ],
      links3: [{ icon: "settings", href: "/settings", text: "Настройки", demo: true }],
    };
  },
  methods: {
    sendSocket() {
      socket.emit("message", "Hi from client side!!!");
    },
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    logout() {
      this.$store.commit("logout");
      this.$router.replace("/auth/login");
      console.warn("successfully logged out");
    },
    readNotification(id) {
      this.$store.commit("readNotification", id);
    },
    handleSocketConnection(message) {
      this.$store.commit("addNotification", message);
    },
  },
  computed: {
    ...mapGetters([
      "userAvatarLink",
      "userName",
      "notificationMessagesUnreadMax",
      "notificationMessagesUnreadLength",
    ]),
  },
  beforeUnmount() {
    socket.off("message", this.handleSocketConnection);
  },
};
</script>

<style lang="sass">
.YL
    &__toolbar-input-container
        min-width: 100px
        width: 55%

    &__toolbar-input-btn
        border-radius: 0
        border-style: solid
        border-width: 1px 1px 1px 0
        border-color: rgba(0, 0, 0, .24)
        max-width: 60px
        width: 100%

    &__drawer-footer-link
        color: inherit
        text-decoration: none
        font-weight: 500
        font-size: .75rem

        &:hover
            color: #000
</style>

<style scoped>
.user-content {
  padding-top: 15px;
}

.user-page {
  width: 960px;
  padding: 0 15px;
  margin: 0 auto;
}
</style>
