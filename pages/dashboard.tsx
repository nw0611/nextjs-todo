import { Layout } from "@/components/Layout";
import { LogoutIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const Dashboard = () => {
  const router = useRouter()
  const logout = async () => {
    await axios.post(`/auth/logout`)
    router.push('/')
  }

  return (
    <Layout title="Task Board">
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={logout}
      />
    </Layout>
  )
}

export default Dashboard