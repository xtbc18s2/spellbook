const form = document.querySelector('form')

const changeHeading = function(ev) {
  ev.preventDefault()

  document
    .querySelector('h1')
    .textContent = 'Ye Olde Spellbook'
}

form.addEventListener('submit', changeHeading)
