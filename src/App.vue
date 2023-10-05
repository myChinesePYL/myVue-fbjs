<script setup lang="ts">
import iosButton from './components/iosButton.vue'
import cvs from './components/cvs.vue'
</script>

<template>
  <cvs />
  <iosButton style="position:relative;top:10px;"></iosButton>
  <p id="debug" style="z-index: 100; transform: translateY(10px)"></p>
</template>

<style scoped lang="scss"></style>
