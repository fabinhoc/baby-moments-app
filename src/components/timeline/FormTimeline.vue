<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'FormTimeline',
});

const handleSubmit = () => {};
const title = ref();
const description = ref();
</script>

<template>
  <q-form class="column q-gutter-md" ref="timelineForm" @submit.prevent="handleSubmit">
    <q-input
      v-model="title"
      :label="$t('app.components.timelineForm.title')"
      lazy-rules
      outlined
      rounded
      dense
    >
    </q-input>
    <q-input
      v-model="description"
      counter
      maxlength="255"
      autogrow
      outlined
      :label="$t('app.components.timelineForm.description')"
      dense
      rounded
    >
    </q-input>
    <div class="row q-gutter-sm">
      <div class="col">
        <q-btn type="submit" class="full-width" color="primary" outline rounded>{{
          $t('app.components.timelineForm.save')
        }}</q-btn>
      </div>
      <div class="col">
        <q-btn type="button" class="full-width" color="negative" outline rounded>{{
          $t('app.components.timelineForm.cancel')
        }}</q-btn>
      </div>
    </div>
  </q-form>
</template>
