import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { primaryColor } from '../../constants/Colors';

const Checkbox = ({ options=[], ...props }) => {
  // console.log("🚀 ~ file: Checkbox.jsx:5 ~ Checkbox ~ props:", props)
  const [selectedOptions, setSelectedOptions] = useState([]);

    const onChange = (selectedOptions) => {
        props.setFieldValue(props?.name, selectedOptions);
    }

  const toggleOption = (value) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <View>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.checkboxContainer}
          onPress={() => {
            toggleOption(option.value);
            onChange(selectedOptions);
          }}
        >
          <View
            style={[
              styles.checkbox,
              selectedOptions.includes(option.value) && styles.checkboxSelected,
            ]}
          >
            {selectedOptions.includes(option.value) && <FontAwesome5 name="check" size={14} color={'#fff'} style={{top:1, left: 1}}  />}
          </View>
          <Text>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: primaryColor,
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: primaryColor,
  },
});

export default Checkbox;