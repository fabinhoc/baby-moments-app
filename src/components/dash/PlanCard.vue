<script setup lang="ts">
import useDialog from 'src/composables/useDialog';
import useNotify from 'src/composables/useNotify';
import usePlanService from 'src/services/plan.service';
import { useAuthStore } from 'src/stores/auth.store';
import { type PlanType } from 'src/types/Plan.type';
import { ref, type Ref } from 'vue';
import CardPage from '../system/CardPage.vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'PlanCard',
});

defineProps<{
  plan: PlanType;
}>();
const loading: Ref<boolean> = ref(false);
const authStore = useAuthStore();
const dialog = useDialog();
const service = usePlanService();
const notify = useNotify();
const router = useRouter();

const handleSubscription = async (plan: any) => {
  if (!authStore.isLoggedIn) {
    await router.push({ name: 'login' });
    return;
  }

  if (!authStore.isSubscribed) {
    return await subscribe(plan);
  }

  dialog.confirm('Alterar plano!', 'Deseja realmente fazer a alteração do seu plano?').onOk(() => {
    void (async () => {
      await subscribe(plan);
    })();
  });
};

const subscribe = async (plan: PlanType) => {
  try {
    loading.value = true;
    const { data }: any = await service.subscribe(plan);
    loading.value = false;
    notify.success(data.message);
    if (data.url) {
      window.location.href = data.url;
      return;
    }

    // await router.push({ name: 'list-timeline' });
  } catch (error: any) {
    console.log(error);
    loading.value = false;
    const message = error?.response?.data?.message ?? error;
    notify.error(message);
  }
};
</script>

<template>
  <CardPage class="q-pa-none">
    <q-card-section class="text-center q-ma-none">
      <h2 class="text-h4 text-bold text-primary">
        {{ plan.name }}
      </h2>
      <span class="text-body1">
        {{ plan.description }}
      </span>
    </q-card-section>
    <q-card-section class="row justify-center q-ma-none">
      <div class="text-center" style="max-width: 234px">
        <h2 class="text-h3 q-mb-none">
          {{ $n(parseFloat(plan.price), 'currency') }}
        </h2>
        <p class="text-overline text-right">por mês</p>
      </div>
    </q-card-section>
    <q-card-section class="q-ma-none">
      <q-list>
        <q-item v-for="(option, index) in plan.options" :key="index" class="q-my-none">
          <q-item-section thumbnail v-if="option.check">
            <q-icon color="positive" name="las la-check-double" />
          </q-item-section>
          <q-item-section>
            {{ option.title }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-actions>
      <q-btn
        outline
        rounded
        color="primary"
        class="full-width"
        @click="handleSubscription(plan)"
        :loading="loading"
        >Eu quero!</q-btn
      >
    </q-card-actions>
  </CardPage>
</template>
