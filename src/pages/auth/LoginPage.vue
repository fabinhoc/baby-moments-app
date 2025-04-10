<script setup lang="ts"></script>

<template>
  <q-page class="column items-center">
    <q-card flat class="q-pa-lg card-login column items-center">
      <q-card-section> aqui é o form </q-card-section>
      <q-card-actions class="q-gutter-y-md">
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
  height: 100vh;
  width: 100%;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
}
</style>
