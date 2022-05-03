<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="
      background: linear-gradient(
        45deg,
        #405de6,
        #5851db,
        #833ab4,
        #c13584,
        #e1306c,
        #fd1d1d
      );
    "
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 400px; height: 540px">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Регистрация</h4>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input
                ref="login"
                square
                clearable
                type="text"
                v-model="login"
                lazy-rules
                label="Имя пользователя"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <q-input
                ref="password"
                square
                clearable
                v-model="password"
                type="password"
                lazy-rules
                label="Пароль"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <!--                  <q-icon
                    :name="visibilityIcon"
                    @click="switchVisibility"
                    class="cursor-pointer"
                  />-->
                </template>
              </q-input>

              <q-input
                ref="repeatPassword"
                square
                clearable
                v-model="repeatPassword"
                type="password"
                lazy-rules
                label="Повторить пароль"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <!--                  <q-icon
                                      :name="visibilityIcon"
                                      @click="switchVisibility"
                                      class="cursor-pointer"
                                    />-->
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="lg"
              color="secondary"
              @click="doRegister"
              class="full-width text-white"
              label="Зарегистрироваться"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Забыли пароль?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";


export default defineComponent({
  name: "RegisterPage",
  data() {
    return {
      login: "",
      password: "",
      repeatPassword: "",
    };
  },
  methods: {
    async doRegister() {
      try {
        const response = await this.$store.dispatch('login', {
          login: this.login,
          password: this.password,
        })
        this.$store.commit('setAuthData', response.data)
        await this.$router.push('/')
      }
      catch (e) {
        console.log("axios error = ", e);
      }
    },
  },
});
</script>

<style scoped>
.q-card {
  width: 360px;
}
</style>
