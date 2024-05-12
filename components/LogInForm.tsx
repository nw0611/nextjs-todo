import { ShieldCheckIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { Alert, TextInput, PasswordInput, Group, Anchor, Button } from '@mantine/core'
import { IconDatabase } from '@tabler/icons-react'
import React from 'react'
import { Layout } from './Layout'
import { AuthForm } from '@/types'
import { useForm, yupResolver } from '@mantine/form'
import * as Yup from 'yup'

type LogInFormType = {
  error: string,
  isRegisterMode: boolean,
  chagenModeHandler: () => void,
  submitHandler: ({email, password}: AuthForm) => Promise<void>,
}

// バリデーションロジック
// yup.object.shape 実際のデータ構造をオブジェクトで定義する
const schema = Yup.object().shape({
  // 文字列型・email形式・必須 TODO: email形式の中身
  email: Yup.string().email('Invalid email').required('No email provided'),
  // 文字列型・必須・5文字より少ない
  password: Yup.string().required('No password provided').min(5, 'Password should be min 5 chars')
})

export const LogInForm = ({ error, isRegisterMode, chagenModeHandler, submitHandler }: LogInFormType) => {
  const form = useForm<AuthForm>({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: ''
    }
  })

  const handleSubmit = () => {
    submitHandler({
      email: form.values.email,
      password: form.values.password
    })
    form.reset()
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
         <Group mt='xl' gap='md'>
            <Anchor
              component="button"
              type='button'
              size='xs'
              style={{ border: 'none', backgroundColor: 'inherit' }}
              className='text-gray-300'
              onClick={chagenModeHandler}
            >
              {
                isRegisterMode ? 'Have an account? login' : "Don't hava an account? Register"
              }
            </Anchor>
            <Button
              type='submit'
              variant='filled'
              leftSection={<IconDatabase size={14} />}
              color="cyan"
            >
              { isRegisterMode ? 'Register' : 'Login' }
            </Button>
         </Group>
      </form>
    </Layout>
  )
}
