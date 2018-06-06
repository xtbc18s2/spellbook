const form = document.querySelector('form')

const changeHeading = function(ev) {
  ev.preventDefault()

  const f = ev.target
  const spellName = f.spellName.value
  const level = f.level.value

  const spellsDiv = document.querySelector('#spells')
  spellsDiv.innerHTML += `
    <li>
      <span class="spellName">${spellName}</span>,
      <span class="level">lvl ${level}</span>
    </li>
  `

  f.reset()
}

form.addEventListener('submit', changeHeading)
