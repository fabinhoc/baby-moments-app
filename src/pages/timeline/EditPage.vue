<script setup lang="ts">
import { type BreadCrumbType } from 'src/types/BreadCrumb.type';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import FormTimeline from 'src/components/timeline/FormTimeline.vue';
import CardPage from 'src/components/system/CardPage.vue';
import CardSectionPageTitle from 'src/components/system/CardSectionPageTitle.vue';
import BreadCrumb from 'src/components/system/BreadCrumb.vue';
import { type TimelineType } from 'src/types/Timeline.type';
import useTimelineService from 'src/services/timeline.service';
import { onMounted, provide, ref, type Ref } from 'vue';
import useNotify from 'src/composables/useNotify';
import { type MomentType } from 'src/types/Moment.type';
import ItemMoment from 'src/components/moment/ItemMoment.vue';
import useDialog from 'src/composables/useDialog';
import useMomentService from 'src/services/moment.service';

defineOptions({
  name: 'EditTimelinePage',
});

onMounted(async () => {
  await getTimeline();
});

const service = useTimelineService();
const { t } = useI18n();
const route = useRoute();
const uuid = route.params.uuid as string;
const pageTitle: string = t('app.pages.timeline.edit.title');
const notify = useNotify();
const moments: Ref<MomentType[]> = ref([]);
const dialogConfirmation = useDialog();
const momentService = useMomentService();

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

const getTimeline = async () => {
  try {
    if (uuid) {
      const response: { data: TimelineType } = await service.findById(uuid);
      const momentsCollection: any = response.data.moments;
      const momentsValues: MomentType[] = momentsCollection.data.map((moment: any) => {
        return {
          ...moment,
          avatar: moment.avatar ? `${process.env.STORAGE_URL}${moment.avatar}` : null, // Adiciona a URL
        };
      });
      moments.value = momentsValues;
    }
  } catch (error: any) {
    console.log(error);
    const message = error?.response?.data?.message ?? error;
    notify.error(message);
  }
};

const removeMoment = (id: number) => {
  dialogConfirmation
    .confirm(t('confirm.title'), t('app.pages.timeline.edit.deleteConfirmation'))
    .onOk(() => {
      void (async () => {
        await deleteMomentItem(id);
      })();
    });
};

const deleteMomentItem = async (id: number) => {
  await momentService.remove(id);
  await getTimeline();
  notify.success(t('success'));
};

provide('removeMoment', removeMoment);
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
    <CardPage>
      <CardSectionPageTitle
        class="text-center text-h6"
        :title="$t('app.pages.timeline.edit.moment', 0)"
      />
    </CardPage>
    <CardPage v-for="(moment, key) in moments" :key="key">
      <ItemMoment :moment="moment" />
    </CardPage>
    <q-btn
      :to="{ name: 'create-moment', params: { timelineUuid: uuid } }"
      color="pink-11"
      unelevated
      rounded
      icon="las la-plus"
      >{{ $t('app.pages.timeline.edit.addMoment') }}</q-btn
    >
  </q-page>
</template>
