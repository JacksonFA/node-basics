import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'child_process'

describe('Transactions Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })
  
  it('should be able to create a new Transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transactions',
        amount: 5000,
        type: 'credit'
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionsResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transactions',
        amount: 5000,
        type: 'credit'
      })
      const cookies = createTransactionsResponse.get('Set-Cookie')
      const listTransactionsReponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', cookies!)
        .expect(200)

      expect(listTransactionsReponse.body.transactions).toEqual([
        expect.objectContaining(
          {
            title: 'New Transactions',
            amount: 5000,
          }
        )
      ])
  })

  it('should be able to get a specific transaction', async () => {
    const createTransactionsResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transactions',
        amount: 5000,
        type: 'credit'
      })
      const cookies = createTransactionsResponse.get('Set-Cookie')
      const listTransactionsReponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', cookies!)
        .expect(200)
      const transactionId = listTransactionsReponse.body.transactions[0].id
      const getTransactionReponse = await request(app.server)
        .get(`/transactions/${transactionId}`)
        .set('Cookie', cookies!)
        .expect(200)

      expect(getTransactionReponse.body.transaction).toEqual(
        expect.objectContaining(
          {
            title: 'New Transactions',
            amount: 5000,
          }
        )
      )
  })


  it('should be able to get the summary of transactions', async () => {
    const createTransactionsResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transactions',
        amount: 5000,
        type: 'credit'
      })
      const cookies = createTransactionsResponse.get('Set-Cookie')
      await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies!)
      .send({
        title: 'New Transactions',
        amount: 2000,
        type: 'debit'
      })
      const summaryResponse = await request(app.server)
        .get('/transactions/summary')
        .set('Cookie', cookies!)
        .expect(200)

      expect(summaryResponse.body.summary).toEqual({
        amount: 3000
      })
  })

  afterAll(async () => {
    await app.close()
  })
})

