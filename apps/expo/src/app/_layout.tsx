import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";

import { TRPCProvider } from "../utils/api";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <NativeBaseProvider>
      <TRPCProvider>
        <SafeAreaProvider>
          {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
          <Stack />
          <StatusBar />
        </SafeAreaProvider>
      </TRPCProvider>
    </NativeBaseProvider>
  );
};

export default RootLayout;
