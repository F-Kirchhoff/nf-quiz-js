const navBtnList = document.querySelectorAll('.js-nav-btn')
const contentContainer = document.querySelector('.js-content')

//model and database of questions
let questionDB = [
  {
    _id: 1,
    question:
      '01 Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, excepturi?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae illo expedita ipsum sit suscipit consequatur.',
    tags: ['lorem', 'ipsum', 'dolor', 'sit'],
    saved: false,
  },
  {
    _id: 2,
    question:
      '02 Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, excepturi?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae illo expedita ipsum sit suscipit consequatur.',
    tags: ['lorem', 'ipsum', 'dolor', 'sit'],
    saved: true,
  },
  {
    _id: 3,
    question:
      '03 Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, excepturi?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae illo expedita ipsum sit suscipit consequatur.',
    tags: ['lorem', 'ipsum', 'dolor', 'sit'],
    saved: false,
  },
  {
    _id: 4,
    question:
      '04 Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, excepturi?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae illo expedita ipsum sit suscipit consequatur.',
    tags: ['lorem', 'ipsum', 'dolor', 'sit'],
    saved: true,
  },
]
let model = {
  page: 'HOME',
}

// initializes pages as dom elements
const cardContainer = makeCardContainer()
const createForm = makeCreatePage()
const profilePage = makeProfilePage()
// Add functionality to nav buttons
addNavBtnListeners()

//initial render
update(model, questionDB)

// FUNCTION AREA

// initial setup functions
function makeCardContainer() {
  // creates a div in the dom to use later for grid display of the cards

  const cardContainer = document.createElement('ul')
  cardContainer.classList.add('card-container')
  return cardContainer
}
function makeCreatePage() {
  // creates a form in the dom for creating new question cards

  const createForm = document.createElement('form')
  createForm.classList.add('submit-form', 'card')

  createForm.innerHTML = `
    <label class="text-lg text-primary" for="question-field"
    >Question</label
    >
    <textarea
      class="submit-form__input submit-form__input--question"
      name="question"
      id="question-field"
      placeholder="Write your question here..."
    ></textarea>
    <label class="text-lg text-secondary" for="answer-field">Answer</label>
    <textarea
      class="submit-form__input submit-form__input--answer"
      name="answer"DE02 2004 0000 0150 7003 00
      id="answer-field"
      placeholder="Write your answer here..."
    ></textarea>
    <label class="text-lg text-dark" for="tags-field">Tags</label>
    <input
      type="text"
      class="submit-form__input submit-form__input--tags"
      name="tags"
      id="tags-field"
      placeholder="tags..."
    />
    <button class="submit-form__btn bg-gradient-secondary">
      Submit Question
    </button>
  `

  createForm.addEventListener('submit', event => {
    event.preventDefault()
    const { question, answer, tags } = createForm.elements

    const tagList = tags.value.split(',')

    const newQuestionObj = {
      _id: new Date().getTime(),
      question: question.value,
      answer: answer.value,
      tags: tagList,
      saved: false,
    }

    question.value = ''
    answer.value = ''
    tags.value = ''

    const newDB = [newQuestionObj, ...questionDB]
    update(model, newDB)
  })

  return createForm
}
function makeProfilePage() {
  // creates a profile card for display on the profile page

  const profilePage = document.createElement('div')
  profilePage.classList.add('card', 'profile-card')

  profilePage.innerHTML = `
    <img
    class="profile-card__img"
    src="https://source.unsplash.com/random/300x300?portrait"
    alt=""
    height="200"
    width="200"
    />
    <h2 class="profile-card__name">John Doe</h2>
    <p class="profile-card__description">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
      adipisci laborum voluptatum, quo ipsa voluptates temporibus ullam
      mollitia cupiditate illum odit at velit, nobis suscipit nam!
      Praesentium, accusamus sed maiores veritatis nulla consequatur,
      repellendus ex, recusandae expedita quod facere nisi.
    </p>
    <h3 class="profile-card__skill-header">Skills</h3>
    <ul class="tag-list">
      <li class="tag-list__item">HTML</li>
      <li class="tag-list__item">CSS</li>
      <li class="tag-list__item">React</li>
      <li class="tag-list__item">Design</li>
    </ul>
    <a class="profile-card__logout-btn" href="#tologoutpage">logout</a>
    </div>
  `

  return profilePage
}
function addNavBtnListeners() {
  // uses the queried btn elements and adds a event listener to them, which trigger a rerender of the main content

  navBtnList.forEach(btn => {
    btn.addEventListener('click', _ => {
      // If the button is already active do nothing
      if (btn.classList.contains('menu__item--active')) {
        return
      }
      // Find the correct page content and update Screen
      const newModel = {
        ...model,
        page: btn.value,
      }

      update(newModel, questionDB)
    })
  })
}

