const app = {
  init: function() {
    this.spells = []
    this.template = document.querySelector('.spell.template')

    const form = document.querySelector('form')
    form.addEventListener('submit', ev => {
      this.handleSubmit(ev)
    })
  },

  renderProperty: function(name, value) {
    const el = document.createElement('span')
    el.textContent = value
    el.classList.add(name)
    el.setAttribute('title', value)
    return el
  },

  renderItem: function(spell) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')

    // ['name', 'level', etc.]
    properties = Object.keys(spell)

    // Replace the appropriate values in each <span>
    properties.forEach(property => {
      const el = item.querySelector(`.${property}`)
      el.textContent = spell[property]
      el.setAttribute('title', spell[property])
    })

    // delete button
    item
      .querySelector('button.delete')
      .addEventListener(
        'click',
        this.removeSpell.bind(this, spell)
      )

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
    ev.preventDefault()

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
    f.spellName.focus()
  },
}

app.init()
