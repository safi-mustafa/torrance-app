import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { AntDesign } from "@expo/vector-icons";

import getData from "../api-services/getData";
import putData from "../api-services/putData";
import appStyles from "../app-styles";
import Loader from "../components/Loader";
import Buttonx from "../components/form/Buttonx";
import { getFormatedDate } from "../utility";
import { primaryColor } from "../constants/Colors";
import { HOST_URL, STATUS, USER_ROLE } from "../constants/Misc";
import useUserMeta from "../hooks/useUserMeta";
import TextArea from "../components/form/TextArea";
import Layout from "../constants/Layout";
import Picture from "../components/Picture";

export default function SingleSubmissionScreen({
  navigation,
  route,
  ...otherProps
}) {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, data: "" });
  const [data, setData] = useState({});
  const { id, apiUrl, isApproval = false, ...otherRouteItems } = route.params;
  const { role = "", userMeta } = useUserMeta();
  const [fcoComment, setFcoComment] = useState("");

  const isManager = USER_ROLE.COMPANY_MANAGER == role;
  const isApprover = USER_ROLE.APPROVER == role;

  const isWRR = apiUrl == "/WRRLog";
  const isTOT = apiUrl == "/TOTLog";
  const isOverRide = apiUrl == "/OverrideLog";
  const isFCO = apiUrl == "/FCOLog";

  const getNavUrl = () => {
    if (isTOT) return "TotRequest";
    else if (isOverRide) return "OverrideRequest";
    else if (isWRR) return "WrrRequest";
    else if (isFCO) return "FcoLog";
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
        console.log(
          "🚀 ~ file: SingleSubmissionScreen.jsx:81 ~ getSubmissionData ~ error?.status:",
          error?.status
        );
        if (error?.status == "404") {
          navigation.goBack();
        }
      }
    );
  };

  const onAction = () => {
    navigation.goBack();
    navigation.navigate(NavUrl, { ...data });
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

  const onFCOStatusUpdate = (status, approverType = "BusinessTeamLeader") => {
    setLoading(true);
    const obj = {
      id,
      status,
      approverType,
      comment: fcoComment ? fcoComment : "-",
      approverId: userMeta?.id,
    };
    const params = new URLSearchParams(obj).toString();
    putData(
      {
        url: `${apiUrl}/Approve`,
        params: obj,
      },
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
      {isApproval && data?.canProcess && !isFCO && (
        <>
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
        </>
      )}
    </>
  );

  
  // const [isImgLoading, setIsImgLoading] = useState(true);
  const ListRow = ({ label = "", value = "", type = null }) => {
    let isImgLoading = true;
    const rowValue =
      type == "image" && value ? (
        <View style={{position: "relative"}}>
          {isImgLoading && (
            <ActivityIndicator
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              size="large"
            />
          )}
          <TouchableOpacity
            onPress={() => setModal({ show: true, data: value })}
          >
            <Image
              source={{ uri: HOST_URL + value }}
              style={{
                width: 100,
                height: 100,
                borderWidth: 1,
                borderColor: "#ccc",
              }}
              resizeMode="contain"
              onLoad={() => {isImgLoading = false;}}
            />
          </TouchableOpacity>
        </View>
      ) : (
        value
      );
    return (
      <View style={[appStyles.my1, styles.section]}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{rowValue}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Loader show={loading} size="large" overlay="true" />
      {modal?.show && (
        <View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <TouchableOpacity onPress={() => setModal({ show: false, data: "" })}>
            <AntDesign
              name="closecircleo"
              size={24}
              color="white"
              style={{
                alignSelf: "flex-end",
                marginRight: 15,
                marginTop: 15,
                zIndex: 999,
                elevation: 9,
              }}
            />
          </TouchableOpacity>
          <Image
            onPress={() => setModal({ show: false, data: "" })}
            source={{ uri: HOST_URL + modal?.data }}
            style={{
              alignItems: "center",
              alignSelf: "center",
              marginTop: 10,
              width: Layout.window.width - 20,
              height: Layout.window.height - 150,
              borderWidth: 1,
              borderColor: "#ccc",
            }}
            resizeMode="contain"
          />
        </View>
      )}

      {data?.canUpdate && !isApproval && <Action />}
      <ScrollView style={{ paddingHorizontal: 20, marginTop: 10 }}>
        <ListRow label="company" value={data?.company?.name} />
        <ListRow label="Submitted" value={data?.formattedCreatedOn} />
        <ListRow
          label="approver"
          value={data?.approver?.name || data?.possibleApprovers}
        />

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

            <ListRow label="delay Type" value={data?.delayType?.name} />
            {/* <ListRow label="delay type" value={data?.formattedDelayReason} /> */}
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
                    <Text style={[styles.td, styles.head, styles.smTd]}>
                      ST
                    </Text>
                    <Text style={[styles.td, styles.head, styles.smTd]}>
                      OT
                    </Text>
                    <Text style={[styles.td, styles.head, styles.smTd]}>
                      DT
                    </Text>
                    {/* <Text style={[styles.td, styles.head]}>Hours</Text> */}
                    <Text style={[styles.td, styles.head]}>Craft Skill</Text>
                    <Text style={[styles.td, styles.head]}>Head Count</Text>
                  </View>
                  {data?.costs &&
                    data?.costs.map((item) => (
                      <>
                        <View style={styles.tr}>
                          <Text style={[styles.td, styles.smTd]}>
                            {item?.stHours}
                          </Text>
                          <Text style={[styles.td, styles.smTd]}>
                            {item?.otHours}
                          </Text>
                          <Text style={[styles.td, styles.smTd]}>
                            {item?.dtHours}
                          </Text>
                          {/* <Text style={styles.td}>{item?.overrideHours}</Text> */}
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
            <ListRow label="Employee Names" value={data?.employeeNames} />
            <ListRow
              label="Uploaded Form"
              value={data?.clippedEmployeesUrl}
              type="image"
            />
            {/* <ListRow label="description" value={data?.description} /> */}
          </>
        )}

        {isFCO && (
          <>
            <ListRow label="SrNo" value={data?.srNoFormatted} />
            <ListRow label="Contingency" value={data?.contingency} />
            <ListRow label="Location" value={data?.location} />
            <ListRow label="Equipment Name" value={data?.equipmentName} />
            <ListRow label="Equipment Number" value={data?.equipmentNumber} />
            <ListRow label="Equipment Rate" value={data?.equipmentRate} />
            <ListRow label="Material Name" value={data?.materialName} />
            <ListRow label="Material Number" value={data?.materialRate} />
            <ListRow label="Shop Name" value={data?.shopName} />
            <ListRow label="Shop Number" value={data?.shopRate} />
            <ListRow label="fcoReason" value={data?.fcoReason?.name} />
            <ListRow label="FCO Reason" value={data?.fcoReason?.name} />
            <ListRow label="FCO Type" value={data?.fcoType?.name} />
            <ListRow label="Sub Total" value={data?.subTotal} />
            <ListRow label="Total" value={data?.total} />
            <ListRow label="Total Cost" value={data?.totalCostFormatted} />
            <ListRow label="totalEquipment" value={data?.totalEquipment} />
            <ListRow label="Total Labor" value={data?.totalLabor} />
            <ListRow label="Total Material" value={data?.totalMaterial} />
            <ListRow label="Total Shop" value={data?.totalShop} />
            <ListRow
              label="Photo"
              value={data?.photo?.previewImgUrl}
              type="image"
            />
            <ListRow
              label="File"
              value={data?.file?.previewImgUrl}
              type="image"
            />
            <ListRow
              label="Comments"
              value={
                data?.fcoComments &&
                data?.fcoComments?.map(({ comment }) => comment).join(", ")
              }
            />
          </>
        )}
      </ScrollView>

      <ApprovalSection />
      {isApproval && isFCO && (
        <View
          style={{
            marginHorizontal: 20,
            paddingTop: 10,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Text style={{ marginBottom: 5 }}>Comment</Text>
          <TextArea
            name="comment"
            value={fcoComment}
            setFieldValue={(name, value) => setFcoComment(value)}
            placeholder="Comment"
            // multiline={true}
            style={{ marginBottom: 10, minHeight: 60 }}
          />
          <Buttonx
            disabled={data?.areaExecutionLead}
            onPress={() =>
              onFCOStatusUpdate(STATUS.APPROVED, "AreaExecutionLead")
            }
            style={{
              ...styles.approveButtons,
              backgroundColor: "limegreen",
              marginLeft: 5,
              width: "48%",
              opacity: data?.areaExecutionLead ? 0.7 : 1,
            }}
            title={
              <>
                <Text style={{ color: "white" }}>Area Execustion Lead</Text>
              </>
            }
          />
          <Buttonx
            disabled={data?.businessTeamLeader}
            onPress={() =>
              onFCOStatusUpdate(STATUS.APPROVED, "BusinessTeamLeader")
            }
            style={{
              ...styles.approveButtons,
              backgroundColor: "green",
              marginLeft: 5,
              width: "48%",
              opacity: data?.businessTeamLeader ? 0.7 : 1,
            }}
            title={
              <>
                <Text style={{ color: "white" }}>Business Team Leader</Text>
              </>
            }
          />
          <Buttonx
            onPress={() => onFCOStatusUpdate(STATUS.REJECTED)}
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
    </View>
  );
}

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
    width: "100%",
    justifyContent: "space-between",
  },
  td: {
    fontSize: 12,
    textAlign: "center",
    width: "24%",
    padding: 3,
  },
  smTd: {
    width: "12%",
  },
  head: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 11,
    width: "24%",
  },
});
