import { randomUUID } from 'node:crypto'
import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? []
    if (!search) return data
    data = data.filter(row => {
      return Object.entries(search).some(([key, value]) => {
        return row[key].toLowerCase().includes(value.toLowerCase())
      })
    })
    if (!data) return 'Task not found.'
    return data
  }

  insert(table, data) {
    const newEntry = {id: randomUUID(), ...data, completed_at: null, created_at: new Date(), updated_at: new Date()}
    const tableDoesNotExists = !Array.isArray(this.#database[table])
    if (tableDoesNotExists) this.#database[table] = []
    this.#database[table].push(newEntry)
    this.#persist()
    return data
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    if (rowIndex === -1) return 'Task not found.'
    const updatedData = {...this.#database[table][rowIndex]}

    updatedData.title = data?.title ?? updatedData.title
    updatedData.description = data?.description ?? updatedData.description
    updatedData.completed_at = updatedData.completed_at ? null : new Date()
    updatedData.updated_at = new Date()

    this.#database[table][rowIndex] = updatedData
    this.#persist()
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    if (rowIndex === -1) return 'Task not found.'
    this.#database[table].splice(rowIndex, 1)
    this.#persist()
  }
}
