<template>
  <q-card class="user-info-card">
    <q-card-section>
      <div class="text-h6 q-mb-xs text-bold">Имя Фамилия</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <small>Мечтать не вредно, вредно не мечтать</small>
    </q-card-section>
    <q-separator />
    <q-card-section> Персональный данные пользователя </q-card-section>
    <q-separator />
    <q-card-section> Статистика </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "UserInfoBlock",
};
</script>

<style scoped>
.user-info-card {
  width: 100%;
}
</style>
