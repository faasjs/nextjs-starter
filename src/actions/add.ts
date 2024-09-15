'use server'

import { query } from '@faasjs/knex'
import { useFuncWithNextJsPlugin } from '@faasjs/nextjs/server'
import { randomUUID } from 'node:crypto'

export const add = useFuncWithNextJsPlugin<{ title: string }>(
  async ({ params }) =>
    query('todo_items').insert({
      id: randomUUID(),
      title: params.title,
      status: 'pending',
    })
)
