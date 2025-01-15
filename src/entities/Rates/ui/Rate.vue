<template>
  <div class="rate">
    <div v-if="!reverse">
      <div>{{ props.nominal }} <span class="rate__currency">{{ props.currency }}</span></div>
      <div>&nbsp;=&nbsp;</div>
      <div><b>{{ props.rate.toFixed(3) }}</b> <span class="rate__currency">RUB</span></div>
    </div>
    <div v-else>
      <div>1 <span class="rate__currency">RUB</span></div>
      <div>&nbsp;=&nbsp;</div>
      <div>
        <b>{{ reverseRate }}</b>
        <span class="rate__currency">{{ props.currency }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface IProps {
  reverse: boolean
  nominal: number
  rate: number
  currency: string
}

const props = withDefaults(defineProps<IProps>(), {
  reverse: false,
  nominal: 1,
  rate: 0,
  currency: 'USD'
})

const reverseRate = computed(() => ((1 / props.rate) * props.nominal).toFixed(3))
</script>

<style scoped lang="scss">
.rate {
  font-size: 1.75rem;

  @include sm {
    font-size: inherit;
  }

  & > div {
    display: flex;

    div {
      &:first-child {
        text-align: right;
        flex: 1;
      }

      &:last-child {
        text-align: left;
        flex: 1;
      }
    }
  }
}
</style>
