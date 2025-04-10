<script setup lang="ts">
defineOptions({
  name: 'LoginLayout',
});
</script>

<template>
  <q-layout view="lHh Lpr lFf" style="height: 100vh; overflow-y: hidden">
    <div class="column items-center justify-evenly q-pa-xl">
      <q-icon name="las la-unlock-alt" size="80px" color="primary-light-500"></q-icon>
      <p class="text-bold text-uppercase text-h5 text-primary-light-500 q-mt-sm">
        {{ $t('app.layouts.welcome') }}
      </p>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style type="css">
body {
  background: hsla(272, 57%, 86%, 1);

  background: linear-gradient(
    315deg,
    hsla(272, 57%, 86%, 1) 11%,
    hsla(276, 100%, 85%, 1) 45%,
    hsla(271, 59%, 78%, 1) 64%,
    hsla(273, 59%, 68%, 1) 100%
  );

  background: -moz-linear-gradient(
    315deg,
    hsla(272, 57%, 86%, 1) 11%,
    hsla(276, 100%, 85%, 1) 45%,
    hsla(271, 59%, 78%, 1) 64%,
    hsla(273, 59%, 68%, 1) 100%
  );

  background: -webkit-linear-gradient(
    315deg,
    hsla(272, 57%, 86%, 1) 11%,
    hsla(276, 100%, 85%, 1) 45%,
    hsla(271, 59%, 78%, 1) 64%,
    hsla(273, 59%, 68%, 1) 100%
  );
}
</style>
