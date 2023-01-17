import { Image, TouchableOpacity } from "react-native";

import appStyles from "../app-styles";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Text, View } from "./Themed";

export function DashButton({
  title = "",
  subtitle = "",
  style = {},
  icon = "",
  ...otherProps
}: any) {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: Colors[colorScheme].background,
        padding: 15,
        borderRadius: 6,
        width: "100%",
        ...style,
      }}
      {...otherProps}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {icon && <Image style={{height: 70, width: 70, marginRight: 20}} source={icon} />}
        <View>
          <Text style={{ color: "#ccc" }}>Quick Submit</Text>
          <Text style={[appStyles.h5, appStyles.fw500, appStyles.my1]}>
            {title}
          </Text>
          <Text style={{ color: "#999" }}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
