<template>
  <div>
    <q-card style="margin-bottom: 1rem">
      <q-card-section>
        <q-item-label class="text-h6 q-mb-xs text-bold">
          Записи пользователя
          <q-btn
            v-if="isYourPage"
            fab
            icon="add"
            color="primary"
            class="float-right"
          />
        </q-item-label>
      </q-card-section>

      <q-separator />
    </q-card>

    <template v-if="feed.length">
      <q-card v-for="item in feed" style="margin-bottom: 1rem">
        <q-card-section>
          <q-item-label class="text-h6 q-mb-xs">
            {{ item.title }}
          </q-item-label>
          <small>{{ item.date }}</small>
        </q-card-section>

        <q-card-section>
          <p v-for="line in makeLines(item.text)">
            {{ line }}
          </p>
        </q-card-section>
      </q-card>
    </template>

    <template v-else>
      <q-card>
        <q-card-section>
          <q-item-label class="q-mb-xs">
            У пользователя пока что нет ни одной записи
          </q-item-label>
        </q-card-section>
      </q-card>
    </template>
  </div>
</template>

<script>
export default {
  name: "UserFeedBlock",
  props: {
    isYourPage: {
      type: Boolean,
      default: false,
    },
    feed: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    makeLines(text) {
      return text.split("\n");
    },
  },
};
</script>

<style scoped></style>
