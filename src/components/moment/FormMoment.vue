<script setup lang="ts">
import { type MomentDto } from 'src/types/dto/Moment.dto';
import { computed, type ComputedRef, onMounted, type Ref, ref } from 'vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import UploadCropperImage from 'src/components/moment/UploadCropperImage.vue';
import useMomentService from 'src/services/moment.service';
import { useI18n } from 'vue-i18n';
import useNotify from 'src/composables/useNotify';
import { useRoute, useRouter } from 'vue-router';
import 'emoji-picker-element';
import { date } from 'quasar';
import type { MomentType } from 'src/types/Moment.type';
import { insertEmojiAtInput } from 'src/utils/insertEmojiAtInput';

defineOptions({
  name: 'momentForm',
});

onMounted(async () => {
  await getMoment();
});

const openDialog: Ref<boolean> = ref(false);
const formMoment = ref();
const service = useMomentService();
const { t, locale } = useI18n();
const notify = useNotify();
const selectedImage: Ref<File | Blob | null> = ref(null);
const thumbImage: Ref<string | null> = ref(null);
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;
const activeField: Ref<keyof MomentDto> = ref('title');
const form: Ref<MomentDto> = ref({
  title: null,
  description: null,
  theme: '#eeeeee',
  position: null,
  avatar: null,
  moment_date: null,
});
const rules = {
  title: { required },
  description: {},
  theme: { required },
  position: { required },
  moment_date: {},
};
const inputRefs: any = {
  title: ref(),
  description: ref(),
};

const v$ = useVuelidate(rules, form);

const dateMask: ComputedRef<string> = computed(() => {
  return locale.value === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY';
});

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    const avatar = selectedImage.value ?? '';
    if (avatar) {
      formData.append('avatar', avatar);
    }
    formData.append('title', form.value.title as string);
    formData.append('description', form.value.description as string);
    formData.append('position', form.value.position?.toString() as string);
    formData.append(
      'timeline_id',
      route.params.timelineUuid ? route.params.timelineUuid.toString() : '',
    );
    formData.append('theme', form.value.theme as string);
    if (form.value.moment_date) {
      const parsedDate = parseAndFormatDate(form.value.moment_date);
      formData.append('moment_date', parsedDate as string);
    }

    if (id) {
      await service.put(parseInt(id), formData);
    } else {
      await service.post(formData);
    }

    notify.success(t('success'));
    await clear();
    await router.push({
      name: 'edit-timeline',
      params: { uuid: route.params.timelineUuid },
    });
  } catch (error: any) {
    console.log(error);
    const message = error?.response?.data?.message ?? error;
    notify.error(message);
  }
};

const parseAndFormatDate = (inputDate: string) => {
  let parsedDate;

  if (locale.value === 'pt-BR') {
    // Formato esperado: dd/mm/yyyy
    const [day, month, year] = inputDate.split('/');
    parsedDate = `${year}-${month}-${day}`;
  } else if (locale.value === 'en-US') {
    // Formato esperado: mm/dd/yyyy
    const [month, day, year] = inputDate.split('/');
    parsedDate = `${year}-${month}-${day}`;
  }

  return parsedDate;
};

const clear = async () => {
  if (id) {
    await getMoment();
  } else {
    form.value = {
      title: null,
      description: null,
      theme: '#eeeeee',
      position: null,
      avatar: null,
      moment_date: null,
    };
  }
  thumbImage.value = null;
  selectedImage.value = null;
  formMoment.value.reset();
};

const setImage = (fileImage: Blob) => {
  selectedImage.value = fileImage;
  openDialog.value = false;
};

const createThumb = (url: string) => {
  thumbImage.value = url;
};

const getMoment = async () => {
  try {
    if (id) {
      const data: { data: MomentType } = await service.findById(id);
      form.value = data.data;
      form.value.avatar = data.data.avatar ? process.env.STORAGE_URL + data.data.avatar : null;

      if (form.value.avatar) {
        thumbImage.value = form.value.avatar;
      }
      if (form.value.moment_date) {
        const [year, month, day] = form.value.moment_date.split('-').map(Number);
        const dateParsed = new Date(year as number, (month as number) - 1, day);
        form.value.moment_date = date.formatDate(dateParsed, dateMask.value);
      }
    }
  } catch (error: any) {
    console.log(error);
    const message = error?.response?.data?.message ?? error;
    notify.error(message);
  }
};

interface ImageType {
  src: string | null;
  type: string | null;
}

const image: Ref<ImageType> = ref({
  src: null,
  type: null,
});

const file: Ref<HTMLInputElement | null> = ref(null);

const getMimeType = (file: any, fallback = null) => {
  const byteArray = new Uint8Array(file).subarray(0, 4);
  let header = '';
  for (let i = 0; i < byteArray.length; i++) {
    header += byteArray[i]?.toString(16);
  }
  switch (header) {
    case '89504e47':
      return 'image/png';
    case '47494638':
      return 'image/gif';
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      return 'image/jpeg';
    default:
      return fallback;
  }
};

