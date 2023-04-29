import { getCsrfToken } from 'next-auth/react';

export function authMiddleware(resolver: any) {
  return async (
    parent: any,
    args: any,
    { req, ...context }: any,
    info: any
  ) => {
    // check if user is authenticatedd
    const csrfToken = await getCsrfToken({ req });

    console.log(csrfToken);

    // if user is not authenticated, throw an error
    // if (!session || !session.user) {
    //   console.log('session' + session?.user);
    //   throw new Error('Unauthorized access');
    // }

    // if user is authenticated, call the actual resolver function
    return resolver(parent, args, { req, ...context }, info);
  };
}