function render(model, questionDB) {
  // a function that renders the main page depending on the model and questionDB different model.page entries result in display of different content rendered to the app

  //reset the content container
  contentContainer.innerHTML = ''

  switch (model.page) {
    case 'HOME': {
      //reset card container
      cardContainer.innerHTML = ''

      //add card container to content
      contentContainer.appendChild(cardContainer)

      // create a question card for each question in the DB
      questionDB.forEach(question => {
        const newQuestionCard = createQuestionCard(question)
        cardContainer.appendChild(newQuestionCard)
      })

      updateNavBtns(model.page)
      break
    }

    case 'BOOKMARKS': {
      //reset card container
      cardContainer.innerHTML = ''

      //add card container to content
      contentContainer.appendChild(cardContainer)

      // filter for only saved questions
      const savedQuesitons = questionDB.filter(question => question.saved)

      // create a question card for each question in the DB
      savedQuesitons.forEach(question => {
        const newQuestionCard = createQuestionCard(question)
        cardContainer.appendChild(newQuestionCard)
      })

      updateNavBtns(model.page)
      break
    }

    case 'CREATE': {
      contentContainer.appendChild(createForm)
      updateNavBtns(model.page)
      break
    }

    case 'PROFILE': {
      contentContainer.appendChild(profilePage)
      updateNavBtns(model.page)
      break
    }

    default: {
    }
  }
}

function updateNavBtns(model) {
  // updates the styling of the nav buttons
  navBtnList.forEach(btn => {
    if (btn.value === model.page) {
      btn.classList.add('menu__item--active')
    } else {
      btn.classList.remove('menu__item--active')
    }
  })
}

function createQuestionCard(questionObj) {
  // creates a question card in the dom, adds functionality to it and fills in the content dynamically
  const { _id, question, answer, tags, saved } = questionObj

  const newCard = document.createElement('li')
  newCard.classList.add('card', 'q-card')
  newCard.id = `questioncard_${_id}`

  newCard.innerHTML = `      
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
  const tagList = newCard.querySelector('.tag-list')
  const answerBtn = newCard.querySelector('.js-answer-btn')
  const bookmarkBtn = newCard.querySelector('.js-bookmark-btn')
  const btnTxtShow = newCard.querySelector('.js-show-text')
  const btnTxtHide = newCard.querySelector('.js-hide-text')
  const answerContainer = newCard.querySelector('.js-answer-container')
  const bookmark = newCard.querySelector('.js-bookmark')

  // populate tag list
  tags.forEach(tag => {
    const newTag = createTag(tag)
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
    handleBookmarkClick(_id)
  })

  return newCard
}

function createTag(tag) {
  // creates a tag element for the tag list
  const newTag = document.createElement('li')
  newTag.classList.add('tag-list__item')
  newTag.innerText = tag

  return newTag
}

function handleBookmarkClick(id) {
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

// !!! Caution! Non Pure functions

function update(newModel, newQuestionDB) {
  // central function that triggers an update of the model and database and rerenders the content afterwards

  setModel(newModel)
  setQuestionDB(newQuestionDB)
  render(model, questionDB)
}

function setModel(newModel) {
  // pseudo hook that resets the value of model

  model = newModel
}

function setQuestionDB(newDB) {
  // pseudo hook that resets the value of QuestionDB

  questionDB = newDB
}
