/* eslint-disable react/jsx-props-no-spreading */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  FormControl,
  FormErrorMessage,
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
import React, { useCallback, useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

import { AuthContext } from "../../../contexts/AuthContext";
import useThemeColors from "../../../hooks/theme/useThemeColors";
import ToggleRevealPasswordIcon from "../../atoms/icons/ToggleRevealPasswordIcon";
import DefaultLink from "../../atoms/links/DefaultLink";

const LoginForm = () => {
  const colors = useThemeColors();
  const width = useWindowWidth();

  // get the login function from auth context
  const { login, authDetails } = useContext(AuthContext);

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
  const toggleRevealPassword = useCallback(
    () => setReveal.toggle(),
    [setReveal]
  );

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  // submit handler
  const onSubmit = useCallback(
    async (data: LoginForm) => {
      // reset the login error
      setLoginError(undefined);
      const { email, password } = data;
      // return if email or password is undefined
      if (!email || !password) return;

      try {
        await login(email, password);
        console.log(authDetails);
      } catch (error) {
        setLoginError((error as AxiosError).response?.data ?? "Network error.");
      }
    },
    [login, setLoginError, authDetails]
  );

  return (
    <Box
      bg={colors.secondary}
      borderRadius="md"
      boxShadow="sm"
      p="50px"
      minW={formMinWidth}
      maxW="400px"
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="25px">
          {loginError !== undefined && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription fontSize="sm" maxW="200px">
                {loginError}
              </AlertDescription>
              <CloseButton
                onClick={() => setLoginError(undefined)}
                position="absolute"
                right="8px"
                top="8px"
              />
            </Alert>
          )}
          <FormControl
            id="email"
            isDisabled={isSubmitting}
            isInvalid={errors.email !== undefined}
          >
            <FormLabel fontSize="sm">Email address</FormLabel>
            <Input
              {...register("email", {
                required: "Email address is required",
                validate: (email?: string) =>
                  isEmail(email || "") ? undefined : "Invalid email address",
              })}
              fontSize="sm"
              type="email"
              placeholder="Email"
            />
            {errors.email !== undefined && (
              <FormErrorMessage color={colors.error} fontSize="sm">
                {errors.email.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            id="password"
            isDisabled={isSubmitting}
            isInvalid={errors.password !== undefined}
          >
            <FormLabel fontSize="sm">Password</FormLabel>
            <InputGroup>
              <Input
                {...register("password", { required: "Password is required" })}
                fontSize="sm"
                type={passwordInputType}
                placeholder="Password"
              />
              <InputRightElement>
                <IconButton
                  aria-label={passwordRevealButtonAriaLabel}
                  bg="transparent"
                  disabled={isSubmitting}
                  size="sm"
                  icon={<ToggleRevealPasswordIcon reveal={reveal} />}
                  onClick={toggleRevealPassword}
                />
              </InputRightElement>
            </InputGroup>
            {errors.password !== undefined && (
              <FormErrorMessage color={colors.error} fontSize="sm">
                {errors.password.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <Button
            colorScheme="blue"
            isLoading={isSubmitting}
            isFullWidth
            type="submit"
          >
            Sign in
          </Button>
          <div>
            <p>Don&#39;t have an account? <Link to="/signup">Sign Up</Link></p>
            <p><Link to="/forgetpassword">Forgot Password?</Link></p>
          </div>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginForm;
