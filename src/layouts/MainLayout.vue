<script setup lang="ts">
import BtnConfig from 'src/components/BtnConfig.vue';
import BtnUser from 'src/components/BtnUser.vue';
import { useAuthStore } from 'src/stores/auth.store';
import { ref } from 'vue';

defineOptions({
  name: 'MainLayout',
});

const authStore = useAuthStore();

const headerClass = ref('bg-transparent');

const revealTest = () => {
  headerClass.value = 'bg-white';
};

const onScroll = (scroll: any) => {
  if (scroll.position.top === 0) {
    headerClass.value = 'bg-transparent';
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Para um comportamento de scroll suave
  });
};
</script>

<template>
  <q-layout class="my-layout" view="lHh Lpr lFf">
    <q-scroll-observer @scroll="onScroll" />
    <q-header
      :class="headerClass"
      class="row items-center justify-center"
      :reveal="true"
      @reveal="revealTest"
    >
      <q-toolbar dark>
        <q-toolbar-title class="text-center">
          <q-img class="img-logo cursor-pointer" src="/logo.png"></q-img>
        </q-toolbar-title>

        <q-btn
          v-if="!authStore.isLoggedIn"
          :to="{ name: 'login' }"
          icon="las la-sign-in-alt"
          flat
          color="black"
          round
        />
        <BtnConfig v-if="authStore.isLoggedIn" />
        <BtnUser v-if="authStore.isLoggedIn" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click="scrollToTop" fab icon="expand_less" color="accent" padding="sm" />
      </q-page-sticky>
    </q-page-container>

    <q-footer class="" :reveal="true">
      <q-card class="bg-dark">
        <q-card-section class="column items-center q-gutter-xs">
          <q-img class="img-logo cursor-pointer" src="/logo.png" style="width: 70px"></q-img>
          <span style="font-size: 10px">Copyright © 2025 - Todos os direitos reservados</span>
          <div class="dev-box" style="font-size: 8px">Feito por Fabio Dev.</div>
        </q-card-section>
      </q-card>
    </q-footer>
  </q-layout>
</template>

<style type="css" scoped>
.img-logo {
  max-width: 150px;
  margin-top: 20px;
}
.dev-box {
  border: 1px solid #33223d;
  border-radius: 5px;
  padding: 5px;
}
</style>
