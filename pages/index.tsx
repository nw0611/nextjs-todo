import type { NextPage } from 'next'
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import * as Yup from 'yup'
import { IconDatabase } from '@tabler/icons-react'
import { ShieldCheckIcon } from '@heroicons/react/solid'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import {
  Anchor,
  TextInput,
  Button,
  Group,
  PasswordInput,
  Alert,
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { Layout } from '../components/Layout'
import { AuthForm } from '../types'

// バリデーションロジック
// yup.object.shape 実際のデータ構造をオブジェクトで定義する
const schema = Yup.object().shape({
  // 文字列型・email形式・必須 TODO: email形式の中身
  email: Yup.string().email('Invalid email').required('No email provided'),
  // 文字列型・必須・5文字より少ない
  password: Yup.string().required('No password provided').min(5, 'Password should be min 5 chars')
})

const Home: NextPage = () => {
  const router = useRouter()
  // ログインモード/登録モード
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const form = useForm<AuthForm>({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: ''
    }
  })
  // TODO: リクエスト用の関数はpropsで渡すようにしたい
  const handleSubmit = async () => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
    try {
      if (isRegister) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
          email: form.values.email,
          password: form.values.password
        })
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: form.values.email,
        password: form.values.password
      })
      form.reset()
      router.push(`http://localhost:3000/dashboard`)
    } catch(e: any) {
      console.log('login/signUp error', e)
      setError(e.response.message)
    }
  }

  return (
    <Layout title='Title'>
      <ShieldCheckIcon className='h-16 w-16 text-blue-500'></ShieldCheckIcon>
      {error && (
        <Alert
          my='md'
          variant='filled'
          icon={<ExclamationCircleIcon />}
          title="Authorization Error"
          color='red'
          radius='md'
        >
          {error}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          mt='md'
          id='email'
          label='Email*'
          placeholder='Example@gmail.com'
          {...form.getInputProps('email')}
         />
        <PasswordInput
          mt='md'
          id='password'
          label='Password*'
          placeholder='Password'
          description='Must be min 5 char'
          {...form.getInputProps('password')}
         />
         <Group mt='xl' position='apart'>
            <Anchor
              component="button"
              type='button'
              size='xs'
              className='text-gray-300'
              onClick={() => {
                setIsRegister(!isRegister)
                setError('')
              }}
            >
              {
                isRegister ? 'Have an account? login' : "Don't hava an account? Register"
              }
            </Anchor>
            <Button
              leftIcon={<IconDatabase size={14} />}
              color="cyan"
              type='submit'
            >
              { isRegister ? 'Register' : 'Login' }
            </Button>
         </Group>
      </form>
    </Layout>
  )
};

export default Home
