import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import getData from "../api-services/getData";
import deleteData from "../api-services/deleteData";
import appStyles from "../app-styles";
import Loader from "../components/Loader";
import { getFormatedDate } from "../utility";
import { primaryColor } from "../constants/Colors";
import { STATUS } from "../constants/Misc";

export default function SingleSubmissionScreen({
  navigation,
  route,
  ...otherProps
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { id, apiUrl, ...otherRouteItems } = route.params;

  const isTOT = apiUrl == "/TOTLog";
  const isWRR = apiUrl == "/WRRLog";
  const isOverRide = apiUrl == "/OverrideLog";
  const NavUrl = isTOT ? "TotRequest" : "WrrRequest";

  useEffect(() => {
    if (id && !isOverRide) getSubmissionData(id);
    if (isOverRide) setData({ ...otherRouteItems });

    return () => {};
  }, [id]);

  const getSubmissionData = (id = "") => {
    setLoading(true);
    getData(
      { url: `${apiUrl}/${id}` },
      (response) => {
        setLoading(false);
        setData(response?.data);
        console.log(
          "🚀 ~ file: SingleSubmissionScreen.jsx ~ line 33 ~ getSubmissionData ~ response?.data",
          response?.data
        );
      },
      (error) => {
        setLoading(false);
        console.log(
          "🚀 ~ file: SelectInput.jsx ~ line 44 ~ getData ~ error",
          JSON.parse(JSON.stringify(error))
        );
      }
    );
  };

  const onAction = () => {
    navigation.goBack();
    navigation.navigate(NavUrl, { ...data });
  };

  const onDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteItem() },
    ]);
  };

  const deleteItem = () => {
    setLoading(true);
    deleteData(
      { url: `${apiUrl}/${id}` },
      (response) => {
        setLoading(false);
        Toast.show({
          type: "success",
          text1: "Delete",
          text2: "Deleted successfully",
        });
        navigation.goBack();
      },
      (error) => {
        setLoading(false);
        console.log(
          "🚀 ~ file: SelectInput.jsx ~ line 44 ~ getData ~ error",
          JSON.parse(JSON.stringify(error))
        );
      }
    );
  };

  const Action = () => (
    <View
      style={{ margin: 10, flexDirection: "row", alignSelf: "flex-end" }}
    >
      {data?.status !== STATUS.PENDING && (
        <Pressable
          onPress={() => onAction()}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <FontAwesome
            name={"pencil"}
            size={22}
            color={primaryColor}
            style={{ marginHorizontal: 5 }}
          />
        </Pressable>
      )}
      <Pressable
        onPress={() => onDelete()}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <FontAwesome
          name={"trash-o"}
          size={25}
          color={"red"}
          style={{ marginHorizontal: 5 }}
        />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Loader show={loading} size="large" overlay="true" color="white" />
      {!isOverRide && <Action />}
      <ScrollView style={{ paddingHorizontal: 20, marginTop: 10 }}>
        <ListRow label="contractor" value={data?.contractor?.name} />
        {!isOverRide && (
          <>
            <ListRow label="Date" value={getFormatedDate(data?.date)} />
            <ListRow label="approver" value={data?.approver?.name} />
            <ListRow label="department" value={data?.department?.name} />
            <ListRow label="employee" value={data?.employee?.name} />
            <ListRow label="TWR No#" value={data?.twr} />
            <ListRow label="Status" value={data?.status} />
            <ListRow label="unit" value={data?.unit?.name} />
          </>
        )}

        {!isTOT && !isOverRide && (
          <>
            <ListRow label="email" value={data?.email} />
            {/* <ListRow
              label="Calibration Date"
              value={getFormatedDate(data?.calibrationDate)}
            /> */}
            <ListRow
              label="Rod Returned date"
              value={getFormatedDate(data?.dateRodReturned)}
            />
            <ListRow
              label="Calibration Date"
              value={getFormatedDate(data?.formattedCalibrationDate)}
            />
            <ListRow
              label="Date Rod Returned"
              value={getFormatedDate(data?.formattedDateRodReturned)}
            />
            <ListRow
              label="Rod Checked Out"
              value={getFormatedDate(data?.formattedRodCheckedOut)}
            />
            <ListRow label="formatted Status" value={data?.formattedStatus} />
            <ListRow label="location" value={data?.location?.name} />
            <ListRow label="fume Control Used" value={data?.fumeControlUsed} />
            <ListRow
              label="rod Checked Out Lbs"
              value={data?.rodCheckedOutLbs}
            />
            <ListRow
              label="rod Checked Out"
              value={getFormatedDate(data?.rodCheckedOut)}
            />
            <ListRow
              label="rod Returned Waste Lbs"
              value={data?.rodReturnedWasteLbs}
            />
            <ListRow label="rod Type" value={data?.rodType?.name} />
            <ListRow label="weld Method" value={data?.weldMethod?.name} />
          </>
        )}

        {isTOT && (
          <>
            <ListRow label="Equipment No#" value={data?.equipmentNo} />
            <ListRow label="Foreman" value={data?.foreman?.name} />
            <ListRow
              label="Start Of Work"
              value={getFormatedDate(data?.formattedStartOfWork)}
            />
            <ListRow
              label="Time Requested"
              value={data?.formattedTimeRequested}
            />
            <ListRow label="Time Signed" value={data?.formattedTimeRequested} />
            <ListRow label="hours Delayed" value={data?.hoursDelayed} />
            <ListRow label="man Hours" value={data?.manHours} />
            <ListRow
              label="man Power Affected"
              value={data?.manPowerAffected}
            />
            <ListRow label="job Description" value={data?.jobDescription} />
            <ListRow label="permit Type" value={data?.permitType?.name} />
            <ListRow
              label="permitting Issue"
              value={data?.permittingIssue?.name}
            />
            <ListRow label="reworkDelay" value={data?.reworkDelay?.name} />
            <ListRow label="shift" value={data?.shift?.name} />
            <ListRow label="shiftDelay" value={data?.shiftDelay?.name} />
            <ListRow label="Foreman" value={data?.foreman?.name} />
          </>
        )}
        {isOverRide && (
          <>
            <ListRow label="override Type" value={data?.overrideType?.name} />
            <ListRow label="override Hours" value={data?.overrideHours} />
            <ListRow label="requester" value={data?.requester} />
            <ListRow label="requester Email" value={data?.requesterEmail} />
            <ListRow label="craft Rate" value={data?.craftRate?.name} />
            <ListRow label="craft Skill" value={data?.craftSkill?.name} />
            <ListRow
              label="date Of Work Completed"
              value={data?.dateOfWorkCompleted}
            />
            <ListRow
              label="Submitted date"
              value={getFormatedDate(data?.dateSubmitted)}
            />
            <ListRow label="po Number#" value={data?.poNumber} />
            <ListRow
              label="reason For Request"
              value={data?.reasonForRequest?.name}
            />
            <ListRow label="shift" value={data?.shift?.name} />
            <ListRow label="time Submitted" value={data?.timeSubmitted} />
            <ListRow label="work Scope" value={data?.workScope} />
            <ListRow
              label="Employee"
              value={
                data?.employees && data?.employees?.map(({ name = "" }) => name)
              }
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const ListRow = ({ label = "", value = "" }) => (
  <View style={[appStyles.my1, styles.section]}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    // padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 10,
    flexDirection: "row",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  label: {
    width: 110,
    marginRight: 10,
    color: "#666",
    textTransform: "capitalize",
  },
  value: {
    // fontWeight: "bold",
    flex: 1,
  },
});
