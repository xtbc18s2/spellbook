const app = {
  init: function() {
    this.spells = []

    const form = document.querySelector('form')
    form.addEventListener('submit', (ev) => {
      ev.preventDefault()
      this.handleSubmit(ev)
    })
  },

  renderProperty: function(name, value) {
    const el = document.createElement('span')
    el.classList.add(name)
    el.textContent = value
    el.setAttribute('title', value)
    return el
  },

  renderItem: function(spell) {
    // ['name', 'level']
    const properties = Object.keys(spell)

    // collect an array of <span> elements
    const childElements = properties.map((prop) => {
      return this.renderProperty(prop, spell[prop])
    })

    const item = document.createElement('li')
    item.classList.add('spell')

    // append each <span> to the <li>
    childElements.forEach(function(el) {
      item.appendChild(el)
    })

    // add the delete button
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete')
    deleteButton.textContent = 'del'
    deleteButton.addEventListener(
      'click',
      this.removeSpell.bind(this, spell)
    )

    item.appendChild(deleteButton)

    return item
  },

  removeSpell: function(spell, ev) {
    // Remove from the DOM
    const button = ev.target
    const item = button.closest('.spell')
    item.parentNode.removeChild(item)

    // Remove from the array
    const i = this.spells.indexOf(spell)
    this.spells.splice(i, 1)
  },

  handleSubmit: function(ev) {
    const f = ev.target

    const spell = {
      name: f.spellName.value,
      level: f.level.value,
    }

    this.spells.push(spell)

    const item = this.renderItem(spell)

    const list = document.querySelector('#spells')
    list.appendChild(item)

    f.reset()
  },
}

app.init()
