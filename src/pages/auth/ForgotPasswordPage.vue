<script setup lang="ts">
import FormForgotPassword from 'src/components/auth/FormForgotPassword.vue';

defineOptions({
  name: 'ForgotPasswordPage',
});
</script>

<template>
  <q-page class="column items-center no-wrap" style="min-height: 100vh">
    <div class="column items-center justify-evenly q-pa-lg">
      <q-icon name="las la-unlock-alt" size="75px" color="primary-light-500" />
      <p class="text-light text-uppercase text-h5 text-primary-light-500 q-mt-sm">
        {{ $t('app.pages.forgotPassword.title') }}
      </p>
    </div>
    <q-card class="text-center card-login q-pa-lg">
      <q-card-section>
        <p class="">
          {{ $t('app.pages.forgotPassword.message') }}
        </p>
      </q-card-section>
      <q-card-section>
        <FormForgotPassword />
      </q-card-section>
      <q-card-section>
        <p class="">
          {{ $t('app.pages.forgotPassword.remember') }}
          <q-btn flat color="accent" @click="$router.push({ name: 'login' })">{{
            $t('app.pages.forgotPassword.signin')
          }}</q-btn>
        </p>
      </q-card-section>
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
