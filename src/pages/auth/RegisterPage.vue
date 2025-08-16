<script setup lang="ts">
import FormRegister from 'src/components/auth/FormRegister.vue';

defineOptions({
  name: 'RegisterPage',
});
</script>

<template>
  <q-page class="column items-center no-wrap" style="min-height: 100vh">
    <div class="column items-center justify-evenly q-pa-lg">
      <q-icon name="las la-unlock-alt" size="75px" color="primary-light-500" />
      <p class="text-light text-uppercase text-h5 text-primary-light-500 q-mt-sm">
        {{ $t('app.pages.register.title') }}
      </p>
    </div>
    <q-card class="q-pa-lg card-login">
      <q-card-section>
        <FormRegister />
      </q-card-section>
      <q-card-section class="column items-center">
        <q-btn @click="$router.push({ name: 'login' })" color="accent" flat>{{
          $t('app.pages.register.hasAnAccount')
        }}</q-btn>
        <q-btn link @click="$router.push({ name: 'index' })" color="accent" flat
          >Voltar para pagina inicial</q-btn
        >
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
