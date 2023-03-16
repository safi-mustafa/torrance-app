import React, { useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

const Dropdown = ({
  label,
  data,
  onSelect,
  initialValue = undefined,
}) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(initialValue);
  const [dropdownTop, setDropdownTop] = useState(0);
  const listData = [{ label: label, value: null }, ...data];
//   console.log("🚀 ~ file: Dropdown.jsx:24 ~ listData:", listData)

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const onItemPress = (item) => {
    if (!item?.disabled) {
      setSelected(item);
      onSelect(item);
    }
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text style={item?.disabled ? { color: "#999" } : {}}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent useNativeDriver={true}>
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, { top: dropdownTop }]}>
            <ScrollView style={{ maxHeight: 400 }}>
              <FlatList
                data={listData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={styles.button}
      onPress={() => toggleDropdown()}
    >
      {renderDropdown()}
      <Text style={styles.buttonText} numberOfLines={1}>
        {(!!selected && selected.label) || label}
      </Text>
      <Entypo name="chevron-thin-down" style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    height: 50,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    // textAlign: 'center',
    paddingHorizontal: 7,
    fontSize: 13,
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    borderColor: "#ccc",
    borderRadius: 4,
    borderWidth: 1,
    marginTop: -20,
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default Dropdown;
