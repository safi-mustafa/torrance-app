import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useState, useEffect } from "react";

import getData from "../api-services/getData";
import NotificationCell from "../components/cell-templates/NotificationCell";
import useUserMeta from "../hooks/useUserMeta";
import { USER_ROLE } from "../constants/Misc";

export default function NotificationScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { role = "" } = useUserMeta();
  const isApprover = USER_ROLE.APPROVER == role;

  useEffect(() => {
    showData();
    return () => {
      setData([]);
    };
  }, []);

  const showData = () => {
    setLoading(true);
    getData(
      { url: "/Notification?Type=Push&DisablePagination=true" },
      (response) => {
        setLoading(false);
        const { items = [] } = response?.data;
        console.log(
          "🚀 ~ file: NotificationScreen.jsx:19 ~ showData ~ items",
          items
        );
        setData(items);
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

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => showData()} />
        }
      >
        {data && data.length > 0 ? (
          <FlashList
            renderItem={({ item }) => {
              return (
                <NotificationCell
                  item={item}
                  cellOptions={{titleField: 'message'}}
                  navigation={navigation}
                  isApprover={isApprover}
                />
              );
            }}
            estimatedItemSize={10}
            data={data}
          />
        ) : (
          <Text style={{ color: "#999", textAlign: "center", marginTop: 20 }}>
            Data not found!
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView:{
    marginTop: 10
  }
});
