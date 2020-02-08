import React from "react";
import { WebView } from "react-native-webview";

export default function ProductScreen({ route }) {
  const { product } = route.params;

  return <WebView source={{ uri: product.url }} />;
}
