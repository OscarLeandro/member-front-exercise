import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../context/authContext";
import UserContextProvider from "../context/UserContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserContextProvider>
        <Component {...pageProps} />
        </UserContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
