const button = document.querySelector('button')

const changeHeading = function() {
  document
    .querySelector('p.special')
    .textContent = 'Ye Olde Spellbook'
}

button.addEventListener('click', changeHeading)
