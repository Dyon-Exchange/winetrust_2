import { Center, Heading, VStack } from "@chakra-ui/react";
import React from "react";

import ForgetPasswordForm from "../../components/organisms/authentication/ForgetPasswordForm";

const ForgotPassword: React.FC = () => (
  <Center py="100px">
    <VStack spacing="50px">
      <Heading fontSize="3xl">Forgot Password</Heading>
      <ForgetPasswordForm />
    </VStack>
  </Center>
);

export default ForgotPassword;
