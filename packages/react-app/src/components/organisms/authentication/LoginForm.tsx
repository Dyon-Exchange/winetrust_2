import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useBoolean,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useMemo } from "react";

// returns the icon shown on the toggle reveal button
const ToggleRevealPasswordIcon = ({ reveal }: { reveal: boolean }) => {
  if (reveal) return <ViewOffIcon />;
  return <ViewIcon />;
};

const LoginForm = () => {
  // light mode and dark mode background colors for the whole app
  const themeBackgroundColor = useColorModeValue("white", "gray.600");

  // state to reveal or hide password
  const [reveal, setReveal] = useBoolean();

  // returns the input type for the password field depending on `reveal``
  const passwordInputType: "text" | "password" = useMemo(() => {
    if (reveal) return "text";
    return "password";
  }, [reveal]);

  // function to toggle revealing password
  const toggleRevealPassword = () => setReveal.toggle();

  return (
    <Box
      bg={themeBackgroundColor}
      borderRadius="md"
      boxShadow="sm"
      p="50px"
      minW="400px"
    >
      <VStack spacing="25px">
        <FormControl id="email">
          <FormLabel fontSize="sm">Email address</FormLabel>
          <Input fontSize="sm" type="email" />
        </FormControl>
        <FormControl id="password">
          <FormLabel fontSize="sm">Password</FormLabel>
          <InputGroup>
            <Input fontSize="sm" type={passwordInputType} />
            <InputRightElement>
              <Button size="sm" onClick={toggleRevealPassword}>
                <ToggleRevealPasswordIcon reveal={reveal} />
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button colorScheme="blue" isFullWidth>
          Sign in
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginForm;
