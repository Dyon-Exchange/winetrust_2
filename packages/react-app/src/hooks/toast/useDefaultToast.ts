/**
 * Created another use toast hook to define the standard props
 */

import { useToast, UseToastOptions } from "@chakra-ui/react";
import React, { useCallback } from "react";

type OmittedToastProps = Omit<
  UseToastOptions,
  "position" | "duration" | "isClosable"
>;

const useDefaultToast = () => {
  const toast = useToast();

  const defaultToast = useCallback(
    (props: OmittedToastProps) => {
      toast({
        position: "top-right",
        duration: 5000,
        isClosable: true,
        ...props,
      });
    },
    [toast]
  );

  return defaultToast;
};

export default useDefaultToast;
