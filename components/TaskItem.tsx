import useMutateTask from '@/hooks/useMutateTask'
import useStore from '@/store'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { List } from '@mantine/core'
import { Task } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import React, { FC } from 'react'

export const TaskItem: FC<Omit<Task, 'createdAt' | 'updatedAt' | 'userId'>> = ({
  id,
  title,
  description
}) => {
  console.log('title', title)
  const update = useStore((state) => state.updateEditedTask) // updateという名前で更新用の関数を呼び出す
  const { deleteTaskMutation } = useMutateTask()

  return (
    <List.Item>
      <div className='float-left mr-10'>
        <PencilAltIcon
          className='mx-1 h-5 w-5 cursor-pointer text-blue-500'
          onClick={() => {
            update({
              id,
              title,
              description
            })
          }}
        ></PencilAltIcon>
        {title}
        {description}
        <TrashIcon
          className='h-5 w-5 cursor-pointer texzt-blue-500'
          onClick={() => deleteTaskMutation.mutate(id)}
        ></TrashIcon>
      </div>
    </List.Item>
  )
}
