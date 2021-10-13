const btnList = document.querySelectorAll('.js-nav-btn')

const pageList = [...document.querySelectorAll('.js-content')]

// Add functionality to nav buttons
btnList.forEach(btn => {
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
  btnList.forEach(btn => {
    btn.classList.remove('menu__item--active')
  })
}
