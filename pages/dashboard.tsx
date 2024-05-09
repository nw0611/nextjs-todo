import { Layout } from "@/components/Layout";
import { UserInfo } from "@/components/UserInfo";
import { LogoutIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from '@tanstack/react-query';
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";

const Dashboard = () => {
  const router = useRouter()
  const QueryClient = useQueryClient()
  const logout = async () => {
    QueryClient.removeQueries(['task'])
    QueryClient.removeQueries(['user'])
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    router.push('/')
  }

  return (
    <Layout title="Task Board">
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={logout}
      />
      <UserInfo></UserInfo>
      <TaskForm></TaskForm>
      <TaskList></TaskList>
    </Layout>
  )
}

export default Dashboard