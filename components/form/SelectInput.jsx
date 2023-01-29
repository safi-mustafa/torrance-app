import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import DropDownPicker from "react-native-dropdown-picker";
import { Platform, View } from "react-native";
import appStyles from "../../app-styles";
import getData from "../../api-services/getData";

export default function SelectInput({
  errors,
  options = [],
  setFieldValue,
  name,
  url = "",
  valueAttribute = "id",
  labelAttributes = "name",
  placeholder = "Select",
  value,
  ...otherProps
}) {
  // console.log("🚀 ~ file: SelectInput.tsx ~ line 16 ~ otherProps", otherProps);
  // const [option, setOption] = useState(
  //   otherProps?.value ? parseInt(otherProps.value) : otherProps?.value
  // );
  const [filteredList, setFilteredList] = useState(options);

  useEffect(() => {
    if (url) getLookups(url);
    return () => {};
  }, [url]);

  const getLookups = (url) => {
    getData(
      { url },
      (response) => {
        // console.log(
        //   "🚀 ~ file: SelectInput.jsx ~ line 33 ~ getLookups ~ response",
        //   response
        // );
        const data = response?.data?.items;
        // console.log("🚀 ~ file: SelectInput.jsx ~ line 40 ~ getLookups ~ data",name, data)
        if (data && Array.isArray(data)) {
          let compiledData = data.map((item) => ({
            label: item[labelAttributes],
            value: item[valueAttribute],
          }));
          setFilteredList(compiledData);
        }
      },
      (error) => {
        console.log(
          "🚀 ~ file: SelectInput.jsx ~ line 44 ~ getData ~ error",
          error
        );
      }
    );
  };

  const onValChange = (value, index) => {
    // setOption(value);
    console.log("🚀 ~ file: SelectInput.jsx ~ line 61 ~ onValChange ~ filteredList", filteredList, index)
    setFieldValue(name, { id: value, name: filteredList[index-1]?.label });
  }

  const [open, setOpen] = useState(false);
  const [fieldValue, setValue] = useState(null);
  const [zIndexValue, setZIndexValue] = useState(0);
  // DropDownPicker.setMode("BADGE");
  const zIndex = new Date().getTime() / 1000000000;
  return (
    <View>
      {Platform.OS == "android" ? (
        <DropDownPicker
          showBadgeDot={true}
          open={open}
          items={filteredList}
          setOpen={setOpen}
          setValue={setValue}
          // setItems={(value) => console.log(value)}
          onSelectItem={({ value }) => onValChange(value)}
          style={appStyles.input}
          {...otherProps}
        />
      ) : (
        <RNPickerSelect
          useNativeAndroidPickerStyle={true}
          onValueChange={(value, index) => onValChange(value, index)}
          items={filteredList}
          itemKey="value"
          value={value?.id}
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
        />
      )}
    </View>
  );
}
