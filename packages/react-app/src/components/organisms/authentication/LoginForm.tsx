/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
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
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

import useThemeColors from "../../../hooks/theme/useThemeColors";
import ToggleRevealPasswordIcon from "../../atoms/ToggleRevealPasswordIcon";

const LoginForm = () => {
  // get theme colors from zustand
  const { colors } = useThemeColors();

  // state to reveal or hide password
  const [reveal, setReveal] = useBoolean(false);

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
  const onSubmit = (data: LoginForm) => {};

  return (
    <Box
      bg={colors.secondary}
      borderRadius="md"
      boxShadow="sm"
      p="50px"
      minW="400px"
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="25px">
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
              <FormHelperText color="red.500" fontSize="sm">
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
              <FormHelperText color="red.500" fontSize="sm">
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
