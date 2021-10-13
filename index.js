const navBtnList = document.querySelectorAll('.js-nav-btn')
const pageList = [...document.querySelectorAll('.js-content')]

const answerBtn = document.querySelector('.js-answer-btn')
const bookmarkBtn = document.querySelector('.js-bookmark-btn')
const btnTxtShow = document.querySelector('.js-show-text')
const btnTxtHide = document.querySelector('.js-hide-text')
const answerContainer = document.querySelector('.js-answer-container')
const bookmark = document.querySelector('.js-bookmark')

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
