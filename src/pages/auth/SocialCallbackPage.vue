<script setup lang="ts">
import useAuthService from 'src/services/auth.service';
import { onMounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { me } = useAuthService();
const handleError: Ref<boolean> = ref(false);

const handleUser = async () => {
  const token: string = route.params.token as string;
  try {
    await me(token);
    await router.push({ name: 'list-timeline' });
  } catch (error: any) {
    console.log(error);
    handleError.value = true;
  }
};

onMounted(async () => {
  await handleUser();
});
</script>

<template>
  <q-page class="column items-center justify-center">
    <q-spinner color="secondary" :thickness="2" size="12em" />
    <span class="text-white text-h6 text-weight-thin">{{
      $t('app.pages.socialCallback.redirecting')
    }}</span>
    <span v-if="handleError" class="text-negative text-h6 text-weight-thin">
      {{ $t('app.pages.socialCallback.errorMessage') }}
    </span>
    <q-btn v-if="handleError" color="primary" rounded :to="{ name: 'login' }" icon="las la-undo">
      {{ $t('app.pages.socialCallback.backToLogin') }}
    </q-btn>
  </q-page>
</template>
