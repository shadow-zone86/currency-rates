<template>
  <div class="rates-list">
    <UIInput type="text" v-model.trim="search" :icon="true" :clear="true" @clear-input="() => (search = '')" />
    <UIButton @click="toggleReverse" class="btn--margin">&#8596;</UIButton>
    <RatesTable :data="ratesStore.filterRates(search)" :show-table="showTable" :reverse="reverse" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRatesStore } from 'Entities/Rates'
import RatesTable from 'Features/RatesTable'
import UIInput from 'Shared/ui/UIInput'
import UIButton from 'Shared/ui/UIButton'

const ratesStore = useRatesStore()

const search = ref<string>('')
const reverse = ref<boolean>(false)

const showTable = computed(() => {
  return ratesStore.rates.length > 0
})

const toggleReverse = (): void => {
  reverse.value = !reverse.value
}
</script>

<style lang="scss"></style>
