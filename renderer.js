const store = require("store2")
const fs = require("fs")
const Path = require("path")

var bgPath = ""
var audio = new Audio()

var playing = false
const play = document.getElementById("play")
const rewind = document.getElementById("rewind")
const forward = document.getElementById("forward")
const playicon = document.getElementById("play-icon")

const name = document.getElementById("music_name")
const vol = document.getElementById("vol-changer")
const volImg = document.getElementById("vol-image")

const bgChoose = document.getElementById("bgchoose")
const bgChooser = document.getElementById("bgChooser")
const bg = document.querySelectorAll(".bg")

const choose = document.getElementById("choose")
const chooser = document.getElementById("fileChooser")

const timer = document.getElementById("timer")

if (fs.existsSync(store.get("bgPath"))) {
  bgPath = store.get("bgPath")
}

if (store.get("lastMusicPlayed")) {
  audio = new Audio(store.get("lastMusicPlayed"))
  name.textContent = Path.basename(audio.src)
  audio.load()
} else {
  alert("Can't found last played music. Please choose another.")
}
if (store.get("lastVol")) {
  const initVol = parseFloat(store.get("lastVol"))
  audio.volume = initVol
  vol.setAttribute("value", (initVol * 100).toString())
  if (initVol === 0) {
    volImg.setAttribute("src", "./assets/volume-x.png")
  } else {
    volImg.setAttribute("src", "./assets/volume-2.png")
  }
} else {
  audio.volume = 1
}

play.onclick = () => {
  if (audio.src !== "") {
    playing = !playing
    if (playing) {
      playicon.setAttribute("src", "./assets/pause.png")
      audio.play()
    } else {
      playicon.setAttribute("src", "./assets/play.png")
      audio.pause()
    }
  } else {
    alert("No audio file chosen.")
  }
}

rewind.onclick = () => {
  audio.currentTime -= 5
}

forward.onclick = () => {
  audio.currentTime += 5
}

setInterval(() => {
  timer.textContent = `${calcTime(Math.floor(audio.currentTime))} / ${calcTime(
    Math.floor(audio.duration)
  )}`
}, 500)

choose.onclick = () => chooser.click()

chooser.addEventListener("change", (e) => {
  const filepath = e.target.files[0].path
  console.log(filepath)
  playing = false
  audio.pause()
  audio.src = filepath
  playicon.setAttribute("src", "./assets/play.png")
  audio.load()
  store.set("lastMusicPlayed", audio.src)
  name.textContent = e.target.files[0].name
  chooser.setAttribute("value", "")
})

if (bgPath !== "") {
  bg.forEach((e) => {
    e.setAttribute("src", bgPath)
  })
} else {
  alert("No background detected. Please choose one.")
}

bgChoose.onclick = () => bgChooser.click()
bgChooser.addEventListener("change", (e) => {
  bgPath = e.target.files[0].path
  console.log("Image chosen: " + bgPath)

  bg.forEach((e) => {
    e.setAttribute("src", bgPath)
  })
  store.set("bgPath", bgPath)
})

vol.addEventListener("change", (e) => {
  const new_vol = e.target.value / 100
  console.log(new_vol)
  store.set("lastVol", new_vol.toString())

  if (new_vol === 0) {
    volImg.setAttribute("src", "./assets/volume-x.png")
  } else {
    volImg.setAttribute("src", "./assets/volume-2.png")
  }

  audio.volume = new_vol
})
