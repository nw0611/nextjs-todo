import React from 'react'
import { TaskItem } from './TaskItem'
import { useQueryTasks } from '@/hooks/useQueryTasks'
import { Task } from '@prisma/client';
import { List, Loader, ThemeIcon } from '@mantine/core';
import { IconCircle, IconCircleDashed } from '@tabler/icons-react';

export const TaskList = () => {
  const { data: tasks, status } = useQueryTasks()
  console.log('taskList', tasks)
  if (status === 'loading') return <Loader my='lg' color='cyan' />

  return (
    <List
      my='lg'
      spacing='sm'
      size='sm'
      icon={<ThemeIcon color='cyasn' size={24} radius='xl'>
        <IconCircleDashed size={16}></IconCircleDashed>
      </ThemeIcon>}
    >
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
          />
        ))}
    </List>
  )
}
