<script setup lang="ts">
definePageMeta({ layout: 'window' })

useHead({ title: 'App Window' })

const saveBar = ref()
const ready = ref(false)

function navigateTo(path: string) {
  console.log('[app-window] broadcasting navigate:', path)
  const channel = new BroadcastChannel('app-navigation')
  channel.postMessage({ type: 'navigate', to: path })
  channel.close()
}

onMounted(async () => {
  await customElements.whenDefined('s-page')
  ready.value = true
})

function onSave() {
  console.log('saved')
  saveBar.value?.hide()
  // TODO: persist data
}

function onDiscard() {
  console.log('discarded')
}
</script>

<template>
  <s-page heading="App Window">
    <template v-if="ready">
      <s-button slot="secondary-actions" type="reset" form="save-bar-form">Cancel</s-button>
      <s-button slot="secondary-actions" @click="navigateTo('/dummy')">Go to Page</s-button>
      <s-button slot="primary-action" variant="primary" type="submit" form="save-bar-form">Save</s-button>
      <s-button slot="secondary-actions" command="--hide" commandFor="main-app-window">Close App Window</s-button>
    </template>

    <div style="padding: 1rem;">
      <SaveBar ref="saveBar" id="save-bar-form" @save="onSave" @discard="onDiscard" />

      <s-button @click="saveBar?.show()">Show Save Bar</s-button>
      <s-button @click="saveBar?.hide()">Hide Save Bar</s-button>
    </div>
  </s-page>
</template>
