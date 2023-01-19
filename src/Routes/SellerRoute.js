import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
import Loader from "../CustomComponents/Loader";
import useRole from "../Hooks/UseRole";

const SellerRoute = ({ children }) => {
  const { user, loader } = useContext(AuthContext);
  const location = useLocation();

  const [role, roleLoader] = useRole(user?.email);

  if (loader || roleLoader) {
    return <Loader></Loader>;
  }

  if (user?.uid && role === "Seller") {
    return children;
  } else {
    return <Navigate to={"*"} state={{ from: location }} replace></Navigate>;
  }
};

export default SellerRoute;
