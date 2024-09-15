'use client'

import { Button, Input, List, Modal, Skeleton, Typography, message } from 'antd'
import { CheckOutlined, UndoOutlined } from '@ant-design/icons'
import { withFaasData } from '@faasjs/ant-design'
import { list } from '@/actions/list'
import type { TodoItem } from '@/utils/db'
import { add } from '@/actions/add'
import { done } from '@/actions/done'
import { undo } from '@/actions/undo'

export const TodoList = withFaasData(
  props => {
    const [modal, contextHolder] = Modal.useModal()

    return (
      <div
        style={{
          maxWidth: '500px',
          margin: '24px auto',
        }}
      >
        <Typography.Title>FaasJS Todo Demo</Typography.Title>
        <Button
          type='primary'
          onClick={() => {
            let title: string
            modal.confirm({
              title: 'Add a new item',
              content: (
                <Input
                  placeholder='Title'
                  onChange={e => (title = e.target.value?.trim())}
                />
              ),
              okText: 'Add',
              async onOk() {
                if (!title) {
                  message.error('Title is required')
                  return
                }
                await add({ title })
                // await faas('todo/item/add', { title })
                await props.reload()
              },
              cancelText: 'Cancel',
            })
          }}
        >
          New
        </Button>
        <List<TodoItem>
          dataSource={props.data}
          rowKey={item => item.id}
          renderItem={item => (
            <List.Item
              actions={[
                item.status === 'pending' ? (
                  <CheckOutlined
                    key='done'
                    style={{
                      cursor: 'pointer',
                      color: 'var(--ant-success-color)',
                    }}
                    onClick={async () =>
                      done({ id: item.id }).finally(async () => props.reload())
                    }
                  />
                ) : (
                  <UndoOutlined
                    key='undo'
                    style={{ cursor: 'pointer' }}
                    onClick={async () =>
                      undo({ id: item.id }).finally(async () => props.reload())
                    }
                  />
                ),
              ]}
            >
              <Typography.Text
                type={item.status === 'done' ? 'secondary' : undefined}
                style={{
                  textDecoration:
                    item.status === 'done' ? 'line-through' : 'none',
                }}
              >
                {item.title}
              </Typography.Text>
            </List.Item>
          )}
        />
        {contextHolder}
      </div>
    )
  },
  {
    action: list,
    loading: <Skeleton active />,
  }
)
