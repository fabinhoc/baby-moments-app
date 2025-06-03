<script lang="ts" setup>
import useNotify from 'src/composables/useNotify';
import useTimelineService from 'src/services/timeline.service';
import type { TimelineType } from 'src/types/Timeline.type';
import type { Ref } from 'vue';
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import CardPage from 'src/components/system/CardPage.vue';
import CardSectionPageTitle from 'src/components/system/CardSectionPageTitle.vue';
import { useI18n } from 'vue-i18n';
import type { MomentType } from 'src/types/Moment.type';

defineOptions({
  name: 'TimelinePage',
});

onMounted(async () => {
  await getTimeline();
  window.addEventListener('scroll', () => {
    handleScroll().catch((err) => {
      console.error('Erro ao executar handleScroll:', err);
    });
  });
  await handleScroll(); // Verifica se algum item já está visível no carregamento
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', () => {
    handleScroll().catch((err) => {
      console.error('Erro ao executar handleScroll:', err);
    });
  });
});

const service = useTimelineService();
const route = useRoute();
const uuid = route.params.uuid as string;
const timeline: Ref<TimelineType | null> = ref(null);
const moments: Ref<MomentType[]> = ref([]);
const notify = useNotify();
const { d } = useI18n();

const getTimeline = async () => {
  try {
    if (uuid) {
      const response: any = await service.findById(uuid);
      timeline.value = response.data;
      moments.value = response.data.moments.data.map((moment: any) => {
        let formattedDate = '';
        if (moment.moment_date) {
          const [year, month, day] = moment.moment_date.split('-').map(Number);
          const dateParsed = new Date(year, month - 1, day);
          formattedDate = d(new Date(dateParsed), 'extended');
        }
        return {
          ...moment,
          avatar: moment.avatar ? `${process.env.STORAGE_URL}${moment.avatar}` : null, // Adiciona a URL
          moment_date: formattedDate,
        };
      });
    }
  } catch (error: any) {
    console.log(error);
    const message = error?.response?.data?.message ?? error;
    notify.error(message);
  }
};

const dynamicBorderStyle = (color: string | null) => ({
  '--border-color': color,
});

const handleScroll = async () => {
  await nextTick(); // Aguarda o DOM renderizar
  const timelineEntries = document.querySelectorAll('.q-timeline__entry');
  timelineEntries.forEach((entry, index) => {
    const rect = entry.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (moments.value && moments.value[index]) {
        moments.value[index].isVisible = true;
      }
    }
  });
};
</script>

<template>
  <q-page padding @scroll="handleScroll" ref="page">
    <CardPage class="column items-center">
      <CardSectionPageTitle :title="timeline?.title ?? ''" />
      <h1 class="text-body1 text-center text-secondary">
        {{ timeline?.description }}
      </h1>
    </CardPage>

    <CardPage class="column items-center justify-start q-mb-xl q-mt-md">
      <q-timeline :layout="'loose'" color="secondary">
        <q-timeline-entry
          class="custom-avatar"
          :class="{ 'is-visible': moment.isVisible }"
          v-for="(moment, index) in moments"
          :key="index"
          :avatar="moment.avatar || undefined"
          :side="index % 2 === 0 ? 'left' : 'right'"
          :style="dynamicBorderStyle(moment.theme)"
        >
          <template v-slot:title>
            <router-link
              class="poppins-semibold all-pointer-events cursor-pointer text-underline"
              :style="{ color: moment.theme ?? 'text-primary' }"
              :to="{
                name: 'view-album',
                params: {
                  timelineUuid: moment.timeline.uuid,
                  id: moment.album.id,
                },
              }"
            >
              <q-icon name="las la-link" size="12px" style="margin-top: -1px"></q-icon>
              {{ moment.title }}
            </router-link>
          </template>
          <template v-slot:subtitle>
            <div class="text-primary poppins-semibold">
              {{ moment.moment_date }}
            </div>
          </template>
          <div class="description poppins-light text-grey text-caption wrap">
            <CardPage
              :style="{ backgroundColor: moment.theme }"
              class="q-pa-sm text-white"
              :class="index % 2 === 0 ? 'text-right' : 'text-left'"
            >
              {{ moment.description }}
            </CardPage>
          </div>
        </q-timeline-entry>
      </q-timeline>
    </CardPage>
  </q-page>
</template>

<style type="css" lang="css">
.q-timeline__entry--icon .q-timeline__dot:after {
  top: 87px !important;
}
.custom-avatar {
  min-height: 80px;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.custom-avatar.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.custom-avatar .q-timeline__dot {
  width: 40px !important;
}

.text-underline {
  text-decoration: underline;
}

.custom-avatar .q-timeline__dot::before {
  width: 80px !important;
  height: 80px !important;
  left: -24px;
}
.custom-avatar .q-timeline__dot-img {
  width: 80px !important;
  height: 80px !important;
  left: -24px;
  border: 4px solid var(--border-color) !important;
}
.custom-avatar .q-timeline__title {
  margin: 10px 20px 10px 19px;
}
.custom-avatar .q-timeline__subtitle {
  margin: 25px -21px 0px -21px;
}
.custom-avatar .description {
  margin: 0px 20px 0px 19px;
}
.custom-avatar,
.q-timeline__entry {
  padding-bottom: 60px !important;
}
</style>
