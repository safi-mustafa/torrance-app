import { Text } from "react-native";
import { DateTimePicker } from "../DateTimePicker";
import Buttonx from "./Buttonx";
import Input from "./Input";
import SelectInput from "./SelectInput";
import SwitchInput from "./SwitchInput";
import TextArea from "./TextArea";
import RadioButton from "./RadioButton";
import Checkbox from "./Checkbox";
import MultiGroupFields from "../MultiGroupFields";
import ImageInput from "./ImageInput";
import FileInput from "./FileInput";

export const inputTypes = {
  text: <Input />,
  p: <Text></Text>,
  heading: <Text></Text>,
  datetime: <DateTimePicker />,
  switch: <SwitchInput />,
  button: <Buttonx />,
  select: <SelectInput />,
  textarea: <TextArea />,
  radio: <RadioButton />,
  checkbox: <Checkbox />,
  multiGroupFields: <MultiGroupFields />,
  image: <ImageInput />,
  file: <FileInput />,
};

export const getInputType = ({ inputType }) => {
  const output = inputTypes[inputType] ? inputTypes[inputType] : <Input />;
  return output;
};
