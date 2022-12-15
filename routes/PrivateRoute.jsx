import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";

import LoadingToRedirect from "../LoadingToRedirect";

export default function PrivateRoute({ children,path="/signin"  }) {
  const { state, loading } = useContext(AuthContext);
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (state.user) {
      setUser(true);
    }
  }, [state.user]);

  if (!user && loading) {
    return <p>loading...</p>;
  }
  if (!user && !loading) {
    return <LoadingToRedirect path={path} />;
  } else {
    return <>{children}</>;
  }
}
