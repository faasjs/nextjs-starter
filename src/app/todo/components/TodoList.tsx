'use client'

import { withFaasData } from '@faasjs/react'
import { list } from '@/actions/list'
import { add } from '@/actions/add'
import { done } from '@/actions/done'
import { undo } from '@/actions/undo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CheckCircle, PlusCircle, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export const TodoList = withFaasData(
  props => {
    const [newTask, setNewTask] = useState('')

    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4'>
        <div className='w-full max-w-md bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6 space-y-6'>
          <h1 className='text-3xl font-bold text-center text-white'>
            FaasJS todo-list Demo
          </h1>
          <div className='flex space-x-2'>
            <Input
              type='text'
              placeholder='Add a new task'
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyUp={e =>
                e.key === 'Enter' &&
                add({ title: newTask }).then(() => {
                  setNewTask('')
                  props.reload()
                })
              }
              className='bg-white bg-opacity-50 border-none placeholder-gray-500 text-gray-800'
            />
            <Button
              onClick={() =>
                add({ title: newTask }).then(() => {
                  setNewTask('')
                  props.reload()
                })
              }
              className='bg-purple-600 hover:bg-purple-700'
            >
              <PlusCircle className='w-5 h-5' />
            </Button>
          </div>
          {props.data?.map(task => (
            <div
              key={task.id}
              className='flex items-center space-x-2 bg-white bg-opacity-50 rounded-md p-2'
            >
              <span
                className={`flex-grow ${task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-800'}`}
              >
                {task.title}
              </span>
              <Button
                onClick={() =>
                  task.status === 'done'
                    ? undo({ id: task.id }).then(props.reload)
                    : done({ id: task.id }).then(props.reload)
                }
                variant='ghost'
                size='sm'
                className={
                  task.status === 'done' ? 'text-green-600' : 'text-gray-600'
                }
              >
                {task.status === 'done' ? (
                  <RotateCcw className='w-5 h-5' />
                ) : (
                  <CheckCircle className='w-5 h-5' />
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    action: list,
    fallback: <Skeleton />,
  }
)
