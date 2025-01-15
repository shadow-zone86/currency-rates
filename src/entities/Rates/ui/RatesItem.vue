<template>
  <div class="rates-item">
    <Currency :currency="props.item.currency" :code="props.item.details.NumCode" :name="props.item.details.Name" />
    <Rate :reverse="props.reverse" :nominal="props.item.details.Nominal" :rate="props.item.details.Value"
      :currency="props.item.currency" />
    <Trend :current="props.item.details.Value" :previous="props.item.details.Previous" />
  </div>
</template>

<script setup lang="ts">
import { Trend } from 'Entities/Rates'
import { Rate } from 'Entities/Rates'
import { Currency } from 'Entities/Rates'
import type { RatesList } from 'Entities/Rates/model/type'

interface IProps {
  item: RatesList
  reverse?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  reverse: false
})
</script>

<style scoped lang="scss">
.rates-item {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  border-radius: 10rem;
  padding: 1rem;
  background: $main-dark-color;
}
</style>
