function makeTag(tag) {
  // creates a tag element for the tag list
  const newTag = document.createElement('li')
  newTag.classList.add('tag-list__item')
  newTag.innerText = tag

  return newTag
}

export default makeTag
