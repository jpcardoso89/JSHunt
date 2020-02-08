import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity
} from "react-native";
import api from "../../services/Api";

export default function Home(props) {
  const [products, setProducts] = useState({
    productInfo: {},
    docs: [],
    page: 1
  });

  useEffect(() => {
    getProducts();
    return () => {};
  }, []);

  const getProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);
    const { docs, ...productInfo } = response.data;
    console.log(docs);
    setProducts(prevState => ({
      docs: [...prevState.docs, ...docs],
      productInfo,
      page
    }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>

      <TouchableOpacity
        style={styles.productButton}
        onPress={() => {
          props.navigation.navigate("ProductDetail", { product: item });
        }}
      >
        <Text style={styles.productButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );

  const loadMore = () => {
    const { page, productInfo } = products;
    if (page === productInfo.pages) return;
    const nextPage = page + 1;
    getProducts(nextPage);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products.docs}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "flex-start"
  },
  list: {
    padding: 20
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#DA552F",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  productButtonText: { fontSize: 16, fontWeight: "bold", color: "#DA552F" },
  productTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  productDescription: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
    lineHeight: 24
  },
  productContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  }
});
