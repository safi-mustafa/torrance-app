import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
// import { WebView } from "react-native-webview";

import Loader from "../components/Loader";
// import PieChart from "../components/PieChart";
import getData from "../api-services/getData";

export default function StatisticsScreen({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // getStats();
  }, []);

  const getStats = () => {
    setLoading(true);
    getData(
      { url: "/Dashboard/GetTOTCharts" },
      (response) => {
        setLoading(false);
        setStats(response?.data);
        console.log(
          "🚀 ~ file: StatisticsScreen.jsx:38 ~ getStats ~ response?.data:",
          response?.data
        );
      },
      (error) => {
        console.log(
          "🚀 ~ file: DashboadMenu.jsx ~ line 95 ~ getFolders ~ error",
          error
        );
        setLoading(false);
      }
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Loader show={loading} size="large" overlay="true" />
        <Text style={{ marginTop: 40 }}>Coming Soon</Text>
        {/* <View style={{ height: height - 100, width: width }}>
        <WebView
          // style={styles.container}
          style={{ height: height - 100, width: width }}
          source={{ uri: "http://203.124.35.18:8402/ApproverDashboard" }}
        />
        </View> */}
        {/* <ScrollView>
        <View style={styles.pieContainer}>
            <Text style={styles.title}>
              Hourse By Shift Delay (TOT)
            </Text>
            <PieChart labelAttrib="category" data={stats?.shiftDelay ?? []} pieWidth={width - 30} pieHeight={320} />
          </View>
          <View style={styles.pieContainer}>
            <Text style={styles.title}>Hours By Rework Delay (TOT)</Text>
            <PieChart labelAttrib="category" data={stats?.reworkDelay ?? []} pieWidth={width - 30} pieHeight={320} />
          </View>
          <View style={styles.pieContainer}>
            <Text style={styles.title}>
              Hours By Start of the Work Delay (TOT)
            </Text>
            <PieChart labelAttrib="category" data={stats?.startOfWorkDelay ?? []} pieWidth={width - 30} pieHeight={320} />
          </View>
          <View style={styles.pieContainer}>
            <Text style={styles.title}>Hours By OnGoing Work Delay (TOT)</Text>
            <PieChart labelAttrib="category" data={stats?.ongoingWorkDelay ?? []} pieWidth={width - 30} pieHeight={320} />
          </View>    
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pieContainer: {
    flex: 1,
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    // alignSelf: "flex-start"
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
