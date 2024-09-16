'use server'
import { query } from '@faasjs/knex'
import { useFuncWithNextJsPlugin } from '@faasjs/nextjs'

export const list = useFuncWithNextJsPlugin(async () => query('todo_items'))
