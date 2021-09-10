import { Typography, TypographyProps } from "@material-ui/core";
import React from "react";

const Text = (props: TypographyProps) => {
  const { children } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Typography {...props}>{children}</Typography>;
};

export default Text;
