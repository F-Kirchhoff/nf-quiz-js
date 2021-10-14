const navBtnList = document.querySelectorAll('.js-nav-btn')
const pageList = [...document.querySelectorAll('.js-content')]

const cardContainer = document.querySelector('.js-card-container')
const bookmarksContainer = document.querySelector('.js-bookmarks-container')

const createForm = document.querySelector('[data-js=create-form]')

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

//initial render of all pages
renderHomePage()
renderBookmarksPage()

// Add functionality to nav buttons
navBtnList.forEach(btn => {
  btn.addEventListener('click', _ => {
    // If the button is already active do nothing
    if (btn.classList.contains('menu__item--active')) {
      return
    }

    // Find the correct page content and display it
    displayPageById(btn.value)

    // restyle nav btns
    updateNavBtns(btn)
  })
})

// add functionality of the create page
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

  setQuestionDB([newQuestionObj, ...questionDB])
  renderHomePage()
})

function displayPageById(id) {
  hideAllPages()
  const activeContent = filterPagesById(id)[0]
  activeContent.classList.remove('hidden')
}

function filterPagesById(id) {
  return pageList.filter(element => element.id === id)
}

function hideAllPages() {
  pageList.forEach(element => {
    element.classList.add('hidden')
  })
}

function updateNavBtns(activeBtn) {
  // reset all buttons
  navBtnList.forEach(btn => {
    btn.classList.remove('menu__item--active')
  })

  // Apply active styling to button
  activeBtn.classList.add('menu__item--active')
}

// creates a question card as a dom element
function createQuestionCard(questionObj) {
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

// creates a tag for tag-list as a dom element
function createTag(tag) {
  const newTag = document.createElement('li')
  newTag.classList.add('tag-list__item')
  newTag.innerText = tag

  return newTag
}

function renderHomePage() {
  //reset the homepage card container
  cardContainer.innerHTML = ''

  // create a question card for each question in the DB
  questionDB.forEach(question => {
    const newQuestionCard = createQuestionCard(question)
    cardContainer.appendChild(newQuestionCard)
  })
}

function renderBookmarksPage() {
  //reset the bookmarks card container
  bookmarksContainer.innerHTML = ''

  //filter for only the saved questions
  savedQuesitons = questionDB.filter(question => question.saved)

  //add the filtered questions to the container
  savedQuesitons.forEach(question => {
    const newQuestionCard = createQuestionCard(question)
    bookmarksContainer.appendChild(newQuestionCard)
  })
}

function handleBookmarkClick(id) {
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
  setQuestionDB(newQuestionDB)

  // rerender Pages
  renderHomePage()
  renderBookmarksPage()
}

// !!! Caution! Non Pure functions

function setQuestionDB(newDB) {
  questionDB = newDB
}
