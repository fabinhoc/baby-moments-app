<script setup lang="ts">
import { type TimelineType } from 'src/types/Timeline.type';
import StorageMemory from 'src/utils/StorageMemory';
import { inject } from 'vue';

defineOptions({
  name: 'ItemTimeline',
});

defineProps<{
  timeline: TimelineType;
}>();

const { convertBytesToSize } = StorageMemory();
const deleteItem: any = inject('remove');
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
      <q-btn icon="las la-ellipsis-v" flat round>
        <q-menu style="max-width: 350px">
          <q-list>
            <q-item
              clickable
              :to="{
                name: 'view-timeline',
                params: { uuid: timeline.uuid },
              }"
            >
              <q-item-section avatar>
                <q-icon color="primary" name="las la-play" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('app.components.itemTimeline.accessTimeline') }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable :to="{ name: 'edit-timeline', params: { uuid: timeline.uuid } }">
              <q-item-section avatar>
                <q-icon color="primary" name="las la-pen" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('app.components.itemTimeline.edit') }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable @click="deleteItem(timeline.uuid)">
              <q-item-section avatar>
                <q-icon color="negative" name="las la-trash" />
              </q-item-section>
              <q-item-section
                ><q-item-label>{{
                  $t('app.components.itemTimeline.remove')
                }}</q-item-label></q-item-section
              >
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-item-section>
  </q-item>
</template>
