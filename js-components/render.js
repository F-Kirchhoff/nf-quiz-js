import makeQuestionCard from './makeQuestionCard.js'
import makeCreateForm from './makeCreateForm.js'
import makeProfilePage from './makeProfilePage.js'
import makeNavBtns from './makeNavBnts.js'
import { createElement, getElement } from './utility.js'

function render(model, questionDB, update) {
  // a function that renders the main page depending on the model and questionDB
  //different model.page entries result in display of different content rendered to the app

  // query the two starting points for content and navbar
  const root = getElement('root')
  root.innerHTML = ''
  const navbar = getElement('nav')
  navbar.innerHTML = ''

  //create navbar buttons and add them to the page
  const menu = makeNavBtns(model, questionDB, update)
  navbar.appendChild(menu)

  switch (model.page) {
    case 'HOME': {
      //reset card container
      const cardContainerProps = {
        type: 'ul',
        classes: ['card-container'],
        content: '',
      }
      const cardContainer = createElement(cardContainerProps)

      //add card container to content
      root.appendChild(cardContainer)

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
      const cardContainerProps = {
        type: 'ul',
        classes: ['card-container'],
        content: '',
      }
      const cardContainer = createElement(cardContainerProps)

      //add card container to content
      root.appendChild(cardContainer)

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
      root.appendChild(createForm)
      break
    }

    case 'PROFILE': {
      const profilePage = makeProfilePage(model, questionDB, update)
      root.appendChild(profilePage)
      break
    }

    default: {
      const placeholder = createElement({
        type: 'div',
        content: 'Something went wrong',
      })

      //add card container to content
      root.appendChild(placeholder)
    }
  }
}

export default render
