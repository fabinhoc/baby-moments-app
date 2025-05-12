<script setup lang="ts">
import CardPage from 'src/components/system/CardPage.vue';
import CardSectionPageTitle from 'src/components/system/CardSectionPageTitle.vue';
import BreadCrumb from 'src/components/system/BreadCrumb.vue';
import { type BreadCrumbType } from 'src/types/BreadCrumb.type';
import { type TimelineType } from 'src/types/Timeline.type';
import CardSectionFirstTimeline from 'src/components/timeline/CardSectionFirstTimeline.vue';
import ItemTimeline from 'src/components/timeline/ItemTimeline.vue';
import useTimelineService from 'src/services/timeline.service';
import { onMounted, provide, ref, type Ref } from 'vue';
import useDialog from 'src/composables/useDialog';
import useNotify from 'src/composables/useNotify';
import { useI18n } from 'vue-i18n';

onMounted(async () => {
  await getTimelines();
});

const breadCrumbs: BreadCrumbType[] = [
  {
    label: 'Timelines',
    link: '/timeline',
    icon: 'las la-code-branch',
  },
];
const dialogConfirmation = useDialog();
const notify = useNotify();
const { t } = useI18n();

const service = useTimelineService();
const timelines: Ref<TimelineType[]> = ref([]);

const getTimelines = async () => {
  timelines.value = await service.all();
};

const remove = (uuid: string) => {
  dialogConfirmation
    .confirm(t('confirm.title'), t('app.pages.timeline.list.deleteConfirmation'))
    .onOk(() => {
      void (async () => {
        await deleteItem(uuid);
      })();
    });
};

const deleteItem = async (uuid: string) => {
  await service.remove(uuid);
  await getTimelines();
  notify.success(t('success'));
};

provide('remove', remove);
</script>

<template>
  <q-page padding class="column q-gutter-md">
    <CardPage class="column items-center">
      <CardSectionPageTitle :title="'Timelines'" />
    </CardPage>
    <BreadCrumb :bread-crumbs="breadCrumbs" />
    <CardPage v-if="timelines.length <= 0">
      <CardSectionFirstTimeline v-if="timelines.length <= 0" />
    </CardPage>
    <CardPage v-else v-for="timeline in timelines" :key="timeline.uuid">
      <q-card-section>
        <ItemTimeline :timeline="timeline" />
      </q-card-section>
    </CardPage>
    <q-btn
      :to="{ name: 'create-timeline' }"
      color="pink-11"
      unelevated
      rounded
      icon="las la-plus"
      >{{ $t('app.pages.timeline.list.add') }}</q-btn
    >
  </q-page>
</template>
