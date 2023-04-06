import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome } from "@expo/vector-icons";
import { Button, Text, View } from "react-native";
import { DATE_TIME_MODE } from "../constants/Misc";

export function DateTimePicker(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const mode = props?.mode ? props?.mode : DATE_TIME_MODE.DATE;

  const formatDate = date => {
    return (
      (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
    );
  };

  const getFormatedDate = (date = new Date()) => {
    return mode == DATE_TIME_MODE.DATE
      ? formatDate(new Date(date)) //new Date(date).toISOString().substring(0, 10)
      : new Date(date).toLocaleTimeString().substring(0, 5);
  };
  const formatedDate = props.value ? getFormatedDate(props.value) : null;
  const [selectedDate, setSelectedDate] = useState(formatedDate);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setSelectedDate(getFormatedDate(date));
    props.setFieldValue(props.name, getFormatedDate(date));
    hideDatePicker();
  };
  return (
    <View>
      <View flexDirection="row" alignItems="center">
        <FontAwesome
          name={mode == DATE_TIME_MODE.TIME ? "clock-o" : "calendar-o"}
          // size="18"
          color={"#333"}
          style={{ marginHorizontal: 4 }}
        />
        <Button
          onPress={() => showDatePicker()}
          width="160"
          title={`Select ${mode}`}
        />
        <Text style={{ marginLeft: 4 }}>{selectedDate}</Text>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        {...props}
      />
    </View>
  );
}
