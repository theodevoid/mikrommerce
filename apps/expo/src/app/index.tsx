import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Button, Text, View } from "native-base";

import { api } from "~/utils/api";

const Index = () => {
  const { data } = api.product.getProducts.useQuery({});

  return (
    <SafeAreaView>
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View>
        <Text>
          Create <Text>T3</Text> Turbo
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;
