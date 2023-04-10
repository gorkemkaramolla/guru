import React from 'react';
import { Avatar, Container } from '@mui/material';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useRouter } from 'next/router';
import { Button, Input, Text } from '@nextui-org/react';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface Props {}
const userInitialValues = {
  name: '',
  lastname: '',
  email: '',
  password: '',
};

const Signup: React.FC<Props> = ({}) => {
  const router = useRouter();
  const signup = async (
    name: string,
    lastname: string,
    email: string,
    password: string
  ) => {
    await axios
      .post('/api/auth/register', {
        data: { name, lastname, email, password },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success('Signup Successful');
          router.push('/login');
        }
      });
  };
  const formik = useFormik({
    initialValues: userInitialValues,
    validate(values) {
      const errors: {
        name?: string;
        lastname?: string;
        email?: string;
        password?: string;
      } = {};

      if (!values.name) {
        errors.name = 'Required';
      } else if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less';
      }

      if (!values.lastname) {
        errors.lastname = 'Required';
      } else if (values.lastname.length > 20) {
        errors.lastname = 'Must be 20 characters or less';
      }

      if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      } else if (
        !(values.password.length >= 8 && values.password.length <= 20)
      ) {
        errors.password = 'Şifre 8 ile 20 karakter arasında olmalı';
      }

      return errors;
    },
    onSubmit: (values) => {
      signup(values.name, values.lastname, values.email, values.password);
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
        <Text>Sign up</Text>

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
              type='text'
              autoComplete='text'
              labelPlaceholder='Name'
              bordered
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className='mx-2 text-rose-500'>{formik.errors.name}</div>
            ) : null}
          </div>
          <div className='mb-8'>
            <Input
              fullWidth
              type='text'
              autoComplete='familyName'
              labelPlaceholder='Family Name'
              bordered
              {...formik.getFieldProps('lastname')}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <div className='mx-2 text-rose-500'>{formik.errors.lastname}</div>
            ) : null}
          </div>
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
            Sign Up
          </Button>
        </form>
      </div>
      <div className='text-right'>
        Already have an account?{' '}
        <Link href={'/login'} className='text-blue-600'>
          Go to Login
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
export default Signup;
