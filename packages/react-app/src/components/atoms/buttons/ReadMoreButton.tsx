import { Button } from "@chakra-ui/react";
import { makeStyles } from "@material-ui/core";
import React, { useState, ReactChild } from "react";

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: "-webkit-box",
    WebkitLineClamp: 4,
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    "margin-bottom": "5px"
  }
}));
interface Props {
  children: ReactChild;
}
const ReadMore : React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  const [isHidden, setIsHidden] = useState(true);
  return (
    <>
      <div className = {isHidden ? classes.hidden : ""}>{children}</div>
      <Button 
        size="sm"
        colorScheme="gray" 
        fontSize="xs"
        minW="86px"
        onClick={() => setIsHidden(!isHidden)}>
        {isHidden ? "Read More" : "Read Less"}
      </Button>
    </>
  );
}

export default ReadMore;