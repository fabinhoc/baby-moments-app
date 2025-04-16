<script setup lang="ts">
import useAuthService from 'src/services/auth.service';
import { useAuthStore } from 'src/stores/auth.store';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'BtnUser',
});

const router = useRouter();
const { logout } = useAuthService();

//usar storeToRefs
const user = computed(() => {
  const { user } = useAuthStore();
  return user;
});

const logoutUser = async () => {
  await logout();
  await router.push({ name: 'login' });
};
</script>

<template>
  <q-btn-dropdown
    flat
    rounded
    icon="las la-user"
    :label="user.name"
    color="black"
    no-caps
    dropdown-icon="las la-angle-down"
    class="btn-user"
  >
    <q-list>
      <q-item clickable v-close-popup @click="$router.push({ name: 'profile' })">
        <q-item-section avatar>
          <q-avatar icon="las la-pen" text-color="black" flat round />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t('app.components.btnUser.edit') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        v-close-popup
        @click="$router.push({ name: 'profile', hash: '#signature' })"
      >
        <q-item-section avatar>
          <q-avatar icon="las la-signature" text-color="primary" flat round />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t('app.components.btnUser.signature') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="logoutUser">
        <q-item-section avatar>
          <q-avatar icon="las la-sign-out-alt" text-color="negative" flat round />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t('app.components.btnUser.logout') }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<style type="css">
.btn-user .q-btn-dropdown__arrow {
  font-size: 12px !important;
}
</style>
