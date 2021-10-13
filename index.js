const navBtnList = document.querySelectorAll('.js-nav-btn')
const pageList = [...document.querySelectorAll('.js-content')]

const cardContainer = document.querySelector('.js-card-container')

const questionDB = [
  {
    _id: 1,
    question:
      '01 Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, excepturi?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae illo expedita ipsum sit suscipit consequatur.',
    tags: ['lorem', 'ipsum', 'dolor', 'sit'],
  },
  {
    _id: 2,
    question:
      '02 Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, excepturi?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae illo expedita ipsum sit suscipit consequatur.',
    tags: ['lorem', 'ipsum', 'dolor', 'sit'],
  },
  {
    _id: 3,
    question:
      '03 Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, excepturi?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae illo expedita ipsum sit suscipit consequatur.',
    tags: ['lorem', 'ipsum', 'dolor', 'sit'],
  },
  {
    _id: 4,
    question:
      '04 Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, excepturi?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae illo expedita ipsum sit suscipit consequatur.',
    tags: ['lorem', 'ipsum', 'dolor', 'sit'],
  },
]

userDB = [
  {
    username: 'John Doe',
    bookmarks: [2, 4],
  },
]

// create a question card for each question in the DB
questionDB.forEach(question => {
  const newQuestionCard = createQuestionCard(question)
  cardContainer.appendChild(newQuestionCard)
})

// Add functionality to nav buttons
navBtnList.forEach(btn => {
  btn.addEventListener('click', _ => {
    // If the button is already active do nothing
    if (btn.classList.contains('menu__item--active')) {
      return
    }

    // Find the correct page content and display it
    displayPageById(btn.value)

    // reset all Buttons
    resetAllNavBtns()

    // Apply active styling to button
    btn.classList.add('menu__item--active')
  })
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

function resetAllNavBtns() {
  navBtnList.forEach(btn => {
    btn.classList.remove('menu__item--active')
  })
}

// creates a question card as a dom element
function createQuestionCard(questionObj) {
  const { _id, question, answer, tags } = questionObj

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
      <i class="js-bookmark bookmark__btn--empty far fa-bookmark"></i>
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
    bookmark.classList.toggle('far')
    bookmark.classList.toggle('fas')
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
