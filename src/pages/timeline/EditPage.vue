<script setup lang="ts">
import { type BreadCrumbType } from 'src/types/BreadCrumb.type';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import FormTimeline from 'src/components/timeline/FormTimeline.vue';
import CardPage from 'src/components/system/CardPage.vue';
import CardSectionPageTitle from 'src/components/system/CardSectionPageTitle.vue';
import BreadCrumb from 'src/components/system/BreadCrumb.vue';

defineOptions({
  name: 'EditTimelinePage',
});

const { t } = useI18n();
const route = useRoute();
const uuid = route.params.uuid as string;
const pageTitle: string = t('app.pages.timeline.edit.title');

const breadCrumbs: BreadCrumbType[] = [
  {
    label: 'Timelines',
    link: '/timeline',
    icon: 'las la-code-branch',
  },
  {
    label: pageTitle,
    link: `/timeline/edit/${uuid}`,
    icon: 'las la-pencil',
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
