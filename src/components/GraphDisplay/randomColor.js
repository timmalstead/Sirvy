const randomColor = () => {
  const hue1 = Math.floor(Math.random() * 360)
  const onOff = Math.floor(Math.random() * 2)
  let hue2 = hue1 + 180 >= 360 ? 360 - hue1 : hue1 + 180
  const split = Math.floor(Math.random() * 80)

  // eslint-disable-next-line no-unused-expressions
  onOff && hue2 + split < 359
    ? (hue2 = hue2 + split)
    : !onOff && !hue2 - split < 0
    ? (hue2 = hue2 - split)
    : null

  const satArray = []

  for (let i = 0; i < 2; i++) {
    let sat = Math.floor(Math.random() * 86)

    // eslint-disable-next-line no-unused-expressions
    sat < 55 ? (sat = 55) : null

    satArray.push(sat)
  }

  return [
    `hsl(${hue1},${satArray[0]}%,50%)`,
    `hsl(${hue2},${satArray[1]}%,50%)`
  ]
}

export default randomColor
