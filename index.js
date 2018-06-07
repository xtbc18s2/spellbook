class App {
  constructor() {
    this.spells = []
    this.template = document.querySelector('.spell.template')
    this.list = document.querySelector('#spells')

    this.load()

    const form = document.querySelector('form')
    form.addEventListener('submit', (ev) => {
      ev.preventDefault()
      this.handleSubmit(ev)
    })
  }

  load() {
    // Read JSON from localStorage
    const spellJSON = localStorage.getItem('spells')

    // Convert JSON back into an array
    const spellArray = JSON.parse(spellJSON)

    // Load the spells back into the app
    if (spellArray) {
      spellArray.forEach(this.addSpell.bind(this))
    }
  }

  save() {
    localStorage.setItem(
      'spells',
      JSON.stringify(this.spells)
    )
  }

  renderProperty(name, value) {
    const el = document.createElement('span')
    el.classList.add(name)
    el.textContent = value
    el.setAttribute('title', value)
    return el
  }

  renderItem(spell) {
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

    // Mark it as a favorite, if applicable
    if (spell.favorite) {
      item.classList.add('fav')
    }

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
  }

  moveDown(spell, ev) {
    // Find the <li>
    const button = ev.target
    const item = button.closest('.spell')

    // Find it in the array
    const i = this.spells.indexOf(spell)

    // Only move it if it's not already last
    if (i < this.spells.length - 1) {
      // Move it on the page
      this.list.insertBefore(item.nextSibling, item)

      // Move it in the array
      const nextSpell = this.spells[i + 1]
      this.spells[i + 1] = spell
      this.spells[i] = nextSpell

      this.save()
    }
  }

  moveUp(spell, ev) {
    // Find the <li>
    const button = ev.target
    const item = button.closest('.spell')

    // Find it in the array
    const i = this.spells.indexOf(spell)

    // Only move it if it's not already first
    if (i > 0) {
      // Move it on the page
      this.list.insertBefore(item, item.previousSibling)

      // Move it in the array
      const previousSpell = this.spells[i - 1]
      this.spells[i - 1] = spell
      this.spells[i] = previousSpell

      this.save()
    }
  }

  toggleFavorite(spell, ev) {
    const button = ev.target
    const item = button.closest('.spell')
    spell.favorite = item.classList.toggle('fav')
    this.save()
  }

  removeSpell(spell, ev) {
    // Remove from the DOM
    const button = ev.target
    const item = button.closest('.spell')
    item.parentNode.removeChild(item)

    // Remove from the array
    const i = this.spells.indexOf(spell)
    this.spells.splice(i, 1)

    this.save()
  }

  addSpell(spell) {
    this.spells.push(spell)
    const item = this.renderItem(spell)
    this.list.appendChild(item)
  }

  handleSubmit(ev) {
    const f = ev.target

    const spell = {
      name: f.spellName.value,
      level: f.level.value,
      favorite: false,
    }

    this.addSpell(spell)
    this.save()

    f.reset()
    f.spellName.focus()
  }
}

const app = new App()
