import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";

import getData from "../api-services/getData";
import ListCell from "../components/ListCell";

export default function SubmissionContentScreen({
  route = {},
  ...otherParams
}) {
  const { params } = route;
  const { template = null, cellOptions = {} } = params;

  const isFocused = useIsFocused();
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
        const { items = [], attachments = null } = response?.data;
        console.log(
          "🚀 ~ file: SubmissionContentScreen.jsx ~ line 38 ~ getListData ~ response?.data",
          params?.url,
          response?.data
        );

        setData(attachments ? attachments : items);
      },
      (error) => {
        setLoading(false);
        console.log(
          "🚀 ~ file: SelectInput.jsx ~ line 44 ~ getData ~ error",
          params?.url,
          JSON.parse(JSON.stringify(error))
        );
      }
    );
  };

  const onRefresh = () => {
   getListData(params?.url)
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>
        {route.params?.title ? route.params.title : title} Submissions
      </Text> */}
      {/* <Loader show={loading} size="large" overlay="true" color="white" /> */}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        {data && data.length > 0 ? (
          <FlashList
            // onRefresh={() => onRefresh()}
            // refreshing={isRefresh}
            renderItem={({ item }) => {
              return (
                <ListCell
                  item={{ ...item, apiUrl: params?.url }}
                  navigation={params?.navigation}
                  cellOptions={cellOptions}
                  template={template}
                />
              );
            }}
            estimatedItemSize={10}
            data={data}
          />
        ) : (
          <Text style={{ color: "#999", textAlign: "center" }}>
            Data not found!
          </Text>
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
