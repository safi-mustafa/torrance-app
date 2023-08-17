import { Text } from "react-native";
import { DateTimePicker } from "../DateTimePicker";
import Buttonx from "./Buttonx";
import Input from "./Input";
import SelectInput from "./SelectInput";
import SwitchInput from "./SwitchInput";
// import TableInput from "./TableInput";
import TextArea from "./TextArea";
import RadioButton from "./RadioButton";
import Checkbox from "./Checkbox";
import MultiGroupFields from "../MultiGroupFields";
import UploadAttachment from "./UploadAttachment";

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
  upload: <UploadAttachment />,
};
export const getInputType = ({ inputType }) => {
  const output = inputTypes[inputType] ? inputTypes[inputType] : <Input />;
  return output;
};
