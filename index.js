const app = {
  init: function() {
    this.spells = []
    this.template = document.querySelector('.spell.template')

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
    const item = this.template.cloneNode(true)
    item.classList.remove('template')

    // ['name', 'level']
    const properties = Object.keys(spell)

    properties.forEach(property => {
      const el = item.querySelector(`.${property}`)
      if (el) {
        el.textContent = spell[property]
        el.setAttribute('title', spell[property])
      }
    })

    // delete button
    item
      .querySelector('button.delete')
      .addEventListener(
        'click',
        this.removeSpell.bind(this, spell)
      )

    // fav button
    item
      .querySelector('button.fav')
      .addEventListener(
        'click',
        this.toggleFavorite.bind(this, spell)
      )

    return item
  },

  toggleFavorite: function(spell, ev) {
    const button = ev.target
    const item = button.closest('.spell')
    spell.favorite = item.classList.toggle('fav')
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
      favorite: false,
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
