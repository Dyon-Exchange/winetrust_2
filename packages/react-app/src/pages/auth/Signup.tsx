import { Center, Heading, VStack } from "@chakra-ui/react";
import React from "react";

import SignupForm from "../../components/organisms/authentication/SignupForm";

const Signup: React.FC = () => (
  <Center py="100px">
    <VStack spacing="50px">
      <Heading fontSize="3xl">Create an account</Heading>
      <SignupForm />
    </VStack>
  </Center>
);

export default Signup;
