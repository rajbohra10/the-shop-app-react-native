import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";
import MainNavigator from "../navigations/ShopNavigator";

const NavigationContainer = props => {
  const navRef = useRef();
  const isAuth = useSelector(state => !!state.auth.token);
  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "AuthNavigator" })
      );
    }
  }, [isAuth]);
  return <MainNavigator ref={navRef} />;
};

export default NavigationContainer;
