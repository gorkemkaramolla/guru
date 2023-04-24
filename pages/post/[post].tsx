import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
interface Props {}

import { useState } from 'react';
import { Post } from '@prisma/client';
import axios from 'axios';
import PostClient from '@/components/Post/PostClient';

const post: React.FC<Props> = () => {
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const getPost = async (postQuery: string) => {
    try {
      const post = await axios.get(
        `http://localhost:3000/api/post/${postQuery}`
      );
      console.log(post.data.fetchpost);
      return post.data.fetchpost;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const postQuery = router.query.post as string;

    setLoading(true);

    if (postQuery)
      getPost(postQuery)
        .then((res) => {
          setPost(res);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
  }, [router.query]);
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>{post && <PostClient post={post} />}</div>
  );
};

export default post;
