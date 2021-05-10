import React, { useReducer, useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert
} from "react-native";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/action/auth";

const FORM_INPUT_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValue = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidites = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidites) {
      updatedFormIsValid = updatedFormIsValid && updatedValidites[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValue,
      inputValidities: updatedValidites
    };
  }
  return state;
};

const Auth = props => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);
  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(action);
      props.navigation.navigate("ShopNavigator");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </ScrollView>
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              <Button
                title={isSignup ? "Sign Up" : "Login"}
                color={Colors.primary}
                onPress={authHandler}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
              color={Colors.accent}
              onPress={() => {
                setIsSignup(prevState => !prevState);
              }}
            />
          </View>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};
Auth.navigationOptions = navData => {
  return {
    headerTitle: "Authenticate"
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});
export default Auth;