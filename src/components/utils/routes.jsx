import { useRouter } from "next/router";  
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Text from '@/components/Text'
import SocialCards from "./components/SocialCards/SocialCards";
import { getToken } from "@/components/utils/helpers";
import SignIn from "@/pages/signin";
import SignUp from "@/pages/signup";

const AppRoutes = () => {



  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/test"
        element={getToken() ? <Text /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
};

export default AppRoutes;