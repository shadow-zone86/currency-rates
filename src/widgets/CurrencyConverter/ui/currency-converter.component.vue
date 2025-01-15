<template>
  <div class="currency-converter">
    <UIInputWithSelect v-model:amount="fromAmount" v-model:currency="fromCurrency" :select="ratesStore.rates" />
    <UIButton class="currency-converter__btn" @click="flip">&#8596;</UIButton>
    <UIInputWithSelect v-model:amount="toAmount" v-model:currency="toCurrency" :select="ratesStore.rates"
      :disabled="true" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useConverterStore } from 'Entities/Converter'
import { useRatesStore } from 'Entities/Rates'
import UIButton from '@/shared/ui/UIButton'
import UIInputWithSelect from '@/shared/ui/UIInputWithSelect'

const ratesStore = useRatesStore()
const converterStore = useConverterStore()

const fromAmount = ref<number>(0)
const toAmount = ref<number>(0)
const fromCurrency = ref<string>('EUR')
const toCurrency = ref<string>('USD')

const flip = (): void => {
  ;[fromAmount.value, toAmount.value] = [toAmount.value, fromAmount.value]
    ;[fromCurrency.value, toCurrency.value] = [
      toCurrency.value,
      fromCurrency.value,
    ]
}

watch(
  [fromAmount, fromCurrency, toCurrency],
  ([fromAmount, fromCurrency, toCurrency]) => {
    toAmount.value = converterStore.calculate(fromAmount, fromCurrency, toCurrency, ratesStore.rates)
  }
)
</script>

<style scoped lang="scss">
.currency-converter {
  display: grid;
  grid-template-rows: auto;
  gap: 5rem;
  justify-items: center;

  @include sm {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 1rem;
  }

  &__btn {
    transform: rotate(-90deg);

    @include sm {
      transform: rotate(0deg);
    }
  }
}
</style>
