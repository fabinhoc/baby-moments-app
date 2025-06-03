<script setup lang="ts">
import { type AlbumFileType } from 'src/types/AlbumFile.type';
import { AlbumFileFileTypeEnum } from 'src/types/enums/AlbumFileType.enum';
import { inject, ref, type Ref } from 'vue';
import StorageMemory from 'src/utils/StorageMemory';
import CardPage from '../system/CardPage.vue';

defineOptions({
  name: 'AlbumFileCard',
});

defineProps<{
  albumFile: AlbumFileType;
  theme: string;
}>();

const title: Ref<string> = ref('');
const isEditing: Ref<boolean> = ref(false);
const { convertBytesToSize } = StorageMemory();

const removeItem: any = inject('removeAlbumFile');
const updateItem: any = inject('updateAlbumFile');

const saveTitle = (id: number) => {
  updateItem(id, title.value);
  title.value = '';
  isEditing.value = false;
};

const edit = (id: number, itemTitle: string) => {
  title.value = itemTitle;
  isEditing.value = true;
};
</script>

<template>
  <CardPage
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
      :icon="albumFile.file_type === AlbumFileFileTypeEnum.VIDEO ? 'las la-video' : 'las la-image'"
      class="absolute"
      style="top: 15px; right: -5px; transform: translateY(-50%)"
    />
    <q-card-section class="q-pa-none q-pt-sm" style="min-height: 85px">
      <div v-if="albumFile.title && !isEditing" class="text-h6 row">
        {{ albumFile.title ? albumFile.title : '&nbsp;' }}
        <q-space></q-space>
        <q-btn
          @click="edit(albumFile.id, albumFile.title)"
          icon="las la-pencil-alt"
          round
          color="white"
          size="sm"
          flat
        ></q-btn>
      </div>
      <div v-else>
        <q-input
          v-model="title"
          :placeholder="'Sem título'"
          lazy-rules
          input-class="text-weight-bold text-h6 text-white"
          color="white"
        >
          <template v-slot:prepend>
            <q-icon name="las la-pencil-alt" size="xs" />
          </template>
        </q-input>
      </div>
    </q-card-section>
    <q-card-actions class="q-pa-none q-mb-none">
      <div class="text-body2 text-right">
        <q-chip color="warning" text-color="black" icon="las la-cloud-upload-alt">
          {{ convertBytesToSize(albumFile.memory_usage) }}
        </q-chip>
      </div>
      <q-btn @click="removeItem(albumFile.id)" icon="las la-trash" round color="black" flat></q-btn>
      <q-btn @click="saveTitle(albumFile.id)" icon="las la-save" round color="black" flat></q-btn>
    </q-card-actions>
  </CardPage>
</template>
