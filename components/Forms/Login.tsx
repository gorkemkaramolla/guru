import React from 'react';
import { Avatar, Container } from '@mui/material';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useRouter } from 'next/router';
import { Button, Input, Text } from '@nextui-org/react';
import { useFormik } from 'formik';
interface Props {
  // define the component props here
}
const userInitialValues = {
  email: '',
  password: '',
};
const LoginPage: React.FC<Props> = ({}) => {
  const router = useRouter();
  const signin = async (email: string, password: string) => {
    const status = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: '/',
    });

    if (status?.ok) router.push(status?.url!);
  };
  const formik = useFormik({
    initialValues: userInitialValues,
    validate(values) {
      const errors: {
        email?: string;
        password?: string;
      } = {};

      if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      }
      return errors;
    },
    onSubmit: (values) => {
      signin(values.email, values.password);
    },
  });
  return (
    <Container component='main' maxWidth='xs' className='h-screen'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <Avatar
          style={{
            margin: '8px',
            backgroundColor: '#f50057',
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Text>Log in</Text>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            width: '100%',
            marginTop: '24px',
          }}
        >
          <div className='mb-8'>
            <Input
              fullWidth
              type='email'
              autoComplete='email'
              labelPlaceholder='Email'
              bordered
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='mx-2 text-rose-500'>{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <Input.Password
              fullWidth
              type='password'
              labelPlaceholder='Password'
              bordered
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className='mx-2 text-rose-500'>{formik.errors.password}</div>
            ) : null}
          </div>

          <Button
            type='submit'
            css={{
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              w: '100%',
            }}
            style={{
              margin: '24px 0px 16px',
            }}
          >
            Log In
          </Button>
        </form>
      </div>
      <div className='text-right'>
        Don&apost have an account, yet?{' '}
        <Link href={'/login?signup=true'} className='text-blue-600'>
          Register now!
        </Link>
      </div>
      <hr className='w-4/5 mx-auto my-4 border-black' />
      <Button
        bordered
        css={{ w: '100%' }}
        onClick={() => signIn('google')}
        icon={<FcGoogle />}
      >
        Sign in with Google
      </Button>
    </Container>
  );
};
export default LoginPage;
