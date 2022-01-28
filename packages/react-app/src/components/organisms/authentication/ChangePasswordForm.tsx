/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
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
import { includes } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

import changePassword from "../../../api/authentication/changePassword";
import useThemeColors from "../../../hooks/theme/useThemeColors";
import useDefaultToast from "../../../hooks/toast/useDefaultToast";
import ToggleRevealPasswordIcon from "../../atoms/icons/ToggleRevealPasswordIcon";

const ChangePasswordForm = () => {
  const colors = useThemeColors();
  const width = useWindowWidth();
  const toast = useDefaultToast();
  // the form's min width
  const formMinWidth = width > 500 ? "400px" : undefined;

  // state for login error
  const [forgotPasswordError, setChangePasswordError] = useState<
    string | undefined
  >();

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
  const passwordRevealButtonAriaLabel = (
    reveal: boolean
  ): "Hide password" | "Reveal password" => {
    if (reveal) return "Hide password";
    return "Reveal password";
  };

  // function to toggle revealing password
  const toggleReveal = (setReveal: { readonly toggle: () => void }) => () =>
    setReveal.toggle();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<ChangePasswordForm>();

  const params = useParams();
  const { token } = JSON.parse(JSON.stringify(params));
  // submit handler
  const onSubmit = useCallback(
    async (data: ChangePasswordForm) => {
      // reset the login error
      try {
        
        await changePassword(data.password, token);
        toast({
          title: "Password Change",
          description: "Password change successfully.",
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
    [token, toast]
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
                  validate: (value) =>
                    value === getValues("password") ||
                    "The passwords do not match",
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
            Change Password
          </Button>
          <div>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </VStack>
      </form>
    </Box>
  );
};

export default ChangePasswordForm;
