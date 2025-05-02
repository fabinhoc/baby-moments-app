<script setup lang="ts">
defineOptions({
  name: 'CardSectionPageTitle',
});

defineProps<{
  title: string;
}>();
</script>

<template>
  <q-card-section class="text-primary text-h5 text-weight-medium q-pa-sm">
    {{ title }}
  </q-card-section>
</template>
