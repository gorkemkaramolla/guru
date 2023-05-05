import { useState } from 'react';

import Layout from '../components/Layout/Layout';
import { Button } from '@mui/material';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Session } from 'inspector';
import { useSession } from 'next-auth/react';
import { createPost } from '@/services/post.service';

const TextEditor = dynamic(() => import('../components/TextEditor'), {
  ssr: false,
});
export default function CreatePostPage() {
  const [content, setContent] = useState<string>('');
  const session = useSession();
  function handleContentChange(value: string) {
    setContent(value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    createPost(
      content,
      '"This is an EXAMPLE of a string with $pecial characters"',
      session.data?.user?.at!,
      1,
      'Bu yazıda NextJS ile nasıl getServerSideProps yazılır onu öğreneceğiz'
    )
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <div className='mx-auto container'></div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <Layout>
        <form onSubmit={handleSubmit} className=''>
          {typeof document !== 'undefined' && typeof window !== 'undefined' ? (
            <TextEditor value={content} onChange={handleContentChange} />
          ) : null}
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </form>
      </Layout>
    </div>
  );
}
