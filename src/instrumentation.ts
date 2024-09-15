import type { UseifyPlugin } from '@faasjs/func'
import type { Knex } from '@faasjs/knex'

export let DB: UseifyPlugin<Knex>

export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  const useKnex = require('@faasjs/knex').useKnex
  DB = useKnex({
    config: {
      client: 'sqlite3',
      connection: {
        filename: ':memory:',
      },
    },
  })

  await DB.mount()

  if (!(await DB.adapter.schema.hasTable('todo_items')))
    await DB.adapter.schema.createTable('todo_items', table => {
      table.string('id').primary()
      table.string('title')
      table.enum('status', ['pending', 'done'])
    })
}
