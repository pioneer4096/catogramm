<template>
    <q-page class="flex flex-center">
        <h2>User page</h2>

        <div v-if="loading">
            Загрузка....
        </div>
        <div v-else-if="user" class="user-content">
            {{user}}
        </div>
        <div v-else>
            Страница не найдена или ещё не создана.
        </div>
    </q-page>
</template>

<script>
    import http from '@/api/HttpClient.js'

    export default {
        name: "OtherPage",
        data() {
            return {
                userId: null,
                user: null,
                loading: false
            }
        },
        async mounted() {
            this.userId = parseInt(this.$route.params.id)

            if(!isNaN(this.userId)) {
                this.loading = true
                try {
                    const response = await http().get(`/api/profile/get/${this.userId}`)
                    this.user = response?.data || null
                }
                catch (e) {
                    this.user = null
                }
                this.loading = false
            }
        }
    }
</script>

<style scoped>

</style>