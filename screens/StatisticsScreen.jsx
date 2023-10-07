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

import Loader from "../components/Loader";
import PieChart from "../components/PieChart";
import getData from "../api-services/getData";

export default function StatisticsScreen({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState([]);
  
  useEffect(() => {
    getStats();
  }, []);

  const data1 = [
    { label: "JHA Development", value: 30 },
    { label: "Label 2", value: 50 },
    { label: "Label 3", value: 22 },
    { label: "Label 4", value: 15 },
  ];
  const getStats = () => {
    setLoading(true);
    getData(
      { url: "/Dashboard/GetTOTCharts" },
      (response) => {
        setLoading(false);
        setStats(response?.data);
        console.log("🚀 ~ file: StatisticsScreen.jsx:38 ~ getStats ~ response?.data:", response?.data)
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
        <Text style={{marginTop: 40}}>Coming Soon</Text>
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
