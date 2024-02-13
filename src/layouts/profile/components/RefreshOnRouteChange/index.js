import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function RefreshOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    window.location.reload();
  }, [location]);

  return null;
}

export default RefreshOnRouteChange;