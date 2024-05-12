import type { NextPage } from 'next'
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import { AuthForm } from '../types'
import { LogInForm } from "@/components/LogInForm";

const Home: NextPage = () => {
  const router = useRouter()
  // ログインモード/登録モード
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  // TODO: リクエスト用の関数はpropsで渡すようにしたい
  const handleSubmit = async (
    {
      email,
      password
    }: AuthForm): Promise<void> => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
    try {
      if (isRegister) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
          email: email,
          password: password
        })
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: email,
        password: password
      })
      router.push(`/dashboard`)
    } catch(e: any) {
      console.log('login/signUp error', e)
      if (axios.isAxiosError(e) && e.response && e.response.status === 400) {
        setError('400')
      }
    }
  }

  const onChangeModeHandler = () => {
    setIsRegister(!isRegister)
    setError('')
  }

  return (
    <LogInForm
      error={error}
      submitHandler={handleSubmit}
      isRegisterMode={isRegister}
      chagenModeHandler={onChangeModeHandler}
    />
  )
};

export default Home
