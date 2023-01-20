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
    zIndex: 3000,
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
    zIndex: 2000,
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
    zIndex: 1000,
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
    zIndex: 999,
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
    zIndex: 998,
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
    zIndex: 997,
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
    zIndex: 996,
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
