<script setup lang="ts">
import { type BreadCrumbType } from 'src/types/BreadCrumb.type';
import CardPage from 'src/components/system/CardPage.vue';

defineOptions({
  name: 'BreadCrumb',
});

defineProps<{
  breadCrumbs: BreadCrumbType[];
}>();
</script>

<template>
  <CardPage>
    <q-card-section class="row items-center justify-between q-py-none">
      <q-btn
        :to="{ name: 'list-timeline' }"
        class="q-pa-none q-ma-none"
        size="md"
        flat
        round
        icon="las la-undo"
        color="primary"
      />
      <q-breadcrumbs align="right">
        <q-breadcrumbs-el icon="las la-home" to="/timeline" />
        <q-breadcrumbs-el
          v-for="(breadCrumb, index) in breadCrumbs"
          :key="index"
          :label="breadCrumb.label"
          :icon="breadCrumb.icon"
          :to="breadCrumb.link"
        />
      </q-breadcrumbs>
    </q-card-section>
  </CardPage>
</template>
