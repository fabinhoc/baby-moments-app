<script setup lang="ts">
import StorageMemory from 'src/utils/StorageMemory';
import { type MomentType } from 'src/types/Moment.type';
import { inject } from 'vue';
defineOptions({
  name: 'ItemMoment',
});

defineProps<{
  moment: MomentType;
}>();

const { convertBytesToSize } = StorageMemory();
const deleteItem: any = inject('removeMoment');
</script>

<template>
  <q-item class="q-pa-sm">
    <q-item-section avatar>
      <q-avatar>
        <img
          v-if="moment.avatar"
          :src="moment.avatar"
          :style="{ border: '4px solid' + moment.theme }"
        />
        <div v-else :style="{ border: '4px solid' + moment.theme }" style="border-radius: 50%">
          <q-icon name="las la-camera" size="md"></q-icon>
        </div>
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ moment.title }}</q-item-label>
      <q-item-label caption lines="1">
        <q-badge
          rounded
          color="warning"
          :label="convertBytesToSize(moment.memory_used ?? 0)"
          style="font-size: 11px"
        />
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-badge
        rounded
        style="font-size: 16px"
        class="q-px-sm q-py-xs"
        color="accent"
        :label="moment.position ?? 0"
      />
    </q-item-section>
    <q-item-section side>
      <q-btn icon="las la-ellipsis-v" flat round>
        <q-menu style="max-width: 350px">
          <q-list>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="primary" name="las la-image" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('app.components.itemMoment.addPhoto', 0) }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              clickable
              :to="{
                name: 'edit-moment',
                params: { timelineUuid: moment.timeline.uuid, id: moment.id },
              }"
            >
              <q-item-section avatar>
                <q-icon color="primary" name="las la-pen" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('app.components.itemMoment.edit') }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable @click="deleteItem(moment.id)">
              <q-item-section avatar>
                <q-icon color="negative" name="las la-trash" />
              </q-item-section>
              <q-item-section
                ><q-item-label>{{
                  $t('app.components.itemMoment.remove')
                }}</q-item-label></q-item-section
              >
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-item-section>
  </q-item>
</template>
