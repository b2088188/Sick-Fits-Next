//import { queryClient } from '../context';
const apiURL = 'http://localhost:3000/api/graphql';
//process.env.REACT_APP_API_URL;
async function client(endpoint, { query, headers: customHeaders, ...customConfig } = {}) {
   const config = {
      body: query
         ? JSON.stringify({
              query
           })
         : undefined,
      headers: {
         'Content-Type': query ? 'application/json' : undefined,
         ...customHeaders
      },
      credentials: 'include',
      ...customConfig
   };

   return fetch(`${apiURL}/${endpoint}`, config).then(async (response) => {
      if (response.status === 401) {
         // queryClient.clear();
         //await auth.logout();
         // refresh the page for them
         window.location.assign(window.location);
         return Promise.reject({ message: 'Please re-authenticate.' });
      }
      const data = await response.json();

      if (response.ok) {
         return data;
      } else {
         return Promise.reject(data);
      }
   });
}

export { client };
