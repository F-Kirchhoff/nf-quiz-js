import makeQuestionCard from './makeQuestionCard.js'
import makeCreateForm from './makeCreateForm.js'
import makeProfilePage from './makeProfilePage.js'
import makeCardContainer from './makeCardContainer.js'
import makeNavBtns from './makeNavBnts.js'

function render(model, questionDB, update) {
  // a function that renders the main page depending on the model and questionDB
  //different model.page entries result in display of different content rendered to the app

  // query the two starting points for content and navbar
  const contentContainer = document.querySelector('.js-content')
  contentContainer.innerHTML = ''
  const navbar = document.querySelector('.js-nav')
  navbar.innerHTML = ''

  //create navbar buttons and add them to the page
  const menu = makeNavBtns(model, questionDB, update)
  navbar.appendChild(menu)

  switch (model.page) {
    case 'HOME': {
      //reset card container
      const cardContainer = makeCardContainer()

      //add card container to content
      contentContainer.appendChild(cardContainer)

      // create a question card for each question in the DB
      questionDB.forEach(question => {
        const newQuestionCard = makeQuestionCard(
          model,
          questionDB,
          update,
          question
        )
        cardContainer.appendChild(newQuestionCard)
      })
      break
    }

    case 'BOOKMARKS': {
      //reset card container
      const cardContainer = makeCardContainer()

      //add card container to content
      contentContainer.appendChild(cardContainer)

      // filter for only saved questions
      const savedQuesitons = questionDB.filter(question => question.saved)

      // create a question card for each question in the DB
      savedQuesitons.forEach(question => {
        const newQuestionCard = makeQuestionCard(
          model,
          questionDB,
          update,
          question
        )
        cardContainer.appendChild(newQuestionCard)
      })

      break
    }

    case 'CREATE': {
      const createForm = makeCreateForm(model, questionDB, update)
      contentContainer.appendChild(createForm)
      break
    }

    case 'PROFILE': {
      const profilePage = makeProfilePage(model, questionDB, update)
      contentContainer.appendChild(profilePage)
      break
    }

    default: {
    }
  }
}

export default render
