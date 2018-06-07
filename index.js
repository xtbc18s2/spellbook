class App {
  constructor() {
    this.spells = []
    this.template = document.querySelector('.spell.template')
    this.list = document.querySelector('#spells')

    const form = document.querySelector('form')
    form.addEventListener('submit', (ev) => {
      ev.preventDefault()
      this.handleSubmit(ev)
    })
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
    }
  }

  toggleFavorite(spell, ev) {
    const button = ev.target
    const item = button.closest('.spell')
    spell.favorite = item.classList.toggle('fav')
  }

  removeSpell(spell, ev) {
    // Remove from the DOM
    const button = ev.target
    const item = button.closest('.spell')
    item.parentNode.removeChild(item)

    // Remove from the array
    const i = this.spells.indexOf(spell)
    this.spells.splice(i, 1)
  }

  handleSubmit(ev) {
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
  }
}

const app = new App()
