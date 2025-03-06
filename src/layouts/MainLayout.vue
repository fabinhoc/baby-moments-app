<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-transparent row items-center justify-center" :reveal="false">
      <q-toolbar dark>
        <q-toolbar-title class="text-center">
          <q-img class="img-logo cursor-pointer" src="/logo.png"></q-img>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>

<style type="css" scoped>
.img-logo {
  max-width: 100px;
}
</style>
