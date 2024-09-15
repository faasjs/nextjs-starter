'use server'

import { query } from '@faasjs/knex'
import { useFuncWithNextJsPlugin } from '@faasjs/nextjs/server'

export const undo = useFuncWithNextJsPlugin<{ id: string }>(
  async ({ params }) =>
    query('todo_items').where('id', params.id).update({ status: 'pending' })
)
