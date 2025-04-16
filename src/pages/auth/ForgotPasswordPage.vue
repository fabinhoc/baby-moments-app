<script setup lang="ts">
import FormForgotPassword from 'src/components/auth/FormForgotPassword.vue';

defineOptions({
  name: 'ForgotPasswordPage',
});
</script>

<template>
  <q-page class="row items-center justify-evenly" align="center">
    <div class="col-md-3 col-sm-6 col-xs-10">
      <q-card class="text-center q-pa-lg">
        <q-card-section>
          <p class="text-h5 text-weight-medium">
            {{ $t('app.pages.forgotPassword.title') }}
          </p>
        </q-card-section>
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
    </div>
  </q-page>
</template>
