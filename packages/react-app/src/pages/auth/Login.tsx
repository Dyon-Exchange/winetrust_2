import { Center, Heading, VStack } from "@chakra-ui/react";
import React from "react";

import LoginForm from "../../components/organisms/authentication/LoginForm";

const Login = () => (
  <Center py="100px">
    <VStack spacing="50px">
      <Heading fontSize="3xl">Sign in to your account</Heading>
      <LoginForm />
    </VStack>
  </Center>
);

export default Login;
