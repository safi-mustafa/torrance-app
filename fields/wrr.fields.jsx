export const wrrFields = [
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
    name: "location",
    inputType: "select",
    options: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
    ],
    placeholder: "Select Location",
    label: "Location",
  },
  {
    name: "twr_wo",
    placeholder: "Enter TWR",
    label: "TWR - WO#",
    keyboardType: "numeric",
  },
  {
    name: "calibrate_date",
    inputType: "datetime",
    value: new Date(),
    label: "Scale Calibration Date",
    placeholder: "Select Date",
  },
  {
    name: "weldingRod",
    inputType: "select",
    options: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
    ],
    placeholder: "Select Rod",
    label: "Welding Rod Type",
  },
  {
    name: "weldingMethod",
    inputType: "select",
    options: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
    ],
    placeholder: "Select Method",
    label: "Welding Method",
  },
  {
    name: "controlUsed",
    inputType: "select",
    options: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
    ],
    placeholder: "Select Control",
    label: "HEPA Fume Control Used?",
  },
  {
    name: "checkout_date",
    inputType: "datetime",
    value: new Date(),
    label: "Checkout Date",
    placeholder: "Enter Date",
  },
  {
    name: "rod_checkout",
    placeholder: "Enter Rod Checkout",
    label: "Rod Checked Out (lbs)",
    // keyboardType: "numeric",
  }
];
