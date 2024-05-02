import { readFileSync } from 'node:fs'
import { parse } from 'csv-parse'

const filePath = new URL('./tasks.csv', import.meta.url)
const file = readFileSync(filePath.pathname, 'utf8')
const parser = parse(file, { delimiter: ',', columns: true, skipEmptyLines: true })
for await (const row of parser) {
  const body = Buffer.from(JSON.stringify(row))
  fetch('http://localhost:3333/tasks', {
    method: 'POST',
    body,
  }).then(res => {
    return res.text()
  }).then(data => {
    console.log(data)
  })
}
