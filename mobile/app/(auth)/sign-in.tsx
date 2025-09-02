import { View, Alert, Text } from "react-native";
import React, { useState } from "react";
import Custominput from "@/components/Custominput";
import CustomButton from "@/components/CustomButton";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/authSlice";
import { loginUser } from "@/services/authService";
import { Link } from "expo-router";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const submit = async () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await loginUser({ email, password });

      if (res.token) {
        dispatch(loginSuccess({ token: res.token, user: res.user || null }));
        Alert.alert("Success", "Signed in and token stored in Redux!");
      }
    } catch (error) {
      Alert.alert("Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="px-2 gap-4 mt-10">
      <Custominput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        label="Email"
        keyboardType="email-address"
      />
      <Custominput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        label="Password"
        secureTextEntry
      />
      <CustomButton
        title="Sign In"
        isLoading={isSubmitting}
        onPress={submit}
        style={"bg-secondary my-7"}
        textStyle={"font-bold"}
      />
      <View className="flex flex-row gap-5 justify-center">
        <Text className="text-white-300">Don't have an account ?</Text>
        <Link href={"/sigin-up"} className="text-white-100 font-light">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default Signin;
