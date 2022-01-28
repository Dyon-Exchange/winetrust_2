/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useWindowWidth } from "@react-hook/window-size";
import { AxiosError } from "axios";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

import forgotPassword  from "../../../api/authentication/forgotPassword";
import useThemeColors from "../../../hooks/theme/useThemeColors";
import useDefaultToast from "../../../hooks/toast/useDefaultToast";

const ForgetPasswordForm = () => {
  const colors = useThemeColors();
  const width = useWindowWidth();
  const toast = useDefaultToast();

  // the form's min width
  const formMinWidth = width > 500 ? "400px" : undefined;

  // state for login error
  const [forgotPasswordError, setForgotPasswordError] = useState<
    string | undefined
  >();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>();

  // submit handler
  const onSubmit = useCallback(
    async (data: ForgotPasswordForm) => {
      // reset the login error
      setForgotPasswordError(undefined);
      const { email } = data;
      // return if email or password is undefined
      if (!email) return;

      try {
        await forgotPassword(email);
        toast({
          title: "Password Reset Sent.",
          description: "Password reset sent successfully.",
          status: "success",
        });
      } catch (error) {
        toast({
          title: "Error password reset.",
          description:
            (error as AxiosError).response?.data ||
            "There was an error trying to create this reset password, please try again later.",
          status: "error",
        });
      }
    },
    [setForgotPasswordError,toast]
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
          <Button
            colorScheme="blue"
            isLoading={isSubmitting}
            isFullWidth
            type="submit"
          >
            Forgot Password
          </Button>
          <div>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </VStack>
      </form>
    </Box>
  );
};

export default ForgetPasswordForm;
