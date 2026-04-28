<script setup lang="ts">
const dirtyInput = ref<HTMLInputElement | null>(null)

function triggerInput(value: string) {
  const input = dirtyInput.value
  if (!input) return
  input.value = value
  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.dispatchEvent(new Event('change', { bubbles: true }))
}

function show() {
  triggerInput('true')
}

function hide() {
  triggerInput('false')
}

defineExpose({ show, hide })
</script>

<template>
  <form
    data-save-bar
    v-bind="$attrs"
    @submit.prevent="$emit('save', $event)"
    @reset="$emit('discard', $event)"
  >
    <!-- Invisible text input that data-save-bar monitors for changes -->
    <input
      ref="dirtyInput"
      type="text"
      name="__dirty"
      value="false"
      data-default="false"
      aria-hidden="true"
      tabindex="-1"
      style="position:absolute;width:0;height:0;opacity:0;pointer-events:none;overflow:hidden;"
    />
    <slot />
  </form>
</template>
