<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';

defineOptions({
  name: 'LoginLayout',
});

onMounted(() => {
  document.body.classList.add('main-layout-bg');
});

onBeforeUnmount(() => {
  document.body.classList.remove('main-layout-bg');
});
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style type="css">
.main-layout-bg {
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
