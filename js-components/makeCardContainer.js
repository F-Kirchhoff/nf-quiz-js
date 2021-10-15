function makeCardContainer() {
  // creates a div in the dom to use later for grid display of the cards

  const cardContainer = document.createElement('ul')
  cardContainer.classList.add('card-container')
  return cardContainer
}

export default makeCardContainer
