<script setup lang="ts">
defineOptions({
  name: 'ProfileSectionTitle',
});

defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <q-icon :name="icon" size="xs" style="margin-top: -5px"></q-icon>
    <span class="text-body2 text-grey text-uppercase">
      {{ title }}
    </span>
  </div>
  <q-separator></q-separator>
</template>
