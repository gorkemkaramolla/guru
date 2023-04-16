import axios from 'axios';

async function createPost(
  content: string,
  title: string,
  user_id: number,
  category_id: number
) {
  try {
    const response = await axios.post('/api/post/createpost', {
      content,
      title,
      user_id,
      category_id,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
async function getPosts() {
  try {
    const response = await axios.get('/api/post/createpost');

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export { createPost, getPosts };
