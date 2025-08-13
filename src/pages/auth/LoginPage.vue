<script setup lang="ts">
import LoginForm from 'src/components/auth/LoginForm.vue';

const socialLogin = (provider: string) => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}/redirect`;
};
</script>

<template>
  <q-page class="column items-center no-wrap" style="min-height: 100vh">
    <div class="column items-center justify-evenly q-pa-lg">
      <q-icon name="las la-unlock-alt" size="75px" color="primary-light-500" />
      <p class="text-light text-uppercase text-h5 text-primary-light-500 q-mt-sm">
        {{ $t('app.layouts.welcome') }}
      </p>
    </div>
    <q-card flat class="q-pa-sm card-login column items-center q-x-gutter-sm">
      <q-card-section style="width: 100%" class="q-mt-md">
        <LoginForm />
      </q-card-section>

      <q-card-section style="width: 100%">
        <div class="row justify-evenly items-center">
          <q-separator class="col" />
          <div class="col text-center text-grey-6 text-body2">ou</div>
          <q-separator class="col" />
        </div>

        <div class="column items-center">
          <p class="col text-center q-mt-md text-grey-6 text-body2 text-bold">
            Login com redes sociais
          </p>
          <div class="row justify-center q-gutter-sm">
            <q-btn
              @click="socialLogin('google')"
              round
              icon="lab la-google-plus"
              class="text-google-plus"
            />
            <q-btn @click="socialLogin('microsoft')" round>
              <q-icon>
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path fill="#ff5722" d="M6 6H22V22H6z" />
                  <path fill="#4caf50" d="M26 6H42V22H26z" />
                  <path fill="#ffc107" d="M26 26H42V42H26z" />
                  <path fill="#03a9f4" d="M6 26H22V42H6z" />
                </svg>
              </q-icon>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="q-mb-n-lg">
        <div class="q-mt-lg row justify-center">
          <q-btn @click="$router.push({ name: 'forgot-password' })" color="primary-light-500" flat>
            {{ $t('app.pages.login.forgotPassword') }}
          </q-btn>
          <q-btn to="/auth/register" color="negative" flat>
            {{ $t('app.pages.login.createAccount') }}
          </q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<style type="css" scoped>
.card-login {
  width: 100%;
  flex-grow: 1;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  overflow-y: auto;
}
</style>
