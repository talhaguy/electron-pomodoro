window.addEventListener('DOMContentLoaded', () => {
  for (const type of ['chrome', 'node', 'electron']) {
    console.log(`${type}-version`, process.versions[type])
  }
})

/*
// use contextBridge to expose apis to renderer
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('api', {
  baseHref: __dirname
})
*/