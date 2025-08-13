<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import CardSectionPageTitle from 'src/components/system/CardSectionPageTitle.vue';
import CardPage from 'src/components/system/CardPage.vue';
import BreadCrumb from 'src/components/system/BreadCrumb.vue';
import { type BreadCrumbType } from 'src/types/BreadCrumb.type';
import { useRoute } from 'vue-router';
import FileDataUpload from 'src/components/album/FileDataUpload.vue';
import StorageMemory from 'src/utils/StorageMemory';
import useAlbumService from 'src/services/album.service';
import { type AlbumType } from 'src/types/Album.type';
import { onMounted, provide, ref, type Ref } from 'vue';
import { type AlbumFileType } from 'src/types/AlbumFile.type';
import useNotify from 'src/composables/useNotify';
import useDialog from 'src/composables/useDialog';
import useAlbumFileService from 'src/services/albumFile.service';
import useAuthService from 'src/services/auth.service';
import { useAuthStore } from 'src/stores/auth.store';
import AlbumFileCard from 'src/components/album/AlbumFileCard.vue';

defineOptions({
  name: 'SavePage',
});

onMounted(async () => {
  await getAlbum();
});

const { t } = useI18n();
const route = useRoute();
const pageTitle: string = t('app.pages.album.save.title');
const breadCrumbs: BreadCrumbType[] = [
  {
    label: 'Timeline',
    link: `/timeline/edit/${route.params.timelineUuid as string}`,
    icon: 'las la-code-branch',
  },
  {
    label: pageTitle,
    link: `/album/save/timeline/${route.params.timelineUuid as string}/album/${route.params.id as string}`,
    icon: 'las la-plus',
  },
];
const service = useAlbumService();
const id = route.params.id as string;
const album: Ref<AlbumType | null> = ref(null);
const albumFiles: Ref<AlbumFileType[]> = ref([]);
const theme: Ref<string> = ref('#eee');
const notify = useNotify();
const dialogConfirmation = useDialog();
const albumFileService = useAlbumFileService();
const userService = useAuthService();
const { token } = useAuthStore();

const getAlbum = async () => {
  try {
    if (id) {
      const response: { data: AlbumType } = await service.findById(id);
      album.value = response.data;
      albumFiles.value = response.data.album_files.data.map((file: any) => {
        return {
          ...file,
          file_path: `${import.meta.env.VITE_STORAGE_URL}${file.file_path}`, // Adiciona a URL
        };
      });
      theme.value = response.data.moment.theme as string;
    }
  } catch (error: any) {
    console.log(error);
    const message = error?.response?.data?.message ?? error;
    notify.error(message);
  }
};

const removeAlbumFile = (id: number) => {
  dialogConfirmation.confirm().onOk(() => {
    void (async () => {
      if (id) {
        await albumFileService.remove(id);
        await userService.me(token);
        await getAlbum();
      }
    })();
  });
};

const updateAlbumFile = async (id: number, title: string) => {
  try {
    if (id) {
      await albumFileService.put(id, { title: title });
      await getAlbum();
    }
  } catch (error: any) {
    console.log(error);
    const message = error?.response?.data?.message ?? error;
    notify.error(message);
  }
};

provide('removeAlbumFile', removeAlbumFile);
provide('updateAlbumFile', updateAlbumFile);

const { convertBytesToSize } = StorageMemory();
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
      <FileDataUpload @uploaded="getAlbum" />
    </CardPage>
    <CardPage>
      <q-card-section class="text-primary text-bold">
        <span>{{ $t('app.pages.album.save.totalMemoryUsed') }}:</span>
        {{ convertBytesToSize(album?.memory_usage as number) }}
      </q-card-section>
    </CardPage>
    <CardPage>
      <q-card-section>
        <div class="column q-gutter-y-md">
          <div class="row q-col-gutter-md q-mt-sm">
            <div
              class="col-lg-2 col-md-2 col-sm-12 col-xs-12"
              v-for="(albumFile, index) in albumFiles"
              :key="index"
            >
              <AlbumFileCard :album-file="albumFile" :theme="theme" />
            </div>
          </div>
        </div>
      </q-card-section>
    </CardPage>
  </q-page>
</template>
