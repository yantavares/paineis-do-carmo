import React from "react";
import { useAuth } from "src/context/AuthContext";
import AdminDash from "./AdminDash";
import UserDash from "./UserDash";

const index = () => {
  const { role } = useAuth();
  return role === "admin" ? <AdminDash /> : <UserDash />;
};
export default index;
