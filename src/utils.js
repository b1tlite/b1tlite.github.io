export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
export function toDateTime(secs) {
  var t = new Date(1970, 0, 1) // Epoch
  t.setSeconds(secs)
  return t
}
export function getRootElement(id, isHidden) {
  const root = document.getElementById(id) || document.createElement('div')
  root.id = id
  // if (isHidden) root.style.display = 'none'
  document.body.append(root)
  return root
}
