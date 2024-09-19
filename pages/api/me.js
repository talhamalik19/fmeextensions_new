import { getStrapiURL } from '@/utils';
import axios from 'axios';
import { getCookies } from 'cookies-next';

const getAuthenticatedUser = async (req) => {
  const cookies = getCookies(req);
  if (!cookies.jwt) {
    return null;
  }

  try {
    const response = await axios.get(getStrapiURL('/users/me'), {
      headers: { 
        'Authorization': `Bearer ${cookies.jwt}`
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Error fetching user');
  }
};

export default getAuthenticatedUser;
