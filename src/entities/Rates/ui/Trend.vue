<template>
  <div class='trend' :class="{ 'trend_growing': isGrowing }">
    <span class="trend__icon">
      <img v-if="isGrowing" src="Images/arrup.svg" alt="up" class="trend__icon-arrow">
      <img v-else src="Images/arrdown.svg" alt="down" class="trend__icon-arrow">
    </span>
    <span class="trend__sign">{{ isGrowing ? '+' : '-' }}</span>
    <span class="trend__value">
      {{ Math.abs((props.current - props.previous)).toFixed(3) }}
    </span>
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'

interface IProps {
  current: number
  previous: number
}

const props = withDefaults(defineProps<IProps>(), {
  current: 0,
  previous: 0
})

const isGrowing = computed(() => {
  return props.current >= props.previous
})
</script>

<style scoped lang='scss'>
.trend {
  color: $color-error;
  font-size: 1.5rem;

  &_growing {
    color: $primary-theme-color;
  }

  &__icon {
    display: inline-block;
    margin-right: 1rem;
  }

  &__icon-arrow {
    fill: currentColor;
    width: 1.2rem;
    display: inline;
  }

  &__sign {
    display: inline-block;
  }

  &__value {
    display: inline-block;
  }
}
</style>
