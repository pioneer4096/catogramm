<template>
  <q-page class="flex flex-center">
    <h2>Main Page</h2>

    <div>
      <q-btn
              unelevated
              size="lg"
              color="primary"
              @click="test"
              icon-right="send"
              class="full-width text-white"
              label="Тест"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from 'axios'

export default defineComponent({
  name: "IndexPage",
  methods: {
    async test() {
      try {
        const response = await axios.get('/api/profile/self')
        console.log('test response data = ', response.data)
        alert('Ok, data in console')
      }
      catch (e) {
        alert('Not authorized, no self profile info')
      }
    }
  }
});
</script>
