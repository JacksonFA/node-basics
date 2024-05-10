import { FastifyInstance } from "fastify"
import { z } from 'zod'
import { knex } from "../db"
import { checkSessionIdExists } from "../middlewares/check-session-id-exists"

const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [checkSessionIdExists] }, async (req) => {
    const { sessionId } = req.cookies
    const transactions = await knex('transactions')
      .where('session_id', sessionId)
      .select()
    return { transactions }
  })

  app.get('/:id', { preHandler: [checkSessionIdExists] }, async (req) => {
    const { sessionId } = req.cookies
    const getTransactionParamSchema = z.object({
      id: z.string().uuid()
    })
    const { id } = getTransactionParamSchema.parse(req.params)
    const transaction = await knex('transactions')
      .where({
        id,
        session_id: sessionId
      })
      .first()
    return { transaction }
  })

  app.get('/summary', { preHandler: [checkSessionIdExists] }, async (req) => {
    const { sessionId } = req.cookies
    const summary = await knex('transactions')
      .where('session_id', sessionId)
      .sum('amount', { as: 'amount' })
      .first()
    return { summary }
  })

  app.post('/', async (req, res) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })
    const { title, amount, type } = createTransactionBodySchema.parse(req.body)
    let sessionId = req.cookies.sessionId
    if (!sessionId) {
      sessionId = crypto.randomUUID()
      res.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: SESSION_COOKIE_MAX_AGE
      })
    }
    await knex('transactions')
      .insert({
        id: crypto.randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1,
        session_id: sessionId
      })
    return res.status(201).send()
  })
}
