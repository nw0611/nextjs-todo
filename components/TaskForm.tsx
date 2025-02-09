import React, { FormEvent } from 'react'
import { EditedTask } from '../types/index';
import useStore from '@/store';
import useMutateTask from '@/hooks/useMutateTask';
import { Button, Center, TextInput } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';

export const TaskForm = () => {
  const { editedTask } = useStore()
  const update = useStore((state) => state.updateEditedTask)
  const { createTaskMutation, updateTaskMutation } = useMutateTask()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === 0) {
      createTaskMutation.mutate({
        title: editedTask.title,
        description: editedTask.description
      })
    } else {
      updateTaskMutation.mutate({
        id: editedTask.id,
        title: editedTask.title,
        description: editedTask.description
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput
          mt='md'
          placeholder='title'
          value={editedTask.title || ''}
          onChange={(e) => update({ ...editedTask, title: e.target.value })} // タイピングのたびに実行される
        />
        <TextInput
          mt='md'
          placeholder='description'
          value={editedTask.description || ''}
          onChange={(e) => update({ ...editedTask, description: e.target.value })} // タイピングのたびに実行される
        />
        <Center mt='lg'>
          <Button
            variant='light'
            disabled={editedTask.title === ''}
            leftSection={<IconDatabase size={14} />}
            color='cyan'
            type='submit'
          >
            {editedTask.id ? 'Update' : 'Create'}
          </Button>
        </Center>
      </form>
    </div>
  )
}
