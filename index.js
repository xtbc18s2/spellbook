const form = document.querySelector('form')

const renderProperty = function(name, value) {
  const el = document.createElement('span')
  el.textContent = value
  el.classList.add(name)
  return el
}

const handleSubmit = function(ev) {
  ev.preventDefault()

  const f = ev.target
  const spellName = f.spellName.value
  const level = f.level.value

  const list = document.querySelector('#spells')

  const nameSpan = renderProperty('spellName', spellName)
  const levelSpan = renderProperty('level', level)

  const item = document.createElement('li')
  item.classList.add('spell')
  item.appendChild(nameSpan)
  item.appendChild(levelSpan)

  list.appendChild(item)

  f.reset()
}

form.addEventListener('submit', handleSubmit)
