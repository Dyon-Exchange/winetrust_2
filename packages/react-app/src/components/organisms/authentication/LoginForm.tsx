/* eslint-disable react/jsx-props-no-spreading */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useBoolean,
  VStack,
} from "@chakra-ui/react";
import { useWindowWidth } from "@react-hook/window-size";
import { AxiosError } from "axios";
import React, { useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

import { AuthContext } from "../../../contexts/AuthContext";
import useThemeColors from "../../../hooks/theme/useThemeColors";
import ToggleRevealPasswordIcon from "../../atoms/ToggleRevealPasswordIcon";

const LoginForm = () => {
  const colors = useThemeColors();
  const width = useWindowWidth();

  // get the login function from auth context
  const { login } = useContext(AuthContext);

  // the form's min width
  const formMinWidth = width > 500 ? "400px" : undefined;

  // state to reveal or hide password
  const [reveal, setReveal] = useBoolean(false);

  // state for login error
  const [loginError, setLoginError] = useState<string | undefined>();

  // returns the input type for the password field depending on `reveal``
  const passwordInputType: "text" | "password" = useMemo(() => {
    if (reveal) return "text";
    return "password";
  }, [reveal]);

  // aria label for the password input reveal button
  const passwordRevealButtonAriaLabel: "Hide password" | "Reveal password" =
    useMemo(() => {
      if (reveal) return "Hide password";
      return "Reveal password";
    }, [reveal]);

  // function to toggle revealing password
  const toggleRevealPassword = () => setReveal.toggle();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  // submit handler
  const onSubmit = async (data: LoginForm) => {
    // reset the login error
    setLoginError(undefined);
    const { email, password } = data;
    // return if email or password is undefined
    if (!email || !password) return;

    try {
      await login(email, password);
    } catch (error) {
      setLoginError((error as AxiosError).response?.data ?? "Network error.");
    }
  };

  return (
    <Box
      bg={colors.secondary}
      borderRadius="md"
      boxShadow="sm"
      p="50px"
      minW={formMinWidth}
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="25px">
          {loginError !== undefined && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription fontSize="sm">{loginError}</AlertDescription>
              <CloseButton
                onClick={() => setLoginError(undefined)}
                position="absolute"
                right="8px"
                top="8px"
              />
            </Alert>
          )}
          <FormControl id="email">
            <FormLabel fontSize="sm">Email address</FormLabel>
            <Input
              {...register("email", {
                required: "Email address is required",
                validate: (email?: string) =>
                  isEmail(email || "") ? undefined : "Invalid email address",
              })}
              fontSize="sm"
              type="email"
              isInvalid={errors.email !== undefined}
            />
            {errors.email !== undefined && (
              <FormHelperText color={colors.error} fontSize="sm">
                {errors.email.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl id="password">
            <FormLabel fontSize="sm">Password</FormLabel>
            <InputGroup>
              <Input
                {...register("password", { required: "Password is required" })}
                fontSize="sm"
                type={passwordInputType}
                isInvalid={errors.password !== undefined}
              />
              <InputRightElement>
                <IconButton
                  aria-label={passwordRevealButtonAriaLabel}
                  bg="transparent"
                  size="sm"
                  icon={<ToggleRevealPasswordIcon reveal={reveal} />}
                  onClick={toggleRevealPassword}
                />
              </InputRightElement>
            </InputGroup>
            {errors.password !== undefined && (
              <FormHelperText color={colors.error} fontSize="sm">
                {errors.password.message}
              </FormHelperText>
            )}
          </FormControl>
          <Button colorScheme="blue" isFullWidth type="submit">
            Sign in
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginForm;
