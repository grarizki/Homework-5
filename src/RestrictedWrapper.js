import React from "react";
import { Route, useHistory } from "react-router-dom";
import { useAuthorizedContext } from "./AuthorizedContext";
import Cookies from "universal-cookie";


const cookies =  new Cookies()

const RestrictedWrapper = (props) => {
  const { isLoggedIn, setAuthorizedValue} = useAuthorizedContext();
  const history = useHistory();

const accessToken = cookies.get("accessToken")

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push("/home");
    }
  }, [isLoggedIn, history]);


  React.useEffect(() => {
   if(accessToken) {
     setAuthorizedValue(true)
   }
  }, [accessToken, isLoggedIn])

  return isLoggedIn ? null : props.children;
};

export default RestrictedWrapper;