<template>
  <div class="rates-table" v-if="props.showTable">
    <RatesItem v-for="item in props.data" :key="item?.details.ID" :item="item" :reverse="reverse" />
    <div class="rates-table__no-result" v-if="!data.length">
      No results...
    </div>
  </div>
  <div class="rates-table__no-result" v-else>Loading ...</div>
</template>

<script setup lang="ts">
import { RatesItem } from 'Entities/Rates'
import type { RatesList } from 'Entities/Rates/model/type'

interface IProps {
  showTable: boolean
  data: RatesList[]
  reverse?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  showTable: false,
  data: () => [],
  reverse: false
})
</script>

<style scoped lang="scss">
.rates-table {
  gap: 3rem;
  display: grid;
  width: 100%;
  padding-bottom: 5rem;

  &__no-result {
    color: $gray-font-color;
    padding: 2rem;
    border-radius: 5rem;
    background: $main-dark-color;
  }
}
</style>
