import { BASE_URL } from '@/config/config';
import axios from 'axios';



export const searchAllPosts = async (payload) => {
 
  try {
    const response = await axios.post(`${BASE_URL}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
