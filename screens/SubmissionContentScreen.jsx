import { StyleSheet, View, Text, ScrollView } from "react-native";
import { FlashList } from "@shopify/flash-list";

import getData from "../api-services/getData";
import ListCell from "../components/ListCell";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

export default function SubmissionContentScreen({
  route = {},
  ...otherParams
}) {
  const { params } = route;
  // console.log(
  //   "🚀 ~ file: SubmissionContentScreen.jsx ~ line 14 ~ params",
  //   params
  // );
  const { template = null, cellOptions = {} } = params;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params?.url) getListData(params?.url);

    return () => {
      setData([]);
    };
  }, [params?.url]);

  const getListData = (url = "") => {
    setLoading(true);
    getData(
      { url },
      (response) => {
        setLoading(false);
        const { items = [] } = response?.data;
        console.log(
          "🚀 ~ file: SubmissionContentScreen.jsx ~ line 55 ~ getListData ~ items",
          items
        );
        setData(items);
      },
      (error) => {
        setLoading(false);
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
      <Loader show={loading} size="large" overlay="true" color="white" />
      <ScrollView style={styles.scrollView}>
        {data && (
          <FlashList
            renderItem={({ item }) => {
              return (
                <ListCell
                  item={item}
                  navigation={params?.navigation}
                  cellOptions={cellOptions}
                />
              );
            }}
            estimatedItemSize={10}
            data={data}
            template={template}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // backgroundColor: '#fff'
  },
  scrollView: {
    padding: 10,
    marginTop: 8,
    // minHeight: Layout.window.height,
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
