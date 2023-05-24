<template>
  <Home></Home>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import Home from "./views/Home.vue"
import { inject } from 'vue'
const title:any =  inject("title");
title.value = "家";
</script>