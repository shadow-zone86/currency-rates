<template>
  <button class="btn" @click="btnClick()">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface IEmits {
  (e: 'click'): void
}

const emit = defineEmits<IEmits>()

const btnClick = (): void => {
  emit('click')
}
</script>

<style scoped lang="scss">
.btn {
  width: 5rem;
  height: 5rem;
  box-shadow: none;
  border: none;
  border-radius: 5rem;
  font-size: 2rem;
  line-height: 3rem;

  &--margin {
    margin-top: 5rem;
    margin-bottom: 5rem;
  }
}
</style>
