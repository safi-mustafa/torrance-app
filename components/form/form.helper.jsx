import { Text, Pressable } from "react-native";
import { DateTimePicker } from "../DateTimePicker";
import Buttonx from "./Buttonx";
import Input from "./Input";
import SelectInput from "./SelectInput";
import SwitchInput from "./SwitchInput";
import TextArea from "./TextArea";

export const inputTypes = {
  text: <Input />,
  p: <Text></Text>,
  heading: <Text></Text>,
  datetime: <DateTimePicker />,
  switch: <SwitchInput />,
  button: <Buttonx />,
  select: <SelectInput />,
  textarea: <TextArea />,
};
export const getInputType = ({ inputType }) => {
  const output = inputTypes[inputType] ? inputTypes[inputType] : <Input />;
  return output;
};
