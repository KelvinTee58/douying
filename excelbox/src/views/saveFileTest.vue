<template>
  <div>
    <button @click="openNewPage">Open New Page</button>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  methods: {
    openNewPage() {
      const newPageUrl = 'https://www.example.com'
      ipcRenderer.send('open-new-window', newPageUrl)
    }
  }
}
</script>