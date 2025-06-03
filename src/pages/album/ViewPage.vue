<script setup lang="ts">
import useNotify from 'src/composables/useNotify';
import useAlbumService from 'src/services/album.service';
import { type AlbumFileType } from 'src/types/AlbumFile.type';
import { type AlbumType } from 'src/types/Album.type';
import { AlbumFileFileTypeEnum } from 'src/types/enums/AlbumFileType.enum';
import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import CardPage from 'src/components/system/CardPage.vue';
import CardSectionPageTitle from 'src/components/system/CardSectionPageTitle.vue';

defineOptions({
  name: 'ViewPage',
});

onMounted(async () => {
  await getAlbum();
});

const route = useRoute();
const id = route.params.id as string;
const service = useAlbumService();
const albumFiles: Ref<AlbumFileType[]> = ref([]);
const album: Ref<AlbumType | null> = ref(null);
const notify = useNotify();
const theme: Ref<string> = ref('#eee');

const getAlbum = async () => {
  try {
    if (id) {
      const response: { data: AlbumType } = await service.findById(id);
      album.value = response.data;
      albumFiles.value = response.data.album_files.data.map((file: any) => {
        return {
          ...file,
          file_path: `${process.env.STORAGE_URL}${file.file_path}`, // Adiciona a URL
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
</script>

<template>
  <CardPage>
    <CardSectionPageTitle
      :title="album?.moment.title as string"
      class="text-center"
    ></CardSectionPageTitle>

    <CardPage class="bg-transparent" flat>
      <q-card-section>
        <q-btn
          :to="{
            name: 'view-timeline',
            params: { uuid: album?.moment.timeline.uuid },
          }"
          icon="las la-undo"
          flat
          rounded
          color="primary"
          >{{ $t('app.pages.album.save.goBack') }}</q-btn
        >
      </q-card-section>
      <q-card-section>
        <div class="column q-gutter-y-md">
          <div class="row q-col-gutter-md q-mt-sm">
            <div
              class="col-lg-2 col-md-2 col-sm-12 col-xs-12"
              v-for="(albumFile, index) in albumFiles"
              :key="index"
            >
              <q-card
                :style="{
                  backgroundColor: theme,
                  border: '10px solid' + theme,
                }"
                dark
              >
                <video
                  class="full-width"
                  v-if="albumFile.file_type === AlbumFileFileTypeEnum.VIDEO"
                  :src="albumFile.file_path"
                  :autoplay="false"
                  style="height: 200px"
                  controls
                />
                <q-img v-else :src="`${albumFile.file_path}`" style="height: 200px" />
                <q-btn
                  flat
                  round
                  :style="{ backgroundColor: theme }"
                  :icon="
                    albumFile.file_type === AlbumFileFileTypeEnum.VIDEO
                      ? 'las la-video'
                      : 'las la-image'
                  "
                  class="absolute"
                  style="top: 15px; right: -5px; transform: translateY(-50%)"
                />
                <q-card-section class="q-pa-none q-pt-sm" style="min-height: 85px">
                  {{ albumFile.title ? albumFile.title : '&nbsp;' }}
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </q-card-section>
    </CardPage>
  </CardPage>
</template>
