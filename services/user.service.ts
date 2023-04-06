import axios from 'axios';

async function registerUser(
  name: string,
  surname: string,
  email: string,
  password: string
) {
  try {
    const response = await axios.post('/api/user/register', {
      name,
      surname,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
export { registerUser };
