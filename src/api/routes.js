import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query
      const tasks = database.select('tasks', search ? {
        title: search,
        description: search
      } : null)
      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const task = req.body
      if (!task?.title || !task?.description) return res.writeHead(400, 'Title and Description cannot be empty.').end()
      database.insert('tasks', task)
      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const task = req.body
      if (!task?.title && !task?.description) return res.writeHead(400, 'Title or Description must be filled in.').end()
      const error = database.update('tasks', id, task)
      if (error) return res.writeHead(404, error).end()
      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const error = database.update('tasks', id)
      if (error) return res.writeHead(404, error).end()
      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const error = database.delete('tasks', id)
      if (error) return res.writeHead(404, error).end()
      return res.writeHead(204).end()
    }
  }
]
