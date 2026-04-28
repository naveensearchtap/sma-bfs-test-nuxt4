<script setup lang="ts">
useHead({ title: 'Dummy Page' })
</script>

<template>
  <s-page heading="Dummy Page">
    <div style="padding: 1rem;">
      <p>This is a dummy page.</p>
      <s-button @click="$router.back()">Go Back</s-button>
    </div>
  </s-page>
</template>
