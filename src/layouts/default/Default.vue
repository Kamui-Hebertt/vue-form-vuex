<template>
  <v-app>
    <Header />

    <default-view />
    <Footer />
  </v-app>
</template>

<script setup>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  import DefaultView from './View.vue'
</script>
