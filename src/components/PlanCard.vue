<script setup lang="ts">
import { ref, type Ref } from 'vue';

defineOptions({
  name: 'PlanCard',
});

const loading: Ref<boolean> = ref(false);
const plan: any = {
  name: 'Plano básico',
  description: '80GB de armazenamento para suas fotos e vídeos',
  price: 11.99,
  options: [
    {
      check: true,
      title: 'Armazenamento de 80GB.',
    },
    {
      check: true,
      title: 'Timelines ilimitadas.',
    },
    {
      check: true,
      title: 'Adicione fotos e vídeos nos seus álbuns.',
    },
    {
      check: true,
      title: 'Armazenamento seguro utilizando a maior provedora do mundo.',
    },
  ],
};

const handleSubscription = (plan: any) => {
  console.log(plan);
};
</script>

<template>
  <q-card class="q-pa-none column q-gutter-xs">
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
      <q-btn color="primary" class="full-width" @click="handleSubscription(plan)" :loading="loading"
        >Eu quero!</q-btn
      >
    </q-card-actions>
  </q-card>
</template>
