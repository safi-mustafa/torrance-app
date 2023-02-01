import { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import getData from "../api-services/getData";
import appStyles from "../app-styles";
import Loader from "../components/Loader";
import { getFormatedDate } from "../utility";

export default function SingleSubmissionScreen({
  navigation,
  route,
  ...otherProps
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { id, apiUrl } = route.params;

  const isTOT = apiUrl == "/TOTLog";

  useEffect(() => {
    if (id) getSubmissionData(id);

    return () => {};
  }, [id]);

  const getSubmissionData = (id = "") => {
    setLoading(true);
    getData(
      { url: `${apiUrl}/${id}` },
      (response) => {
        setLoading(false);
        setData(response?.data);
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
      <Loader show={loading} size="large" overlay="true" color="white" />
      <ScrollView>
        {/* <ListRow label="Id" value={data?.id} />
        <ListRow label="Active Status" value={data?.activeStatus} /> */}
        <ListRow label="Date" value={getFormatedDate(data?.date)} />
        <ListRow label="contractor" value={data?.contractor?.name} />
        <ListRow label="approver" value={data?.approver?.name} />
        <ListRow label="department" value={data?.department?.name} />
        <ListRow label="employee" value={data?.employee?.name} />
        {!isTOT && (
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
        <ListRow label="TWR No#" value={data?.twr} />
        <ListRow label="Status" value={data?.status} />
        <ListRow label="unit" value={data?.unit?.name} />
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
    padding: 20,
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
  values: {
    // fontWeight: "bold",
  },
});
