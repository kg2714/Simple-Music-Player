const { app, BrowserWindow } = require("electron")
const path = require("path")

function create() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false
    },
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#f9fafb",
      symbolColor: "#02020299"
    }
  })

  win.loadFile("index.html")
}

app.whenReady().then(() => {
  create()

  if (BrowserWindow.getAllWindows().length === 0) create()
})

app.on("window-all-closed", () => {
  app.quit()
})
