<script setup lang="ts">
import { computed, type Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import 'emoji-picker-element';
import useAuthService from 'src/services/auth.service';
import { useAuthStore } from 'src/stores/auth.store';
import useAlbumFileService from 'src/services/albumFile.service';

enum UploadFileEnum {
  PENDING = 'PENDING',
  UPLOADING = 'UPLOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

interface UploadFileType {
  file: File;
  title: string | null;
  progress: number | undefined;
  thumb: string | undefined;
  status: UploadFileEnum;
  error?: string | null;
}

defineOptions({
  name: 'FileDataUpload',
});

const emit = defineEmits(['uploaded']);

const service = useAlbumFileService();
const fileInput: Ref<HTMLInputElement | null> = ref(null);
const files: Ref<UploadFileType[]> = ref([]);
const CHUNK_SIZE = 8 * 1024 * 1024;
const route = useRoute();
const authService = useAuthService();
const { token } = useAuthStore();
const totalSize = computed(() => {
  return files.value.reduce((total, fileObj) => {
    return total + fileObj.file.size;
  }, 0);
});

const openFilePicker = () => {
  if (fileInput.value === null) return;
  fileInput.value.click();
};

const handleFileChange = (event: any) => {
  const target = event.target as HTMLInputElement;

  if (target.files) {
    const filteredFiles = Array.from(target.files).filter((file) => {
      return file.type.startsWith('image/') || file.type === 'video/mp4';
    });

    const selectedFiles = filteredFiles.map((file: File) => {
      return {
        file: file,
        title: null,
        progress: 0,
        thumb: URL.createObjectURL(file),
        status: UploadFileEnum.PENDING,
      };
    });

    files.value = [...files.value, ...selectedFiles];
  }
};

const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} bytes`;
  } else if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
};

const removeAll = () => {
  files.value = [];
};

const removeFile = (file: UploadFileType) => {
  files.value = files.value.filter((f) => f.file !== file.file);
};

const uploadAll = async () => {
  for (const fileData of files.value) {
    await uploadFile(fileData);
  }
};

const uploadFile = async (fileData: UploadFileType) => {
  const file = fileData.file;
  const title = fileData.title ?? '';
  fileData.status = UploadFileEnum.UPLOADING;
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  let currentChunk = 0;

  const onProgress = (progress: number) => {
    fileData.status = UploadFileEnum.UPLOADING;
    fileData.progress = progress;
  };

  const onError = (message: string | null) => {
    fileData.status = UploadFileEnum.ERROR;
    fileData.error = message;
    console.error(`Erro ao enviar o arquivo: ${fileData.file.name}`);
    return;
  };

  const onSuccess = async () => {
    if (fileData.status === UploadFileEnum.ERROR) return;
    fileData.status = UploadFileEnum.SUCCESS;
    emit('uploaded');
    await authService.me(token);
  };

  const startUpload = async () => {
    while (currentChunk < totalChunks) {
      const start = currentChunk * CHUNK_SIZE;
      await uploadChunk(file, title, currentChunk, totalChunks, start, onProgress, onError);
      currentChunk++;
    }
    await onSuccess();
  };

  await startUpload();
};

const uploadChunk = async (
  file: File,
  title: string,
  chunkNumber: number,
  totalChunks: number,
  start: number,
  onProgress: (progress: number) => void,
  onError: (message: string | null) => void,
) => {
  const chunk = file.slice(start, start + CHUNK_SIZE);

  const formData = new FormData();
  const albumId = route.params.id ?? '';
  const blob = new Blob([chunk], { type: file.type });
  formData.append('file', blob, file.name);
  formData.append('chunk_index', chunkNumber.toString());
  formData.append('total_chunks', totalChunks.toString());
  formData.append('filename', file.name);
  formData.append('album_id', albumId.toString());
  formData.append('title', title.toString());

  try {
    await service.uploadChunks(formData);
    const progress = (chunkNumber + 1) / totalChunks;
    onProgress(progress);
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error;
    onError(message);
    console.error('Erro ao enviar chunk:', error);
  }
};

const defineProgressColor = (status: UploadFileEnum): string => {
  const colors: Record<UploadFileEnum, string> = {
    [UploadFileEnum.PENDING]: 'default',
    [UploadFileEnum.SUCCESS]: 'positive',
    [UploadFileEnum.ERROR]: 'negative',
    [UploadFileEnum.UPLOADING]: 'info',
  };

  return colors[status] || 'default';
};
</script>

<template>
  <q-card flat bordered>
    <q-card-section class="bg-primary">
      <input
        type="file"
        ref="fileInput"
        class="hidden"
        @change="handleFileChange"
        multiple
        accept="image/*,video/mp4"
      />
      <div class="row">
        <div class="text-body1 text-white q-mb-sm">
          {{ $t('app.components.fileDataUpload.makeUpload') }}
        </div>
        <q-space></q-space>
        <div class="row q-gutter-sm">
          <q-btn icon="las la-plus" color="white" text-color="dark" @click="openFilePicker">
            <q-tooltip>
              {{ $t('app.components.fileDataUpload.selectFiles') }}
            </q-tooltip>
          </q-btn>
          <q-btn
            icon="las la-cloud-upload-alt"
            color="white"
            text-color="primary"
            :disable="files.length <= 0"
            @click="uploadAll"
          >
            <q-tooltip>
              {{ $t('app.components.fileDataUpload.upload') }}
            </q-tooltip>
          </q-btn>
          <q-btn
            icon="las la-undo-alt"
            color="white"
            text-color="info"
            :disable="files.length <= 0"
            @click="removeAll"
          >
            <q-tooltip>
              {{ $t('app.components.fileDataUpload.removeAll') }}
            </q-tooltip>
          </q-btn>
        </div>
      </div>
      <div class="q-mt-md text-white">
        <div class="column">
          <div>
            {{ $t('app.components.fileDataUpload.totalSelected') }}
            <span class="text-weight-bold"
              >{{ files?.length ?? 0 }}
              {{ $t('app.components.fileDataUpload.file', 1) }}
            </span>
          </div>
          <span class="text-weight-bold">{{ formatFileSize(totalSize) }}</span>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-list bordered class="rounded-borders">
        <transition-group name="slide" tag="div">
          <div v-for="(file, index) in files" :key="index">
            <q-item>
              <q-item-section avatar side>
                <q-img
                  v-if="
                    ['image/png', 'image/jpeg', 'image/webpp', 'image/giff'].includes(
                      file.file.type,
                    )
                  "
                  :src="file.thumb"
                  :style="$q.platform.is.mobile ? 'min-width: 50px' : 'min-width: 120px'"
                />
                <q-icon
                  v-else
                  class="las la-video"
                  :style="$q.platform.is.mobile ? 'min-width: 50px' : 'min-width: 120px'"
                ></q-icon>
              </q-item-section>
              <q-item-section top class="q-col-gutter-xs">
                <q-item-label side>
                  <q-input
                    v-model="file.title"
                    style="max-width: 450px"
                    :placeholder="$t('app.components.fileDataUpload.addTitlePlaceholder')"
                    lazy-rules
                    input-class="text-weight-bold text-subtitle"
                  >
                    <template v-slot:prepend>
                      <q-icon name="las la-pencil-alt" size="xs" />
                    </template>
                  </q-input>
                </q-item-label>
                <q-item-label caption lines="1">
                  <span class="text-grey-8 q-mr-lg">
                    {{ $t('app.components.fileDataUpload.size') }}:
                    <span class="text-weight-bold">{{ formatFileSize(file.file.size) }}</span></span
                  >
                  <span class="text-grey-8 q-mr-lg">
                    {{ $t('app.components.fileDataUpload.type') }}:
                    <span class="text-weight-bold">{{ file.file.type }}</span></span
                  >
                  <span class="text-grey-8 q-mr-lg">
                    {{ $t('app.components.fileDataUpload.name') }}:
                    <span class="text-weight-bold">{{ file.file.name }}</span></span
                  >
                </q-item-label>
                <q-item-label caption>
                  <span class="text-grey-8">
                    {{ $t('app.components.fileDataUpload.status') }}:
                    <span class="text-weight-bold">{{ file.status }}</span></span
                  >
                </q-item-label>
                <q-item-label caption v-if="file.error">
                  <span class="text-weight-bold text-negative">{{ file.error }}</span>
                </q-item-label>
                <q-item-label lines="1">
                  <q-linear-progress
                    :color="defineProgressColor(file.status)"
                    stripe
                    size="4px"
                    :value="file.progress"
                  />
                </q-item-label>
                <q-item-label>
                  <q-btn
                    icon="las la-cloud-upload-alt"
                    flat
                    round
                    color="primary"
                    @click="uploadFile(file)"
                  ></q-btn>
                  <q-btn
                    @click="removeFile(file)"
                    :color="file.status !== UploadFileEnum.SUCCESS ? 'negative' : 'positive'"
                    flat
                    dense
                    round
                    :icon="file.status !== UploadFileEnum.SUCCESS ? 'las la-trash' : 'las la-check'"
                  />
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator spaced />
          </div>
        </transition-group>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<style scoped>
/* Definindo a transição do tipo slide */
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Estilização da lista de arquivos */
.file-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
}
</style>
