<script setup lang="ts">
defineOptions({
  name: 'CardSection',
});

defineProps<{
  title: string;
}>();
</script>

<template>
  <q-card flat>
    <q-card-section class="text-warning text-center flex flex-center text-weight-bolder text-h6">{{
      title
    }}</q-card-section>
    <q-card-section>
      <slot />
    </q-card-section>
  </q-card>
</template>
