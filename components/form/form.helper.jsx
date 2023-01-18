import { TextInput, Text, Button } from "react-native";
import { DateTimePicker } from "../DateTimePicker";
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
  button: <Button />,
  select: <SelectInput />,
  textarea: <TextArea />,
};
export const getInputType = ({ inputType }) => {
  const output = inputTypes[inputType] ? inputTypes[inputType] : <Input />;
  return output;
};
