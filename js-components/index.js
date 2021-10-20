import update from './update.js'
import render from './render.js'
import { getLocalStorageDB, setsLocalStorageDB } from './localStorage.js'

import { model, questionDB } from './model.js'

let initialQuestionDB = getLocalStorageDB()

if (!initialQuestionDB) {
  setsLocalStorageDB(questionDB)
  initialQuestionDB = questionDB
}

// Add functionality to nav buttons

//initial render
render(model, initialQuestionDB, update)
