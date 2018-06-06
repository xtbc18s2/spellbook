const form = document.querySelector('form')

const renderProperty = function(name, value) {
  const el = document.createElement('span')
  el.classList.add(name)
  el.textContent = value
  el.setAttribute('title', value)
  return el
}

const handleSubmit = function(ev) {
  ev.preventDefault()

  const f = ev.target
  const spellName = f.spellName.value
  const level = f.level.value

  const nameSpan = renderProperty('spellName', spellName)
  const levelSpan = renderProperty('level', level)

  const item = document.createElement('li')
  item.classList.add('spell')
  item.appendChild(nameSpan)
  item.appendChild(levelSpan)

  const list = document.querySelector('#spells')
  list.appendChild(item)

  f.reset()
}

form.addEventListener('submit', handleSubmit)
