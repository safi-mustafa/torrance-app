import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import DropDownPicker from "react-native-dropdown-picker";
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";
import appStyles from "../../app-styles";
// import getData from "../../services/getData";

export default function SelectInput({
  errors,
  options = [],
  setFieldValue,
  name,
  url = "",
  valueAttribute = "id",
  labelAttributes = "name",
  placeholder = "Select",
  ...otherProps
}) {
  console.log("🚀 ~ file: SelectInput.tsx ~ line 16 ~ otherProps", otherProps);
  // const [option, setOption] = useState(
  //   otherProps?.value ? parseInt(otherProps.value) : otherProps?.value
  // );
  const [filteredList, setFilteredList] = useState(options);

  useEffect(() => {
    if (url) getLookups(url);
    return () => {};
  }, [url]);

  const getLookups = (url) => {
    // getData(url).then(
    //   ({ data }) => {
    //     if (data && Array.isArray(data)) {
    //       let compiledData = data.map((item) => ({
    //         label: item[labelAttributes],
    //         value: item[valueAttribute],
    //       }));
    //       setFilteredList(compiledData);
    //     }
    //   },
    //   (error) => {
    //     console.log(
    //       "🚀 ~ file: SelectInput.tsx ~ line 46 ~ getData ~ error",
    //       error
    //     );
    //   }
    // );
  };

  const onValChange = (value) => {
    // setOption(value);
    setFieldValue(name, value);
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [zIndexValue, setZIndexValue] = useState(0);
  // DropDownPicker.setMode("BADGE");
const zIndex = new Date().getTime()/1000000000;
  return (
    <View>
      <DropDownPicker
        showBadgeDot={true}
        open={open}
        items={filteredList}
        setOpen={setOpen}
        setValue={setValue}
        setItems={(value) => console.log(value)}
        onSelectItem={({ value }) => onValChange(value)}
        style={appStyles.input}
        {...otherProps}
      />
      {/* <RNPickerSelect
      useNativeAndroidPickerStyle={true}
        onValueChange={(value) => onValChange(value)}
        items={filteredList}
        itemKey="value"
        style={{
          inputIOS: {
            color: "#333",
            backgroundColor: "#fff",
            minHeight: 20,
            ...appStyles.input,
          },
          placeholder: {
            color: "#999",
          },
          inputAndroid: {
            color: "#333",
            minHeight: 20,
            ...appStyles.input,
          },
        }}
        {...otherProps}
        placeholder={{
          label: placeholder,
          value: null,
        }}
      /> */}
    </View>
  );
}
