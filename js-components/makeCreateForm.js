function makeCreateForm(model, questionDB, update) {
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

export default makeCreateForm
