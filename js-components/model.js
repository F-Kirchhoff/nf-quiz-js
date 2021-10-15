export let model = {
  page: 'HOME',
}

export let questionDB = [
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

export function setModel(newModel) {
  // pseudo hook that resets the value of model
  model = newModel
}

export function setQuestionDB(newDB) {
  // pseudo hook that resets the value of QuestionDB

  questionDB = newDB
}
