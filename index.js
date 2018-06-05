const form = document.querySelector('form')

const changeHeading = function(ev) {
  ev.preventDefault()

  const f = ev.target
  const spellName = f.spellName.value

  document
    .querySelector('#spells')
    .textContent += ' ' + spellName
}

form.addEventListener('submit', changeHeading)
