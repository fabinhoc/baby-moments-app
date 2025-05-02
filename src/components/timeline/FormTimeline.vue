<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
// import useTimelineService from 'src/services/timeline.service';
import { type TimelineDto } from 'src/types/dto/Timeline.dto';
import { type Ref, ref } from 'vue';
import 'emoji-picker-element';
import { insertEmojiAtInput } from 'src/utils/insertEmojiAtInput';

defineOptions({
  name: 'FormTimeline',
});

// const service = useTimelineService();
const formTimeline = ref();
const form: Ref<TimelineDto> = ref({
  title: null,
  description: null,
});
const inputRefs = {
  title: ref(),
  description: ref(),
};

const rules = {
  title: { required },
  description: {},
};
const v$ = useVuelidate(rules, form);
const activeField: Ref<keyof TimelineDto | null> = ref(null);

const handleSubmit = () => {};

const setActiveField = (field: keyof TimelineDto) => {
  activeField.value = field;
};

const addEmoji = (event: any) => {
  const field = activeField.value;
  if (!field) return;

  const inputComponent = inputRefs[field]?.value;
  if (!inputComponent) return;

  const inputEl = inputComponent.$el.querySelector('input, textarea') as
    | HTMLInputElement
    | HTMLTextAreaElement;
  if (!inputEl) return;

  insertEmojiAtInput({
    inputElement: inputEl,
    modelValue: form.value[field] ?? '',
    emoji: event.detail.unicode,
    updateModel: (val) => {
      form.value[field] = val;
    },
  });
};
</script>

<template>
  <q-form class="column q-gutter-md" ref="formTimeline" @submit.prevent="handleSubmit">
    <q-input
      :ref="inputRefs.title"
      v-model="v$.title.$model"
      :label="$t('app.components.formTimeline.title')"
      lazy-rules
      outlined
      rounded
      dense
      :rules="[() => !v$.title.required.$invalid || $t('validations.required')]"
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
      :ref="inputRefs.description"
      v-model="v$.description.$model"
      counter
      maxlength="255"
      autogrow
      outlined
      :label="$t('app.components.formTimeline.description')"
      dense
      rounded
      @focus="setActiveField('description')"
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
        <q-btn type="submit" class="full-width" color="primary" outline rounded>{{
          $t('app.components.formTimeline.save')
        }}</q-btn>
      </div>
      <div class="col">
        <q-btn type="button" class="full-width" color="negative" outline rounded>{{
          $t('app.components.formTimeline.cancel')
        }}</q-btn>
      </div>
    </div>
  </q-form>
</template>
