import { StyleSheet, View, Text, ScrollView } from "react-native";
import { FlashList } from "@shopify/flash-list";

import getData from "../api-services/getData";
import ListCell from "../components/ListCell";
import Layout from "../constants/Layout";
import { useState, useEffect } from "react";

export default function SubmissionContentScreen({
  navigation,
  params = {},
  route = {},
  ...otherParams
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (params?.url) getListData(params?.url);

    return () => {
      setData([]);
    };
  }, [params?.url]);

  const getListData = (url = "") => {
    getData(
      { url },
      (response) => {
        const { items = [] } = response?.data;
        console.log(
          "🚀 ~ file: SubmissionContentScreen.jsx ~ line 55 ~ getListData ~ items",
          items
        );
        setData(items);
      },
      (error) => {
        console.log(
          "🚀 ~ file: SelectInput.jsx ~ line 44 ~ getData ~ error",
          error
        );
      }
    );
  };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>
        {route.params?.title ? route.params.title : title} Submissions
      </Text> */}
      <ScrollView style={styles.scrollView}>
        <FlashList
          renderItem={({ item }) => {
            return <ListCell item={item} />;
          }}
          estimatedItemSize={10}
          data={data}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  scrollView: {
    height: Layout.window.height,
  },
  title: {
    fontSize: 20,
    // fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
