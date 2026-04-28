<script setup lang="ts">
const router = useRouter()

onMounted(() => {
  const channel = new BroadcastChannel('app-navigation')
  channel.onmessage = async (event) => {
    console.log('[app.vue] broadcast received:', event.data)
    if (event.data?.type === 'navigate') {
      const appWindow = document.getElementById('main-app-window') as any
      if (!appWindow) return // we're inside the iframe, ignore
      await appWindow.hide()
      router.push(event.data.to)
    }
  }
  onUnmounted(() => channel.close())
})
</script>

<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />

    <template v-if="$route.name !== 'app-window'">
      <s-app-window id="main-app-window" src="/app-window"></s-app-window>
      <s-button command="--show" commandFor="main-app-window">Open App Window</s-button>
    </template>
  </NuxtLayout>
</template>

