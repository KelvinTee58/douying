// electron.js
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

console.log("Current directory:", __dirname);
console.log("Files in directory:", fs.readdirSync(__dirname));

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // win.loadFile(path.join(__dirname, "dist/index.html"));
  win.loadFile("index.html");
}

// 获取应用路径并传递到渲染进程
ipcMain.handle("get-app-path", (event) => {
  return app.getAppPath();
});

// 监听保存文件的对话框
ipcMain.handle("save-dialog", async (event, buffer) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: "Save Excel File",
    defaultPath: "exported-file.xlsx",
    filters: [{ name: "Excel Files", extensions: ["xlsx"] }],
  });

  if (!canceled && filePath) {
    // 保存文件
    fs.writeFileSync(filePath, buffer);
    return { success: true, path: filePath };
  }

  return { success: false };
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
