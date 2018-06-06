const form = document.querySelector('form')

const handleSubmit = function(ev) {
  ev.preventDefault()

  const f = ev.target
  const spellName = f.spellName.value
  const level = f.level.value

  const list = document.querySelector('#spells')

  const nameSpan = document.createElement('span')
  nameSpan.textContent = spellName
  nameSpan.classList.add('spellName')

  const levelSpan = document.createElement('span')
  levelSpan.textContent = level
  levelSpan.classList.add('level')

  const item = document.createElement('li')
  item.appendChild(nameSpan)
  item.appendChild(levelSpan)

  list.appendChild(item)

  f.reset()
}

form.addEventListener('submit', handleSubmit)
