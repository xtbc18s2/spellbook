const form = document.querySelector('form')

const renderProperty = function(name, value) {
  const el = document.createElement('span')
  el.classList.add(name)
  el.textContent = value
  el.setAttribute('title', value)
  return el
}

const renderItem = function(spell) {
  // ['name', 'level']
  const properties = Object.keys(spell)

  // collect an array of <span> elements
  const childElements = properties.map(function(prop) {
    return renderProperty(prop, spell[prop])
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
