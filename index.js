const form = document.querySelector('form')

const changeHeading = function(ev) {
  ev.preventDefault()

  const f = ev.target
  const spellName = f.spellName.value

  document
    .querySelector('h1')
    .textContent = spellName
}

form.addEventListener('submit', changeHeading)
