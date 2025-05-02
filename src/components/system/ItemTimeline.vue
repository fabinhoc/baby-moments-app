<script setup lang="ts">
import { type TimelineType } from 'src/types/Timeline.type';
import StorageMemory from 'src/utils/StorageMemory';

defineOptions({
  name: 'ItemTimeline',
});

defineProps<{
  timeline: TimelineType;
}>();

const { convertBytesToSize } = StorageMemory();
</script>

<template>
  <q-item class="q-pa-sm">
    <q-item-section>
      <q-item-label class="text-body1 text-primary"> {{ timeline.title }}</q-item-label>
      <q-item-label caption>
        {{ $t('app.components.itemTimeline.memoryUsage') }}:
        <q-badge
          rounded
          color="warning"
          :label="convertBytesToSize(timeline.memory_used)"
          style="font-size: 11px"
        />
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn dense icon="las la-ellipsis-v" flat round></q-btn>
    </q-item-section>
  </q-item>
</template>
