import { View, Alert } from "react-native";
import React, { useState } from "react";
import Custominput from "@/components/Custominput";
import CustomButton from "@/components/CustomButton";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/authSlice";
import { registerUser } from "@/services/authService";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const submit = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await registerUser({ name, email, password });

      if (res.token) {
        dispatch(loginSuccess({ token: res.token, user: res.user || null }));
        Alert.alert("Success", "Account created and token stored in Redux!");
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
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        label="Full Name"
        keyboardType="default"
      />
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
        title="Sign Up"
        isLoading={isSubmitting}
        onPress={submit}
        style={"bg-secondary my-7"}
        textStyle={"font-bold"}
      />
    </View>
  );
};

export default Signup;
