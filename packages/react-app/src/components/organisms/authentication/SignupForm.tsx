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
import React, { useCallback, useContext, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

import { AuthContext } from "../../../contexts/AuthContext";
import useThemeColors from "../../../hooks/theme/useThemeColors";
import ToggleRevealPasswordIcon from "../../atoms/icons/ToggleRevealPasswordIcon";
import DefaultLink from "../../atoms/links/DefaultLink";

const SignupForm = () => {
  const colors = useThemeColors();
  const width = useWindowWidth();

  // get the login function from auth context
  const { signup } = useContext(AuthContext);

  // the form's min width
  const formMinWidth = width > 500 ? "400px" : undefined;

  // state to reveal or hide password
  const [revealPass, setRevealPass] = useBoolean(false);
  const [revealCPass, setRevealCPass] = useBoolean(false);

  // state for login error
  const [loginError, setLoginError] = useState<string | undefined>();

  // returns the input type for the password field depending on `reveal``
  const passwordInputType = (reveal: boolean): "text" | "password" => {
    if (reveal) return "text";
    return "password";
  };

  // aria label for the password input reveal button
  const passwordRevealButtonAriaLabel = (reveal: boolean): "Hide password" | "Reveal password" => {
      if (reveal) return "Hide password";
      return "Reveal password";
    };

  // function to toggle revealing password
  const toggleReveal = (setReveal: {
    readonly toggle: () => void;
  }) => () => setReveal.toggle();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues
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
        await signup(email, password);
      } catch (error) {
        setLoginError((error as AxiosError).response?.data ?? "Network error.");
      }
    },
    [signup, setLoginError]
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
                type={passwordInputType(revealPass)}
                placeholder="Password"
              />
              <InputRightElement>
                <IconButton
                  aria-label={passwordRevealButtonAriaLabel(revealPass)}
                  bg="transparent"
                  disabled={isSubmitting}
                  size="sm"
                  icon={<ToggleRevealPasswordIcon reveal={revealPass} />}
                  onClick={toggleReveal(setRevealPass)}
                />
              </InputRightElement>
            </InputGroup>
            {errors.password !== undefined && (
              <FormErrorMessage color={colors.error} fontSize="sm">
                {errors.password.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            id="confirm_password"
            isDisabled={isSubmitting}
            isInvalid={errors.confirmPassword !== undefined}
          >
            <FormLabel fontSize="sm">Conirm Password</FormLabel>
            <InputGroup>
              <Input
                {...register("confirmPassword", {
                  validate: value =>
                    value === getValues("password") || "The passwords do not match"
                })}
                fontSize="sm"
                type={passwordInputType(revealCPass)}
                placeholder="Retype Password"
              />
              <InputRightElement>
                <IconButton
                  aria-label={passwordRevealButtonAriaLabel(revealCPass)}
                  bg="transparent"
                  disabled={isSubmitting}
                  size="sm"
                  icon={<ToggleRevealPasswordIcon reveal={revealCPass} />}
                  onClick={toggleReveal(setRevealCPass)}
                />
              </InputRightElement>
            </InputGroup>
            {errors.confirmPassword !== undefined && (
              <FormErrorMessage color={colors.error} fontSize="sm">
                {errors.confirmPassword.message}
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
            <p>Already have an account? <DefaultLink to="/login">Sign In</DefaultLink></p>
          </div>
        </VStack>
      </form>
    </Box>
  );
};

export default SignupForm;
