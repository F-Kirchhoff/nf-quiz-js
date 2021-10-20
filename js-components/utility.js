export function createElement(props) {
  const { id, classes, type, content } = props
  const newElement = document.createElement(type)
  if (id) newElement.id = id
  classes.forEach(className => {
    newElement.classList.add(className)
  })
  newElement.innerHtml = content
  return newElement
}
