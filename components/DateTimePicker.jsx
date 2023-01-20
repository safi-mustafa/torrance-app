import React, { useState } from "react";
// import { Icon } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome } from "@expo/vector-icons";
import { Button, Text, View } from "react-native";

export function DateTimePicker(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const getFormatedDate = (date) => {
    if (!date) return;
    return new Date(date).toISOString().substring(0, 10);
  };

  const formatedDate = getFormatedDate(props.value);
  const [selectedDate, setSelectedDate] = useState(formatedDate);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.log("A date has been picked: ", date);
    setSelectedDate(getFormatedDate(date));
    props.setFieldValue(props.name, getFormatedDate(date));
    hideDatePicker();
  };
  return (
    <View>
      <View flexDirection="row" alignItems="center">
        <Button
          onPress={() => showDatePicker()}
          variant="outline"
          leftIcon={<FontAwesome name="calendar-o" size="md"/>}
          width="160"
          size="sm"
          padding={2}
          colorScheme="success"
          marginBottom={1}
          title="Select Date"
        />
        <Text style={{marginLeft: 4}}>
          {selectedDate}
        </Text>
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
