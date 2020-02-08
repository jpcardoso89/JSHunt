import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/home";
import ProductScreen from "./src/screens/product";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "JSHunt",
        headerStyle: {
          backgroundColor: "#DA552F"
        },
        headerTintColor: "#FFF",
        headerTitleStyle: {
          fontWeight: "bold"
        },
        headerTitleAlign: "center"
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductScreen}
        options={({ route }) => ({ title: route.params.product.title })}
      />
    </Stack.Navigator>
  );
}
