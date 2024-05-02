import http from 'node:http'

// STEP 1

// const server = http.createServer(() => {
//   console.log('Hello World')
// })

// --------------------------------------------------------------------

// STEP 2

// CRUD
// - Criar usuários (Create)
// - Listagem usuários (Read)
// - Edição de usuários (Update)
// - Remoção de usuários (Delete)

// - HTTP
//   - Método HTTP
//   - URL

// GET, POST, PUT, PATCH, DELETE
// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// GET /users => Buscando usuários no banc-end
// POST /users => Criar um usuário no back-end

// const server = http.createServer((req, res) => {
//   return res.end('Hello World')
// })

// -------------------------------------------------------------------

// STEP 3

// Stateful - Stateless
// Cabeçalhos (Requisição/resposta) => Metadados
// const users = [
//   {
//     id: 1,
//     name: 'Jackson',
//     email: 'jackson@email.com',
//   }
// ]

// const server = http.createServer((req, res) => {
//   const { method, url } = req

//   if (method === 'GET') {
//     if (url === '/users') {
//       return res
//         .setHeader('Content-type', 'application/json')
//         .end(JSON.stringify(users))
//     }
//   }

//   if (method === 'POST') {
//     users.push({
//       id: 1,
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//     })
//     return res.end('Criação de usuário')
//   }
  
//   return res.end('Hello World')
// })

// -------------------------------------------------------------------

// STEP 4

const users = [
  {
    id: 1,
    name: 'Jackson',
    email: 'jackson@email.com',
  }
]

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET') {
    if (url === '/users') {
      return res
        .setHeader('Content-type', 'application/json')
        .writeHead(200)
        .end(JSON.stringify(users))
    }
  }

  if (method === 'POST') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    })
    return res.writeHead(201, 'Criação de usuário').end()
  }
  
  return res.writeHead(404, 'Hello World').end()
})

server.listen('3333', () => console.log('Server running on :3333! 🚀'))
