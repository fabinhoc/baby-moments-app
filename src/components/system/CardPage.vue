<script setup lang="ts">
defineOptions({
  name: 'CardPage',
});
</script>

<template>
  <q-card class="rounded-md" flat>
    <slot />
  </q-card>
</template>
