import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import { Platform, View } from "react-native";

import appStyles from "../../app-styles";
import getData from "../../api-services/getData";
import Dropdown from "./Dropdown";

export default function SelectInput(props) {
  const {
    errors,
    options = [],
    setFieldValue,
    name,
    url = "",
    valueAttribute = "id",
    labelAttributes = "name",
    placeholder = "Select",
    value,
    isEnum = false,
    ...otherProps
  } = props;
  const defaultValue = isEnum ? { id: value, [labelAttributes]: value } : value;
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
        //   url,
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
          url,
          error
        );
      }
    );
  };

  const onValChange = (value, index) => {
    let fieldValue = value;
    // if (!isEnum) {
      fieldValue = {
        id: value ? value : 0,
        name: filteredList[index - 1]?.label,
      };
    // }
    setFieldValue(name, fieldValue);
  };

  const onValChangeAndroid = (item) => {
    if (item) {
      const { label, value } = item;
      let fieldValue = value;
      if (!isEnum) {
        fieldValue = {
          id: value ? value : 0,
          name: label,
        };
      }
      setFieldValue(name, fieldValue);
    }
  };

  return (
    <View>
      {Platform.OS == "android" ? (
        <Dropdown
          label={placeholder}
          data={filteredList}
          initialValue={defaultValue?{label:defaultValue[labelAttributes], value:defaultValue[valueAttribute]}:undefined}
          onSelect={(value) => onValChangeAndroid(value)}
        />
      ) : (
        <>
          <RNPickerSelect
            useNativeAndroidPickerStyle={true}
            onValueChange={(value, index) => onValChange(value, index)}
            items={filteredList}
            itemKey="value"
            value={defaultValue?.id}
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
        </>
      )}
    </View>
  );
}
