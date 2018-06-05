const button = document.querySelector('button')

const changeHeading = function() {
  document
    .querySelector('h1')
    .textContent = 'Ye Olde Spellbook'
}

button.addEventListener('click', changeHeading)
