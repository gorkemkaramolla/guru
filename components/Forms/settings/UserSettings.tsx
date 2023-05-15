import SingleSettingsField from '@/components/Settings/SingleSettingField';
import { CustomUser } from '@/types';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import ToolTip from '@/components/UI/ToolTip';
import { Input, StyledButton } from '@nextui-org/react';
import { InputLabel } from '@mui/material';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import useSWR, { mutate } from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/exampleSlice';
import { RootState } from '@/store';
axios.defaults.withCredentials = true;

interface Props {}
interface Props {
  userInformations: CustomUser;
}

const UserSettings: React.FC<Props> = ({ userInformations }) => {
  const { data, error } = useSWR('/api/auth/session', async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });

  async function handleSubmitted() {
    mutate('/api/auth/session');
  }
  const [testUser, setTestUser] = useState<CustomUser>();
  const { data: session, update } = useSession();
  const currentUser = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);
  const userUpdate = async (
    at: string,
    email: string,
    name: string,
    lastname: string
  ) => {
    try {
      const response = await axios.put(
        `${process.env.HOST_ROOT}api/user/settings`,
        {
          at: at,
          email: email,
          name: name,
          lastname: lastname,
        },
        {
          withCredentials: true,
        }
      );
      // const newSession = await update({
      //   ...session,
      //   user: response.data.updatedUser,
      //   accessToken: 'asda',
      // });
      console.log(response);
      dispatch(setUser(response.data.updatedUser));
    } catch (e) {}
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          at: currentUser?.at!,
          email: currentUser?.email!,
          name: currentUser?.name!,
          lastname: currentUser?.lastname!,
        }}
        validate={(values) => {
          //   const errors = {};
          //   if (!values.email) {
          //     errors.email = 'Required';
          //   } else if (
          //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          //   ) {
          //     errors.email = 'Invalid email address';
          //   }
          //   return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await userUpdate(
              values.at!,
              values.email!,
              values.name!,
              values.lastname!
            );
          } catch (error) {
            console.log(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form
            className='flex flex-col gap-8  rounded-xl p-2'
            onSubmit={handleSubmit}
          >
            <h1 className=' text-3xl '>USER</h1>
            <div className='flex flex-col gap-4 dark:text-white '>
              <p className='text-indigo-400'>Email</p>
              <input
                className=' border-[0.1px] border-indigo-600 outline-none  focus:outline-none focus:ring-2 focus:ring-indigo-600 p-3 rounded-lg transition-all  dark:bg-transparent'
                color='error'
                width='100%'
                type='email'
                name='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
            </div>

            <div className='flex flex-col gap-4 dark:text-white '>
              <div className='flex  items-center gap-3'>
                <p className='text-indigo-400'>Guru-id</p>

                <ToolTip message='This is your user id and your profile endpoint you can change it anytime' />
              </div>
              <input
                className='border-[0.1px] border-indigo-600 w-[100%] outline-none focus:outline-none focus:ring-2 focus:ring-indigo-600 p-3 rounded-lg transition-all  dark:bg-transparent'
                type='text'
                name='at'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.at}
              />
            </div>

            <div className='flex gap-4  w-full justify-between'>
              <div className='flex w-1/2 flex-col gap-4 dark:text-white '>
                <p className='text-indigo-400'>Name</p>
                <input
                  className='border-[0.1px] border-indigo-600 outline-none focus:outline-none focus:ring-2 focus:ring-indigo-600 p-3 rounded-lg transition-all  dark:bg-transparent'
                  color='error'
                  type='text'
                  name='name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
              </div>

              <div className='flex w-[50%] flex-col gap-4 dark:text-white '>
                <p className='text-indigo-400'>Lastname</p>
                <input
                  className=' border-[0.1px] border-indigo-600 outline-none focus:outline-none focus:ring-2 focus:ring-indigo-600 p-3 rounded-lg transition-all  dark:bg-transparent'
                  type='text'
                  name='lastname'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastname}
                />
              </div>
            </div>

            {errors.at && touched.at && errors.at}

            <input type='submit' />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UserSettings;
