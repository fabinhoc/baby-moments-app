<script lang="ts" setup>
import { ref } from 'vue';
import { CircleStencil, Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import 'vue-advanced-cropper/dist/theme.compact.css';

defineOptions({
  name: 'UploadCropperImage',
  components: {
    Cropper,
    CircleStencil,
  },
});

interface ImageType {
  src: string | null;
  type: string | null;
}

defineProps<{
  image: ImageType;
}>();

const emit = defineEmits(['croppedImage', 'thumbUrl']);

const cropper: any = ref();

const uploadImage = () => {
  const { canvas } = cropper.value.getResult();
  if (canvas) {
    emit('thumbUrl', canvas.toDataURL());
    canvas.toBlob(async (blob: any) => {
      emit('croppedImage', await blob);
    }, 'image/jpeg');
  }
};
</script>

<template>
  <q-dialog full-width full-height>
    <q-card>
      <q-card-section class="column items-end justify-end">
        <q-btn icon="las la-times" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section style="height: 80%" class="column items-center justify-center">
        <Cropper
          ref="cropper"
          class="cropper"
          :src="image.src"
          :stencil-component="CircleStencil"
          :canvas="{
            width: 80,
            height: 80,
          }"
          :stencil-props="{
            handlers: {},
            movable: true,
            resizable: false,
          }"
          :stencil-size="{
            width: 80,
            height: 80,
          }"
          image-restriction="stencil"
        />
      </q-card-section>
      <q-card-actions class="row justify-center items-center">
        <q-btn color="primary" icon="las la-exchange-alt" @click="cropper.flip(true, false)" />
        <q-btn color="primary" icon="las la-redo-alt" @click="cropper.rotate(90)" />
        <q-btn color="primary" icon="las la-save" @click="uploadImage" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="css">
.cropper {
  height: 100%;
  width: 100%;
  background: #ddd;
}
.vertical-buttons {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
