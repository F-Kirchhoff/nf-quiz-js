export function createElement(props) {
  const { type, id, classes, content } = props
  const newElement = document.createElement(type)
  //add id if specified
  if (id) newElement.id = id
  //add classes if specified
  if (classes)
    classes.forEach(className => {
      newElement.classList.add(className)
    })
  //add innerHTML if specified
  if (content) newElement.innerHTML = content

  return newElement
}

export function getElement(selector, parent = document) {
  return parent.querySelector(`[data-js=${selector}`)
}
export function getAllElements(selector, parent = document) {
  return parent.querySelectorAll(`[data-js=${selector}`)
}
