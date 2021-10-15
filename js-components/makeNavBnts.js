function makeNavBtns(model, questionDB, update) {
  const menu = document.createElement('dl')
  menu.classList.add('menu')
  menu.innerHTML = `
        <button
          class="js-nav-btn menu__item"
          href="index.html"
          value="HOME"
        >
          <dt class="sr-only">home</dt>
          <dd class="">
            <i class="fas fa-home"></i>
          </dd>
        </button>
        <button
          class="js-nav-btn menu__item"
          href="bookmarks.html"
          value="BOOKMARKS"
        >
          <dt class="sr-only">bookmarks</dt>
          <dd>
            <i class="fas fa-bookmark"></i>
          </dd>
        </button>
        <button class="js-nav-btn menu__item" href="create.html" value="CREATE">
          <dt class="sr-only">create</dt>
          <dd>
            <i class="fas fa-plus"></i>
          </dd>
        </button>
        <button
          class="js-nav-btn menu__item"
          href="profile.html"
          value="PROFILE"
        >
          <dt class="sr-only">profile</dt>
          <dd>
            <i class="fas fa-user-circle"></i>
          </dd>
        </button>
  `
  const navBtnList = menu.querySelectorAll('.js-nav-btn')

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

  navBtnList.forEach(btn => {
    if (btn.value === model.page) {
      btn.classList.add('menu__item--active')
    } else {
      btn.classList.remove('menu__item--active')
    }
  })

  return menu
}

export default makeNavBtns
