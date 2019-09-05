export const getAxiosConfig = token => ({ 
  headers: {
    Authorization: `Bearer ${token}`
  },
});