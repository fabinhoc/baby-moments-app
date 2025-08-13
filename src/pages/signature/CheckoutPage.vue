<script setup lang="ts">
import PlanCard from 'src/components/dash/PlanCard.vue';
import CardPage from 'src/components/system/CardPage.vue';
import CardSectionPageTitle from 'src/components/system/CardSectionPageTitle.vue';
import useNotify from 'src/composables/useNotify';
import usePlanService from 'src/services/plan.service';
import { type PlanType } from 'src/types/Plan.type';
import { onMounted, ref, type Ref } from 'vue';

defineOptions({
  name: 'CheckoutPage',
});

onMounted(async () => {
  await getPlans();
});

const service = usePlanService();
const plans: Ref<PlanType[]> = ref([]);
const notify = useNotify();

const getPlans = async () => {
  try {
    const response: PlanType[] = await service.all();
    plans.value = response;
  } catch (error: any) {
    console.log(error);
    const message = error?.response?.data?.message ?? error;
    notify.error(message);
  }
};
</script>

<template>
  <q-page padding class="column q-gutter-md">
    <CardPage class="column items-center">
      <CardSectionPageTitle :title="$t('app.pages.checkout.title')" />
    </CardPage>
    <div v-for="plan in plans" :key="plan.id">
      <PlanCard :plan="plan" />
    </div>
  </q-page>
</template>
