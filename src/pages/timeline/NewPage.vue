<script setup lang="ts">
import CardPage from 'src/components/system/CardPage.vue';
import CardSectionPageTitle from 'src/components/system/CardSectionPageTitle.vue';
import FormTimeline from 'src/components/timeline/FormTimeline.vue';
import BreadCrumb from 'src/components/system/BreadCrumb.vue';
import { type BreadCrumbType } from 'src/types/BreadCrumb.type';
import { useI18n } from 'vue-i18n';

defineOptions({
  name: 'NewPage',
});

const { t } = useI18n();
const pageTitle: string = t('app.pages.timeline.new.title');

const breadCrumbs: BreadCrumbType[] = [
  {
    label: 'Timelines',
    link: '/timeline',
    icon: 'las la-code-branch',
  },
  {
    label: pageTitle,
    link: '/timeline/new',
    icon: 'las la-plus',
  },
];
</script>

<template>
  <q-page padding class="column q-gutter-md">
    <CardPage class="column items-center">
      <CardSectionPageTitle :title="pageTitle" />
    </CardPage>
    <BreadCrumb :bread-crumbs="breadCrumbs" />
    <CardPage>
      <q-card-section>
        <FormTimeline />
      </q-card-section>
    </CardPage>
  </q-page>
</template>
