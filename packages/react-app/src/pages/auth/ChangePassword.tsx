import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import React from "react";

import ChangePasswordForm from "../../components/organisms/authentication/ChangePasswordForm";

const ChangePassword: React.FC = () => (
  <Center py="100px">
    <VStack spacing="50px">
      <Heading fontSize="3xl">Change Password</Heading>
      <ChangePasswordForm/>
    </VStack>
  </Center>
);

export default ChangePassword;