const handleFileChange = (event: any) => {
  const { files } = event.target;
  if (files && files[0]) {
    if (image.value.src) {
      URL.revokeObjectURL(image.value.src);
    }
    const blob = URL.createObjectURL(files[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      image.value = {
        src: blob,
        type: getMimeType(e?.target?.result, files[0].type),
      };
    };
    reader.readAsArrayBuffer(files[0]);
    openDialog.value = true;
  }
};

const setActiveField = (field: keyof MomentDto) => {
  activeField.value = field;
};

const addEmoji = (event: any) => {
  const field: keyof MomentDto = activeField.value;
  if (!field) return;

  const inputComponent = inputRefs[field]?.value;
  if (!inputComponent) return;

  const inputEl = inputComponent.$el.querySelector('input, textarea') as
    | HTMLInputElement
    | HTMLTextAreaElement;
  if (!inputEl) return;

  insertEmojiAtInput({
    inputElement: inputEl,
    modelValue: (form.value[field] as string) ?? '',
    emoji: event.detail.unicode,
    updateModel: (val: string | null) => {
      (form.value[field] as string | null) = val;
    },
  });
};
</script>

<template>
  <div class="column justify-center items-center q-pa-md">
    <UploadCropperImage
      v-model="openDialog"
      :image="image"
      @cropped-image="setImage"
      @thumb-url="createThumb"
    />
    <input
      type="file"
      ref="file"
      @change="handleFileChange($event)"
      accept="image/*"
      style="display: none"
    />
    <div style="position: relative; display: inline-block">
      <q-avatar size="80px" clickable class="cursor-pointer" @click="file?.click()" color="grey-2">
        <div v-if="thumbImage">
          <img :src="thumbImage" />
        </div>
        <div v-else>
          <q-icon name="las la-image"></q-icon>
        </div>
      </q-avatar>
      <q-btn
        round
        icon="las la-pencil-alt"
        color="grey-2"
        size="xs"
        text-color="dark"
        style="position: absolute; top: 0; right: -8px"
        @click="file?.click()"
      />
    </div>
  </div>
  <q-form class="column q-gutter-md" ref="formMoment" @submit.prevent="handleSubmit">
    <q-input
      :ref="inputRefs.title"
      v-model="v$.title.$model"
      :label="$t('app.components.momentForm.title')"
      lazy-rules
      outlined
      :rules="[() => !v$.title.required.$invalid || $t('validations.required')]"
      dense
      rounded
      @focus="setActiveField('title')"
    >
      <template v-slot:append>
        <q-btn icon="las la-smile" round flat>
          <q-popup-proxy :touch-position="true">
            <emoji-picker @emoji-click="addEmoji" class="light"></emoji-picker>
          </q-popup-proxy>
        </q-btn>
      </template>
    </q-input>
    <q-input
      v-model="v$.moment_date.$model"
      :label="$t('app.components.momentForm.momentDate')"
      lazy-rules
      outlined
      dense
      rounded
      mask="##/##/####"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="v$.moment_date.$model" :mask="dateMask">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input
      v-model="v$.position.$model"
      :label="$t('app.components.momentForm.position')"
      type="number"
      lazy-rules
      outlined
      :rules="[() => !v$.position.required.$invalid || $t('validations.required')]"
      :hint="$t('app.components.momentForm.positionHint')"
      dense
      rounded
    >
    </q-input>
    <q-input
      outlined
      v-model="v$.theme.$model"
      class="my-input"
      :label="$t('app.components.momentForm.theme')"
      :rules="[() => !v$.theme.required.$invalid || $t('validations.required')]"
      dense
      rounded
    >
      <template v-slot:append>
        <q-icon name="colorize" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-color v-model="v$.theme.$model" />
          </q-popup-proxy>
        </q-icon>
      </template>
      <template v-slot:hint>
        <q-badge
          :style="{ backgroundColor: form.theme }"
          class="q-mb-sm self-start"
          style="margin-top: -10px"
          rounded
        >
          <span class="text-dark">{{ form.theme }}</span>
        </q-badge>
      </template>
    </q-input>

    <q-input
      :ref="inputRefs.description"
      v-model="v$.description.$model"
      counter
      maxlength="255"
      autogrow
      outlined
      :label="$t('app.components.momentForm.description')"
      @focus="setActiveField('description')"
      dense
      rounded
    >
      <template v-slot:append>
        <q-btn icon="las la-smile" round flat>
          <q-popup-proxy :touch-position="true">
            <emoji-picker @emoji-click="addEmoji" class="light"></emoji-picker>
          </q-popup-proxy>
        </q-btn>
      </template>
    </q-input>
    <div class="row q-gutter-sm">
      <div class="col">
        <q-btn
          type="submit"
          class="full-width"
          color="primary"
          outline
          rounded
          :disable="v$.$invalid"
          >{{ $t('app.components.momentForm.save') }}</q-btn
        >
      </div>
      <div class="col">
        <q-btn @click="clear" class="full-width" type="button" color="negative" outline rounded>{{
          $t('app.components.momentForm.cancel')
        }}</q-btn>
      </div>
    </div>
  </q-form>
</template>
