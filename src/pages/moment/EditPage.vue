<script setup lang="ts">
import FormMoment from 'src/components/moment/FormMoment.vue';
import { type BreadCrumbType } from 'src/types/BreadCrumb.type';
import { useI18n } from 'vue-i18n';
import CardSectionPageTitle from 'src/components/system/CardSectionPageTitle.vue';
import CardPage from 'src/components/system/CardPage.vue';
import BreadCrumb from 'src/components/system/BreadCrumb.vue';
import { useRoute } from 'vue-router';

defineOptions({
  name: 'EditMomentPage',
});

const { t } = useI18n();
const pageTitle: string = t('app.pages.moment.edit.title');
const route = useRoute();

const breadCrumbs: BreadCrumbType[] = [
  {
    label: 'Timeline',
    link: `/timeline/edit/${route.params.timelineUuid as string}`,
    icon: 'las la-code-branch',
  },
  {
    label: pageTitle,
    link: '/moment/edit',
    icon: 'las la-pen',
  },
];
</script>

<template>
  <q-page padding class="column q-gutter-md">
    <CardPage class="column items-center">
      <CardSectionPageTitle :title="pageTitle" />
    </CardPage>
    <BreadCrumb
      :bread-crumbs="breadCrumbs"
      :go-back="{ name: 'edit-timeline', params: { uuid: $route.params.timelineUuid } }"
    />
    <CardPage>
      <q-card-section>
        <FormMoment />
      </q-card-section>
    </CardPage>
  </q-page>
</template>
