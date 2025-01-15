<template>
  <nav>
    <RouterLink :to="{ name: 'Home' }">Currency rates</RouterLink>
    <RouterLink :to="{ name: 'Calc' }">Converter</RouterLink>
  </nav>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRatesStore } from 'Entities/Rates'

const ratesStore = useRatesStore()

onMounted(() => {
  ratesStore.fetchRates()
})
</script>

<style scoped lang="scss">
nav {
  margin: 5rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7rem;

  a {
    padding: 1rem 2rem;
    border-radius: 2rem 2rem 0 0;
    border: 2px solid $main-dark-color;

    &.router-link-active {
      font-weight: 700;
      background: $main-dark-color;
    }
  }
}
</style>
