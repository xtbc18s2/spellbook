const form = document.querySelector('form')

const renderProperty = function(name, value) {
  const el = document.createElement('span')
  el.textContent = value
  el.classList.add(name)
  return el
}

const renderItem = function(spell) {
  // ['name', 'level']
  properties = Object.keys(spell)

  // collect an array of renderProperty's return values
  // (an array of <span> elements)
  const childElements = properties.map(function(property) {
    return renderProperty(property, spell[property])
  })

  const item = document.createElement('li')
  item.classList.add('spell')

  // append each <span> to the <li>
  childElements.forEach(function(el) {
    item.appendChild(el)
  })

  return item
}

const handleSubmit = function(ev) {
  ev.preventDefault()

  const f = ev.target

  const spell = {
    name: f.spellName.value,
    level: f.level.value,
  }

  const item = renderItem(spell)

  const list = document.querySelector('#spells')
  list.appendChild(item)

  f.reset()
}

form.addEventListener('submit', handleSubmit)
