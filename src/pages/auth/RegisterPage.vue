<script setup lang="ts">
import FormRegister from 'src/components/auth/FormRegister.vue';

defineOptions({
  name: 'RegisterPage',
});
</script>

<template>
  <q-page class="row items-center justify-evenly" align="center">
    <div class="col-md-3 col-sm-6 col-xs-10">
      <q-card class="q-pa-lg">
        <q-card-section>
          <FormRegister />
          <div class="q-mt-lg">
            <q-btn @click="$router.push({ name: 'login' })" color="accent" flat>{{
              $t('app.pages.register.hasAnAccount')
            }}</q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
