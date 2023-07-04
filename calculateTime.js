function calcTime(sec) {
  const minute = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0")
  const second = (sec % 60).toString().padStart(2, "0")
  return `${minute} : ${second}`
}
