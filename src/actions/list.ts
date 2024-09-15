'use server'

import type { TodoItem } from '@/utils/db'
import { query } from '@faasjs/knex'
import { useFuncWithNextJsPlugin } from '@faasjs/nextjs/server'

export const list = useFuncWithNextJsPlugin<TodoItem[]>(async () =>
  query('todo_items')
)
