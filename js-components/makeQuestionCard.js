import makeTag from './makeTag.js'
import createElement from './utility.js'

function makeQuestionCard(model, questionDB, update, questionObj) {
  // creates a question card in the dom, adds functionality to it and fills in the content dynamically
  const { _id, question, answer, tags, saved } = questionObj

  newCard.classList.add('card', 'q-card')
  newCard.id = `questioncard_${_id}`

  const cardContent = `      
    <div class="q-card__q-container">
      <h2 class="q-card__title text-primary">Question</h2>
      <p class="q-card__q-text">
        ${question}
      </p>
    </div>
    <button class="js-answer-btn q-card__btn bg-gradient-secondary">
      <span class="js-show-text q-card__btn-text"> show answer </span>
      <span class="js-hide-text q-card__btn-text hidden">
        hide answer
      </span>
    </button>
    <div class="js-answer-container q-card__answer-container hidden">
      <h2 class="q-card__title text-secondary">Answer</h2>
      <p class="q-card__a-text bg-gradient-secondary">
        ${answer}
      </p>
    </div>
    <ul class="tag-list">
    </ul>
    <button class="js-bookmark-btn bookmark">
    <i class="js-bookmark bookmark__btn--empty ${
      saved ? 'fas' : 'far'
    } fa-bookmark"></i>
    </button>
    `
  const props = {
    id: `questioncard_${_id}`,
  }

  const newCard = createElement('li', ['card', 'q-card'], cardContent)

  const tagList = newCard.querySelector('.tag-list')
  const answerBtn = newCard.querySelector('.js-answer-btn')
  const bookmarkBtn = newCard.querySelector('.js-bookmark-btn')
  const btnTxtShow = newCard.querySelector('.js-show-text')
  const btnTxtHide = newCard.querySelector('.js-hide-text')
  const answerContainer = newCard.querySelector('.js-answer-container')
  const bookmark = newCard.querySelector('.js-bookmark')

  // populate tag list
  tags.forEach(tag => {
    const newTag = makeTag(tag)
    tagList.appendChild(newTag)
  })

  // add answer toggle
  answerBtn.addEventListener('click', _ => {
    btnTxtHide.classList.toggle('hidden')
    btnTxtShow.classList.toggle('hidden')
    answerContainer.classList.toggle('hidden')
  })

  // add bookmark toggle
  bookmarkBtn.addEventListener('click', _ => {
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
