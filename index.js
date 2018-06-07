const app = {
  init: function() {
    this.spells = []
    this.template = document.querySelector('.spell.template')
    this.list = document.querySelector('#spells')

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

    // move up
    item
      .querySelector('button.up')
      .addEventListener(
        'click',
        this.moveUp.bind(this, spell)
      )

    // move down
    item
      .querySelector('button.down')
      .addEventListener(
        'click',
        this.moveDown.bind(this, spell)
      )


    return item
  },

  moveDown: function(spell, ev) {
    // Find the <li>
    const button = ev.target
    const item = button.closest('.spell')

    // Find its index in the array
    const i = this.spells.indexOf(spell)

    // Only move it if it's not already last
    if (i < this.spells.length - 1) {
      // Move it in the array
      const nextSpell = this.spells[i + 1]
      this.spells[i + 1] = spell
      this.spells[i] = nextSpell

      // Move it on the page
      this.list.insertBefore(item.nextSibling, item)
    }
  },

  moveUp: function(spell, ev) {
    // Find the <li>
    const button = ev.target
    const item = button.closest('.spell')

    // Find its index in the array
    const i = this.spells.indexOf(spell)

    // Only move it if it's not already first
    if (i > 0) {
      // Move it in the array
      const previousSpell = this.spells[i - 1]
      this.spells[i - 1] = spell
      this.spells[i] = previousSpell

      // Move it on the page
      this.list.insertBefore(item, item.previousSibling)
    }
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

  toggleFavorite: function(spell, ev) {
    const button = ev.target
    const item = button.closest('.spell')
    spell.favorite = item.classList.toggle('fav')
  },

  handleSubmit: function(ev) {
    ev.preventDefault()

    const f = ev.target

    const spell = {
      name: f.spellName.value,
      level: f.level.value,
      favorite: false,
    }
    this.spells.push(spell)

    const item = this.renderItem(spell)
    this.list.appendChild(item)

    f.reset()
    f.spellName.focus()
  },
}

app.init()
