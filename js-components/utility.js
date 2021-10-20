export function createElement(props) {
  const { type, id, classes, content } = props
  const newElement = document.createElement(type)
  if (id) newElement.id = id
  classes.forEach(className => {
    newElement.classList.add(className)
  })
  newElement.innerHTML = content
  return newElement
}
