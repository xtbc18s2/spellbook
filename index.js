const form = document.querySelector('form')

const changeHeading = function(ev) {
  ev.preventDefault()

  const f = ev.target
  const spellName = f.spellName.value

  const spellsDiv = document.querySelector('#spells')
  spellsDiv.textContent += ' ' + spellName

  f.reset()
}

form.addEventListener('submit', changeHeading)
