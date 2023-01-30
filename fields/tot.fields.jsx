export const totFields = [
  {
    name: "department",
    inputType: "select",
    url: "/Department",
    placeholder: "Select Department",
    label: "Department",
    zIndex: 3000,
    zIndexInverse: 1000,
  },
  {
    name: "startOfWork",
    inputType: "datetime",
    // value: new Date(),
    placeholder: "Select Work",
    label: "Start of Work",
  },
  // {
  //   name: "permittingIssue",
  //   inputType: "select",
  //   options: [
  //     { value: 1, label: "Option 1" },
  //     { value: 2, label: "Option 2" },
  //   ],
  //   placeholder: "Select Issue",
  //   label: "Permitting Issue",
  //   zIndex: 1000,
  //   // zIndexInverse: 1000,
  // },
  {
    name: "contractor",
    inputType: "select",
    url: "/Contractor",
    placeholder: "Select Contractor",
    label: "Contractor",
    zIndex: 3000,
    zIndexInverse: 1000,
  },
  {
    name: "shiftDelay",
    inputType: "select",
    url: "/ShiftDelay",
    placeholder: "Select Delay",
    label: "Shift Delays",
    zIndex: 999,
  },
  {
    name: "reworkDelay",
    inputType: "select",
    url: "/ReworkDelay",
    placeholder: "Select Delay",
    label: "Rework Delays",
    zIndex: 998,
  },
  {
    name: "delayReason",
    placeholder: "Enter Delay Reason",
    label: "Delay Reason",
    inputType: "textarea",
  },
  {
    name: "shift",
    inputType: "select",
    url: "/Shift",
    placeholder: "Select Shift",
    label: "Shift",
    zIndex: 997,
  },
  {
    name: "unit",
    inputType: "select",
    url: "/Unit",
    placeholder: "Select Unit",
    label: "Unit",
    zIndex: 996,
  },
  {
    name: "jobDescription",
    placeholder: "Enter Descriptions",
    label: "Descriptions",
    inputType: "textarea",
  },
  {
    name: "equipmentNo",
    placeholder: "Equipment#",
    label: "Equipment",
    keyboardType: "numeric",
  },
  {
    name: "twr",
    placeholder: "Enter TWR",
    label: "TWR - WO#",
    keyboardType: "numeric",
  },
  {
    name: "permitType",
    inputType: "select",
    url: "/PermitType",
    placeholder: "Select Permit Type",
    label: "Permit Type",
    zIndex: 995,
  },
  // {
  //   name: "company",
  //   inputType: "select",
  //   options: [
  //     { value: 1, label: "Option 1" },
  //     { value: 2, label: "Option 2" },
  //   ],
  //   placeholder: "Select Company",
  //   label: "Company",
  //   zIndex: 994,
  // },
  // {
  //   name: "timeRequested",
  //   inputType: "datetime",
  //   label: "Time Requested",
  //   placeholder: "Time Requested",
  //   value: new Date(),
  //   mode:"time"
  // },
  // {
  //   name: "timeSigned",
  //   inputType: "datetime",
  //   label: "Time Signed",
  //   placeholder: "Time Signed",
  //   value: new Date(),
  //   mode:"time"
  // },
  {
    name: "hoursDelayed",
    placeholder: "Enter Hours",
    label: "Hour(s) Delayed",
    keyboardType: "numeric",
  },
  {
    name: "manPower",
    placeholder: "Enter Man Power",
    label: "Man Power",
  },
  {
    name: "manPowerAffected",
    placeholder: "Enter Affected Number",
    label: "Number of Man Power Affected",
  },
  {
    name: "manHours",
    placeholder: "Enter Man Hours",
    label: "Man Hours",
  },
  {
    name: "permittingIssue",
    inputType: "select",
    url: "/PermittingIssue",
    placeholder: "Select Issue",
    label: "Permitting Issue",
    zIndex: 993,
  }, 
  {
    name: "foreman",
    inputType: "select",
    url: "/Account/getAllUsers?role=foreman",
    placeholder: "Select Foreman",
    labelAttributes: "userName",
    label: "Foreman",
    zIndex: 993,
  }, 
  // {
  //   name: "approver",
  //   inputType: "select",
  //   url: "/Account/getAllUsers",
  //   placeholder: "Select Approver",
  //   labelAttributes: "userName",
  //   label: "Approver",
  //   zIndex: 993,
  // }, 
];
