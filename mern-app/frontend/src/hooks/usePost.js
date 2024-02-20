import { useQuery } from 'react-query';
import api from '@/api/api'; // import your API file here

const usePosts = (payload, flag) => {
  const { data, isLoading, isError, error } = useQuery(
    ['posts',  payload],
    () => api.searchAllPosts(payload),
    {
      enabled: flag,
      cacheTime: 0,
      retry: false,
    }
  );

  return {
    posts: data,
    isLoading,
    isError,
    errorData: error?.response?.data,
  };
};

export default usePosts;
