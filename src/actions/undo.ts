'use server'

import { query, useKnex } from '@faasjs/knex'
import { useFuncWithNextJsPlugin } from '@faasjs/nextjs'

export const undo = useFuncWithNextJsPlugin<{ id: string }>(
  async ({ params }) =>
    query('todo_items')
      .where('id', params.id)
      .update({ status: 'pending' }, [useKnex()])
)
