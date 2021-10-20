export function createElement(type, classes, content) {
  const newElement = document.createElement(type)
  classes.forEach(className => {
    newElement.classList.add(className)
  })
  newElement.innerHtml = content
  return newElement
}
