<script setup lang="ts">
import CardPage from 'src/components/system/CardPage.vue';
import CardSectionPageTitle from 'src/components/system/CardSectionPageTitle.vue';
import BreadCrumb from 'src/components/system/BreadCrumb.vue';
import { type BreadCrumbType } from 'src/types/BreadCrumb.type';
import { type TimelineType } from 'src/types/Timeline.type';
import CardSectionFirstTimeline from 'src/components/timeline/CardSectionFirstTimeline.vue';
import ItemTimeline from 'src/components/timeline/ItemTimeline.vue';
import useTimelineService from 'src/services/timeline.service';
import { onMounted, ref, type Ref } from 'vue';

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

const service = useTimelineService();
const timelines: Ref<TimelineType[]> = ref([]);

const getTimelines = async () => {
  timelines.value = await service.all();
};
</script>

<template>
  <q-page padding class="column q-gutter-md">
    <CardPage class="column items-center">
      <CardSectionPageTitle :title="'Timelines'" />
    </CardPage>
    <BreadCrumb :bread-crumbs="breadCrumbs" />
    <CardPage>
      <CardSectionFirstTimeline v-if="timelines.length <= 0" />
      <q-card-section v-else v-for="timeline in timelines" :key="timeline.uuid">
        <ItemTimeline :timeline="timeline" />
      </q-card-section>
    </CardPage>
  </q-page>
</template>
