<script setup lang="ts">
import useAuthService from 'src/services/auth.service';
import { useAuthStore } from 'src/stores/auth.store';
import CardPage from 'src/components/system/CardPage.vue';
import CardSectionPageTitle from 'src/components/system/CardSectionPageTitle.vue';
import { onMounted } from 'vue';

const service = useAuthService();
const { token } = useAuthStore();

const handleUser = async () => {
  await service.me(token);
};

onMounted(async () => {
  await handleUser();
});
</script>

<template>
  <q-page padding class="column q-gutter-md">
    <CardPage class="column items-center">
      <CardSectionPageTitle :title="$t('app.pages.recievedPayment.title')" />
    </CardPage>
    <CardPage>
      <q-card-section class="text-center">
        <p class="text-primary text-h5">Parabéns!!!</p>
        <p class="text-info text-h5">Você acaba de realizar sua assinatura.</p>
        <q-btn rounded outline :to="{ name: 'list-timeline' }">Clique aqui e Aproveite</q-btn>
      </q-card-section>
    </CardPage>
  </q-page>
</template>
