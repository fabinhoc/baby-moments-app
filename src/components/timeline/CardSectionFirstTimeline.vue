<script setup lang="ts">
defineOptions({
  name: 'CardSectionFirstTimeline',
});
</script>

<template>
  <q-card-section class="text-center">
    <p class="text-primary text-h5">Começe agora criando sua primeira timeline.</p>
    <p class="text-info text-h5">
      Dê um nome, adicione emojis, escreva uma frase bem legal sobre sua timeline.
    </p>
    <q-btn :to="{ name: 'create-timeline' }" rounded outline color="secondary"
      >Criar timeline</q-btn
    >
  </q-card-section>
</template>
