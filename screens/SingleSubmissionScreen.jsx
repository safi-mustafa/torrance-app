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
import putData from "../api-services/putData";
import deleteData from "../api-services/deleteData";
import appStyles from "../app-styles";
import Loader from "../components/Loader";
import Buttonx from "../components/form/Buttonx";
import { getFormatedDate } from "../utility";
import { primaryColor } from "../constants/Colors";
import { STATUS, USER_ROLE } from "../constants/Misc";
import useUserMeta from "../hooks/useUserMeta";

export default function SingleSubmissionScreen({
  navigation,
  route,
  ...otherProps
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { id, apiUrl, isApproval = false, ...otherRouteItems } = route.params;
  const { role = "" } = useUserMeta();
  const isManager = USER_ROLE.COMPANY_MANAGER == role;
  const isApprover = USER_ROLE.APPROVER == role;

  const isWRR = apiUrl == "/WRRLog";
  // const isApproval = apiUrl == "/Approval";
  const isTOT = apiUrl == "/TOTLog";
  const isOverRide = apiUrl == "/OverrideLog";

  const getNavUrl = () => {
    if (isTOT) return "TotRequest";
    else if (isOverRide) return "OverrideRequest";
    else if (isWRR) return "WrrRequest";
    // else return "/Approval"
  };
  let NavUrl = getNavUrl();

  useEffect(() => {
    if (id) getSubmissionData(id);
    // if (isOverRide) setData({ ...otherRouteItems });
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
          error
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
    <View style={{ margin: 10, flexDirection: "row", alignSelf: "flex-end" }}>
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
      {/* <Pressable
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
      </Pressable> */}
    </View>
  );

  const onApproveUpdate = (status) => {
    setLoading(true);
    putData(
      { url: `${apiUrl}/${id}/${status}` },
      (response) => {
        setLoading(false);
        console.log(
          "🚀 ~ file: SingleSubmissionScreen.jsx ~ line 33 ~ getSubmissionData ~ response?.data",
          response?.data
        );
        Toast.show({
          type: STATUS.APPROVED == status ? "success" : "info",
          text1: `${status}`,
          text2: `${status} successfully`,
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

  const ApprovalSection = () => (
    <>
      {isApproval && data?.status == STATUS.PENDING && (
        <View style={styles.approvalWrapper}>
          <Buttonx
            onPress={() => onApproveUpdate(STATUS.APPROVED)}
            style={{
              ...styles.approveButtons,
              backgroundColor: "green",
              marginRight: 5,
            }}
            title={
              <>
                <Text style={{ color: "white" }}>Approve</Text>
                {/* <FontAwesome name="check-circle-o" size={28} color={"green"} /> */}
              </>
            }
          />
          <Buttonx
            onPress={() => onApproveUpdate(STATUS.REJECTED)}
            style={{
              ...styles.approveButtons,
              backgroundColor: "red",
              marginLeft: 5,
            }}
            title={
              <>
                {/* <FontAwesome name="close" size={28} color={"red"} /> */}
                <Text style={{ color: "white" }}>Reject</Text>
              </>
            }
          />
        </View>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <Loader show={loading} size="large" overlay="true" color="white" />
      {data?.status == STATUS.PENDING &&
        !isApproval &&
        !isManager &&
        !isApprover && <Action />}
      <ScrollView style={{ paddingHorizontal: 20, marginTop: 10 }}>
        <ListRow label="company" value={data?.company?.name} />
        <ListRow label="Submitted" value={data?.formattedCreatedOn} />
        <ListRow label="approver" value={data?.approver?.name} />

        {isApprover && (
          <>
            {data?.employee?.name && (
              <ListRow label="requester" value={data?.employee?.name} />
            )}
          </>
        )}

        {data?.requester && (
          <ListRow label="requester" value={data?.requester} />
        )}
        <ListRow label="Status" value={data?.status} />
        <ListRow label="Department" value={data?.department?.name} />
        <ListRow label="unit" value={data?.unit?.name} />

        {!isOverRide && (
          <>
            {/* <ListRow label="requester" value={data?.employee?.name} /> */}
            <ListRow label="TWR No#" value={data?.twr} />
          </>
        )}

        {isWRR ? (
          <>
            <ListRow label="weld Method" value={data?.weldMethod?.name} />
            {/* <ListRow label="email" value={data?.email} /> */}
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
          </>
        ) : null}

        {isTOT && (
          <>
            {/* <ListRow label="Equipment No#" value={data?.equipmentNo} /> */}
            <ListRow label="shift" value={data?.shift?.name} />
            <ListRow label="permit#" value={data?.permitNo} />
            <ListRow label="permit Type" value={data?.permitType?.name} />
            <ListRow label="Job description" value={data?.jobDescription} />
            <ListRow
              label="Foreman"
              value={data?.foreman?.name ? data?.foreman?.name : data?.foreman}
            />
            {/* <ListRow
              label="Start Date"
              value={getFormatedDate(data?.formattedStartOfWork)}
            /> */}

            {/* <ListRow label="delay Type" value={data?.delayType?.name} /> */}
            <ListRow label="delay type" value={data?.formattedDelayReason} />
            {data?.startOfWorkDelay && (
              <ListRow
                label="start Of Work Delay"
                value={data?.startOfWorkDelay?.name}
              />
            )}
            {data?.shiftDelay && (
              <ListRow label="shift delay" value={data?.shiftDelay?.name} />
            )}
            {data?.reworkDelay && (
              <ListRow label="rework delay" value={data?.reworkDelay?.name} />
            )}
            <ListRow label="Headcount" value={data?.manPowerAffected} />
            <ListRow label="Hours" value={data?.manHours} />
            <ListRow label="Total Hours" value={data?.totalHours} />
            {/* <ListRow
              label="request reason"
              value={data?.reasonForRequest?.name}
            /> */}

            {/* <ListRow label="work Scope" value={data?.workScope} /> */}
            <ListRow label="delay description" value={data?.delayDescription} />
          </>
        )}
        {isOverRide && (
          <>
            <ListRow label="override reason" value={data?.reason} />

            {/* {data?.delayReason && (
              <ListRow label="delay reason" value={data?.delayReason} />
            )}
            {data?.startOfWorkDelay && (
              <ListRow
                label="start Of Work Delay"
                value={data?.startOfWorkDelay?.name}
              />
            )}
            {data?.shiftDelay && (
              <ListRow label="shift delay" value={data?.shiftDelay?.name} />
            )}
            {data?.reworkDelay && (
              <ListRow label="rework delay" value={data?.reworkDelay?.name} />
            )} */}
            <ListRow
              label="Costs"
              value={
                <>
                  <View style={styles.tr}>
                    <Text style={[styles.td, styles.head]}>Type</Text>
                    <Text style={[styles.td, styles.head]}>Hours</Text>
                    <Text style={[styles.td, styles.head]}>Craft Skill</Text>
                    <Text style={[styles.td, styles.head]}>Head Count</Text>
                  </View>
                  {data?.costs &&
                    data?.costs.map((item) => (
                      <>
                        <View style={styles.tr}>
                          <Text style={styles.td}>{item?.overrideType}</Text>
                          <Text style={styles.td}>{item?.overrideHours}</Text>
                          <Text style={styles.td}>
                            {item?.craftSkill?.name}
                          </Text>
                          <Text style={styles.td}>{item?.headCount}</Text>
                        </View>
                      </>
                    ))}
                </>
              }
            />
            {/* <ListRow label="override Type" value={data?.overrideType?.name} />
            <ListRow label="Hours" value={data?.overrideHours} />
            <ListRow label="craft Skill" value={data?.craftSkill?.name} /> */}
            {/* <ListRow label="requester" value={data?.employee?.name} /> */}
            {/* <ListRow label="requester Email" value={data?.requesterEmail} /> */}
            {/* <ListRow label="craft Rate" value={data?.craftRate?.name} /> */}
            <ListRow
              label="Work Date"
              value={data?.formattedDateOfWorkCompleted}
            />
            <ListRow label="po Number#" value={data?.poNumber} />
            {/* <ListRow
              label="reason For Request"
              value={data?.reasonForRequest?.name}
            /> */}
            <ListRow label="shift" value={data?.shift?.name} />
            <ListRow label="work Scope" value={data?.workScope} />
            {/* <ListRow label="description" value={data?.description} /> */}
          </>
        )}
      </ScrollView>
      <ApprovalSection />
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
  approvalWrapper: {
    // position: "absolute",
    // bottom: 10,
    // right: 10,
    // backgroundColor: "rgba(0,0,0,0.1)",
    padding: 10,
    borderRadius: 6,
    flexDirection: "row",
    // width: 50,
  },
  approveButtons: {
    width: "48%",
    // backgroundColor: "transparent",
    borderWidth: 0,
    // padding: 0,
    marginVertical: 5,
    // flexDirection: "row",
  },
  tr: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  td: {
    fontSize: 12,
    textAlign: "center",
    width: "25%",
  },
  head: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 12,
  },
});
