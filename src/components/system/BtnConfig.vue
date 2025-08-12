<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/auth.store';
import StorageMemory from 'src/utils/StorageMemory';

defineOptions({
  name: 'BtnConfig',
});

//usar storeToRefs
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { convertBytesToSize } = StorageMemory();
// const slider: Ref<string> = ref(convertBytesToSize(user.value.memory_used as number));
</script>

<template>
  <q-btn flat rounded icon="las la-cog" color="black" no-caps class="btn-config">
    <q-menu
      :anchor="$q.platform.is.mobile ? 'bottom right' : 'bottom left'"
      :class="$q.platform.is.mobile ? 'mobile-menu' : 'desktop-menu'"
    >
      <div>
        <q-list>
          <q-item>
            <q-item-section>
              <div>{{ $t('app.components.btnConfig.labelSlider') }}</div>
            </q-item-section>
          </q-item>
          <q-item class="" v-close-popup>
            <q-item-section side> 0 GB </q-item-section>
            <q-item-section>
              <template #default>
                <q-slider
                  :min="0"
                  :max="user.subscription.plan.available_memory"
                  :model-value="Number(user.memory_used)"
                  readonly
                  color="positive"
                  label-always
                  switch-label-side
                  :label-value="convertBytesToSize(user.memory_used as number)"
                >
                </q-slider>
              </template>
            </q-item-section>
            <q-item-section side>
              {{ convertBytesToSize(user.subscription.plan.available_memory) }}
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup :to="{ name: 'checkout' }">
            <q-item-section class="text-primary">
              <q-item-label>{{ $t('app.components.btnConfig.doUpgrade') }} </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-menu>
  </q-btn>
</template>

<style type="css">
.btn-config .q-btn-dropdown__arrow {
  font-size: 12px !important;
}
.mobile-menu {
  width: 96% !important;
  max-width: 96% !important;
  left: 2% !important;
}

.desktop-menu {
  width: 480px !important;
}
</style>
