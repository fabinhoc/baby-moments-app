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
      <CardSectionPageTitle :title="$t('app.pages.paymentError.title')" />
    </CardPage>
    <CardPage>
      <q-card-section class="text-center">
        <p class="text-negative text-h4">Falha ao realizar pagamento.</p>
        <p class="text-grey text-h5">
          Não foi possível realizar a assinatura escolhida. Houve um erro ao processar pagamento do
          plano.
        </p>
        <q-btn rounded outline :to="{ name: 'checkout' }">Tente novamente</q-btn>
      </q-card-section>
      <q-card-section class="column items-center">
        <q-btn class="text-info" rounded flat>Entrar em contato com suporte</q-btn>
      </q-card-section>
    </CardPage>
  </q-page>
</template>
