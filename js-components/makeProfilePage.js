function makeProfilePage() {
  // creates a profile card for display on the profile page

  const profilePage = document.createElement('div')
  profilePage.classList.add('card', 'profile-card')

  profilePage.innerHTML = `
    <img
    class="profile-card__img"
    src="https://source.unsplash.com/random/300x300?portrait"
    alt=""
    height="200"
    width="200"
    />
    <h2 class="profile-card__name">John Doe</h2>
    <p class="profile-card__description">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
      adipisci laborum voluptatum, quo ipsa voluptates temporibus ullam
      mollitia cupiditate illum odit at velit, nobis suscipit nam!
      Praesentium, accusamus sed maiores veritatis nulla consequatur,
      repellendus ex, recusandae expedita quod facere nisi.
    </p>
    <h3 class="profile-card__skill-header">Skills</h3>
    <ul class="tag-list">
      <li class="tag-list__item">HTML</li>
      <li class="tag-list__item">CSS</li>
      <li class="tag-list__item">React</li>
      <li class="tag-list__item">Design</li>
    </ul>
    <a class="profile-card__logout-btn" href="#tologoutpage">logout</a>
    </div>
  `

  return profilePage
}

export default makeProfilePage
