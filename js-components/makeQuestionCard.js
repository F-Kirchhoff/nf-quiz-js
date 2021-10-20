import makeTag from './makeTag.js'
import { createElement, getElement } from './utility.js'

function makeQuestionCard(model, questionDB, update, questionObj) {
  // creates a question card in the dom, adds functionality to it and fills in the content dynamically
  const { _id, question, answer, tags, saved } = questionObj

  const cardContent = `
    <div class="q-card__q-container">
      <h2 class="q-card__title text-primary">Question</h2>
      <p class="q-card__q-text">
        ${question}
      </p>
    </div>
    <button data-js="answer-btn" class="q-card__btn bg-gradient-secondary">
      <span data-js="show-text" class="q-card__btn-text"> show answer </span>
      <span data-js="hide-text" class="q-card__btn-text hidden">
        hide answer
      </span>
    </button>
    <div data-js="answer-container" class="q-card__answer-container hidden">
      <h2 class="q-card__title text-secondary">Answer</h2>
      <p class="q-card__a-text bg-gradient-secondary">
        ${answer}
      </p>
    </div>
    <ul data-js="tag-list" class="tag-list">
    </ul>
    <button data-js="bookmark-btn" class="bookmark">
    <i class="${saved ? 'fas' : 'far'} fa-bookmark">
    </i>
    </button>
    `
  const props = {
    type: 'li',
    id: `questioncard_${_id}`,
    classes: ['card', 'q-card'],
    content: cardContent,
  }

  const newCard = createElement(props)

  const tagList = getElement('tag-list', newCard)
  const answerBtn = getElement('answer-btn', newCard)
  const bookmarkBtn = getElement('bookmark-btn', newCard)
  const btnTxtShow = getElement('show-text', newCard)
  const btnTxtHide = getElement('hide-text', newCard)
  const answerContainer = getElement('answer-container', newCard)

  // populate tag list
  tags.forEach(tag => {
    const newTag = makeTag(tag)
    tagList.appendChild(newTag)
  })

  // add answer toggle
  answerBtn.addEventListener('click', () => {
    btnTxtHide.classList.toggle('hidden')
    btnTxtShow.classList.toggle('hidden')
    answerContainer.classList.toggle('hidden')
  })

  // add bookmark toggle
  bookmarkBtn.addEventListener('click', () => {
    handleBookmarkClick(model, questionDB, update, _id)
  })

  return newCard
}

function handleBookmarkClick(model, questionDB, update, id) {
  // handles the model update and questionDB update when bookmark btn is clicked

  // find the respective Question and toggle the saved state
  const newQuestionDB = questionDB.map(question => {
    return question._id !== id
      ? question
      : {
          ...question,
          saved: !question.saved,
        }
  })

  // update the DB
  update(model, newQuestionDB)
}

export default makeQuestionCard
