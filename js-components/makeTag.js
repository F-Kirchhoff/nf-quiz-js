import { createElement } from './utility.js'

function makeTag(tag) {
  // creates a tag element for the tag list
  const props = {
    type: 'li',
    classes: ['tag-list__item'],
    content: tag,
  }
  const newTag = createElement(props)

  return newTag
}

export default makeTag
