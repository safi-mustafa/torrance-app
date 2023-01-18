// import Colors from "../Colors";
// import { ContraceptiveFieldValues } from "../values/contraceptive.values";
// import { NewOldFieldValues } from "../values/newold.values";

export const totFields = [
  {
    name: "department",
    inputType: "select",
    options: [
      { value: 1, label: "Department 1" },
      { value: 2, label: "Department 2" },
    ],
    placeholder: "Select Department",
    label: "Department",
  },
  {
    name: "startOfWork",
    inputType: "select",
    options: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
    ],
    placeholder: "Select Work",
    label: "Start of Work",
  },
  {
    name: "permittingIssue",
    inputType: "select",
    options: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
    ],
    placeholder: "Select Issue",
    label: "Permitting Issue",
  },
  {
    name: "shiftDelays",
    inputType: "select",
    options: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
    ],
    placeholder: "Select Delay",
    label: "Shift Delays",
  },
  {
    name: "reworkDelays",
    inputType: "select",
    options: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
    ],
    placeholder: "Select Delay",
    label: "Rework Delays",
  },
  {
    name: "comment",
    placeholder: "Enter Comments",
    label: "Comments",
    inputType: "textarea",
  },
  {
    name: "shift",
    inputType: "select",
    options: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
    ],
    placeholder: "Select Shift",
    label: "Shift",
  },
  {
    name: "unit",
    inputType: "select",
    options: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
    ],
    placeholder: "Select Unit",
    label: "Unit",
  },
  {
    name: "description",
    placeholder: "Enter Descriptions",
    label: "Descriptions",
    inputType: "textarea",
  },
  {
    name: "equipment",
    placeholder: "Equipment#",
    label: "Equipment",
    keyboardType: "numeric",
  },
  {
    name: "twr_wo",
    placeholder: "Enter TWR",
    label: "TWR - WO#",
    keyboardType: "numeric",
  },
  {
    name: "permit_type",
    inputType: "select",
    options: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
    ],
    placeholder: "Select Permit Type",
    label: "Permit Type",
  },
  {
    name: "company",
    inputType: "select",
    options: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
    ],
    placeholder: "Select Company",
    label: "Company",
  },
  {
    name: "forman",
    placeholder: "Enter Forman Name",
    label: "Forman",
  },
  {
    name: "time_requested",
    inputType: "datetime",
    value: new Date(),
    label: "Time Requested",
    placeholder: "Time Requested",
  },
  {
    name: "time_signed",
    inputType: "datetime",
    value: new Date(),
    label: "Time Signed",
    placeholder: "Time Signed",
  },
  {
    name: "hour_delayed",
    placeholder: "Enter Hours",
    label: "Hour(s) Delayed",
    keyboardType: "numeric",
  },
  {
    name: "manpower",
    placeholder: "Enter Man Power",
    label: "Man Power",
  },
];
