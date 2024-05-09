import React from 'react'
import useStore from '../store'
import { EditedTask } from '../types/index';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Task } from '@prisma/client';

export default function useMutateTask() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const reset = useStore((state) => state.resetEditedTask)

  const createTaskMutation = useMutation(
    async (task: Omit<EditedTask, 'id'>) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/todo`,
        task
      )
      return res.data
    },
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>(['tasks'])
        if (previousTodos) {
          queryClient.setQueryData(['tasks'], [res, ...previousTodos])
        }
        reset()
      },
      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      }
    }
  )

  const updateTaskMutation = useMutation(
    async (task: EditedTask) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/todo/${task.id}`,
        task
      )
      return res.data
    },
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>(['tasks'])
        if (previousTodos) {
          queryClient.setQueryData(
            ['tasks'],
            previousTodos.map((task) => task.id === res.id ? res : task)  
          )
        }
        reset()
      },
      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      }
    }
  )

  const deleteTaskMutation = useMutation(
    async (id: number) => {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/todo/${id}`
      )
      return res.data
    },
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>(['tasks'])
        if (previousTodos) {
          queryClient.setQueryData(
            ['tasks'],
            previousTodos.filter((task) => task.id !== res.id)  
          )
        }
        reset()
      },
      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      }
    }
  )
  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation
  }
}
