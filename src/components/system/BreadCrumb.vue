<script setup lang="ts">
import { type BreadCrumbType } from 'src/types/BreadCrumb.type';
import CardPage from 'src/components/system/CardPage.vue';

defineOptions({
  name: 'BreadCrumb',
});

defineProps<{
  breadCrumb: BreadCrumbType;
}>();
</script>

<template>
  <CardPage>
    <q-card-section class="row items-center justify-between q-py-none">
      <q-btn class="q-pa-none q-ma-none" size="md" flat round icon="las la-undo" color="primary" />
      <q-breadcrumbs align="right">
        <q-breadcrumbs-el icon="las la-home" :to="{ name: 'list-timeline' }" />
        <q-breadcrumbs-el
          :label="breadCrumb.label"
          :icon="breadCrumb.icon"
          :to="{ name: breadCrumb.link }"
        />
      </q-breadcrumbs>
    </q-card-section>
  </CardPage>
</template>
