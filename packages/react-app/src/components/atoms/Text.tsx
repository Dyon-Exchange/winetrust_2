/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
import { css } from "@emotion/react";
import { Typography, TypographyProps } from "@material-ui/core";
import React from "react";

interface Props extends TypographyProps {
  bold?: boolean;
}

const Text = ({ bold, ...props }: Props) => (
  <Typography css={styles.text(bold)} {...props} />
);

export default Text;

const styles = {
  text: (bold?: boolean) => css`
    font-weight: ${bold ? "bold" : "normal"};
  `,
};
