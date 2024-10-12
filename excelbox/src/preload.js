// const { contextBridge, ipcRenderer } = require('electron');

// // 将方法暴露给渲染进程
// contextBridge.exposeInMainWorld('electron', {
//   getAppPath: () => ipcRenderer.invoke('get-app-path'),
//   saveDialog: (buffer) => ipcRenderer.invoke('save-dialog', buffer),
// });
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openNewWindow: (url) => ipcRenderer.send("open-new-window", url),
});
