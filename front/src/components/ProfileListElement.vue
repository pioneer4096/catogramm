<template>
  <p>
    <strong>{{ title }}:</strong> {{ value }}
  </p>
</template>

<script>
export default {
  name: "ProfileListElement",
  props: {
      title: {
          type: String,
          default : ''
      },
      value: {
          type: String,
          default : ''
      }
  }
};
</script>

<style scoped></style>
