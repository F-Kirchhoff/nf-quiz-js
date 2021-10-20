import render from './render.js'

//TODO Update Model and DB with updateMessages!

function update(newModel, newQuestionDB) {
  // central function that triggers an update of the model and database and rerenders the content afterwards

  render(newModel, newQuestionDB, update)
}

export default update
