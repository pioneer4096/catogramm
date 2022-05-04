<template>
    <q-page class="flex flex-center">
        <h2>My Page</h2>

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
        name: "IndexPage",
        data() {
            return {
                user: null,
                loading: false
            }
        },
        async mounted() {
            this.loading = true
            try {
                const response = await http().get('/api/profile/self')
                this.user = response?.data?.user || null
            } catch (e) {
                alert('Not authorized, no self profile info')
            }
            this.loading = false

        }
    };
</script>
