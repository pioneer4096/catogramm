<template>
    <div class="demo-container">
        <q-card>
            <q-card-section>
                <q-item-label class="text-h6 q-mb-xs text-bold">
                    {{text}}
                </q-item-label>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
    export default {
        name: "DemoPage",
        props: {
            text: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>
    .demo-container {
        width: 100%;
    }
</style>