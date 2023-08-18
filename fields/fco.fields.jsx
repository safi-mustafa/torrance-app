export const labourFields = [
  {
    name: "overrideType",
    inputType: "select",
    options: [
      {
        value: "ST",
        label: "ST",
      },
      {
        value: "OT",
        label: "OT",
      },
      {
        value: "DT",
        label: "DT",
      },
    ],
    placeholder: "Select Type",
    label: "Type",
    zIndex: 3000,
    required: true,
    wrapperStyle: { width: "48%", marginRight: 1 },
  },
  {
    name: "mn",
    placeholder: "Enter hours",
    label: "MN",
    required: true,
    // inputType: "text",
    keyboardType: "numeric",
    wrapperStyle: { width: "48%", marginRight: 1 },
  },
  {
    name: "du",
    placeholder: "Enter hours",
    label: "DU",
    required: true,
    // inputType: "text",
    keyboardType: "numeric",
    wrapperStyle: { width: "48%", marginRight: 1 },
  },
  {
    name: "craft",
    inputType: "select",
    url: "/CraftSkill?Company.Id=",
    placeholder: "Select Skill",
    label: "Craft Skill",
    required: true,
    zIndex: 3001,
    wrapperStyle: { width: "48%", marginRight: 1 },
  }
];

export const otherCostFields = [
  {
    name: "overrideType",
    inputType: "select",
    options: [
      {
        value: "ST",
        label: "ST",
      },
      {
        value: "OT",
        label: "OT",
      },
      {
        value: "DT",
        label: "DT",
      },
    ],
    placeholder: "Select Type",
    label: "Type",
    zIndex: 3000,
    required: true,
    wrapperStyle: { width: "48%", marginRight: 1 },
  },
  {
    name: "overrideHours",
    placeholder: "Enter hours",
    label: "MN",
    required: true,
    // inputType: "text",
    keyboardType: "numeric",
    wrapperStyle: { width: "48%", marginRight: 1 },
  },
  {
    name: "duHours",
    placeholder: "Enter hours",
    label: "DU",
    required: true,
    // inputType: "text",
    keyboardType: "numeric",
    wrapperStyle: { width: "48%", marginRight: 1 },
  },
  {
    name: "duHours",
    placeholder: "Enter Rate",
    label: "Rate",
    required: true,
    // inputType: "text",
    keyboardType: "numeric",
    wrapperStyle: { width: "48%", marginRight: 1 },
  }
];

export const fcoFields = [
  // {
  //   name: "department",
  //   inputType: "select",
  //   url: "/Department",
  //   placeholder: "Select Department",
  //   label: "Department",
  //   required: true,
  //   zIndex: 1004,
  //   zIndexInverse: 1004,
  // },
  {
    name: "Date",
    inputType: "datetime",
    placeholder: "Select Date",
    label: "Date",
    required: true,
  },
  {
    name: "Unit",
    inputType: "select",
    url: "/Unit",
    placeholder: "Select Unit",
    label: "Unit",
    required: true,
    zIndex: 1003,
  },
  {
    name: "shift",
    inputType: "select",
    url: "/Shift",
    placeholder: "Select Shift",
    label: "Shift",
    required: true,
    zIndex: 1002,
  },
  {
    name: "Location",
    placeholder: "Enter Location",
    label: "Service Location",
    required: true,
    // inputType: "textarea",
  },
  {
    name: "PreTA",
    label: "Pre TA/TA",
    // required: true,
    inputType: "radio",
    options: [
      {
        label: "Pre TA",
        value: "true",
      },
      {
        label: "TA",
        value: "false",
      },
    ],
  },
  {
    name: "ShutdownRequired",
    label: "Shutdown Required",
    inputType: "radio",
    options: [
      {
        label: "Yes",
        value: "true",
      },
      {
        label: "No",
        value: "false",
      },
    ],
  },
  {
    name: "ScaffoldRequired",
    label: "Scafflod Required",
    inputType: "radio",
    options: [
      {
        label: "Yes",
        value: "true",
      },
      {
        label: "No",
        value: "false",
      },
    ],
  },
  {
    name: "Photo",
    label: "Photo",
    inputType: "upload",
    buttonText: "Upload Photo",
    wrapperStyle: { width: "48%", marginRight: 1 },
  },
  {
    name: "EquipmentNumber",
    label: "Loop Identification# & Equipment Number",
    required: true,
  },
  {
    name: "DescriptionOfFinding",
    placeholder: "Enter Description",
    label: "Description of Finding (Attach marked-upP&ID’s or iso/Sketch)",
    inputType: "textarea",
  },
  {
    name: "File",
    label: "File",
    inputType: "upload",
    buttonText: "Upload Photo",
    wrapperStyle: { width: "48%", marginRight: 1 },
  },
  {
    name: "FCOType",
    inputType: "select",
    url: "/FCOType",
    placeholder: "Select Type",
    label: "FCO Type",
    required: true,
    zIndex: 1000,
  },
  {
    name: "FCOReason",
    inputType: "select",
    url: "/FCOReason",
    placeholder: "Select Reason",
    label: "Reason For Change",
    required: true,
    zIndex: 1000,
  },
  {
    name: "documentationRequired",
    label: "Other Documentation Required",
    inputType: "checkbox",
    options: [
      {
        label: "Analysis of alternatives/Mitigation Options (Y/N)",
        value: "0",
      },
      {
        label: "Equipment Failure Report",
        value: "1",
      },
    ],
  },
  {
    name: "Company",
    inputType: "select",
    url: "/Company?DisablePagination=true",
    placeholder: "Select Company",
    label: "Company",
    required: true,
  },
  {
    name: "FCOSections",
    inputType: "multiGroupFields",
    label: "Labour",
    fields: labourFields,
  },
  {
    name: "materialInfo",
    inputType: "p",
    children: "Material",
    style:{fontSize: 18}
  },
  {
    name: "MaterialName",
    placeholder: "Enter Name",
    label: "Name",
    // required: true,
    // inputType: "text",
    wrapperStyle: { width: "48%", marginRight: 8 },
  },
  {
    name: "MaterialRate",
    placeholder: "Enter Amount",
    label: "Amount",
    // required: true,
    keyboardType: "numeric",
    wrapperStyle: { width: "48%", marginRight: 1 },
  },
  {
    name: "equipmentInfo",
    inputType: "p",
    children: "Equipment",
    style:{fontSize: 18, marginTop: 10}
  },
  {
    name: "EquipmentName",
    placeholder: "Enter Name",
    label: "Name",
    // required: true,
    // inputType: "text",
    wrapperStyle: { width: "48%", marginRight: 8 },
  },
  {
    name: "EquipmentRate",
    placeholder: "Enter Amount",
    label: "Amount",
    // required: true,
    keyboardType: "numeric",
    wrapperStyle: { width: "48%", marginRight: 1 },
  },
  {
    name: "shopInfo",
    inputType: "p",
    children: "Shop",
    style:{fontSize: 18, marginTop: 10}
  },
  {
    name: "ShopName",
    placeholder: "Enter Name",
    label: "Name",
    // required: true,
    // inputType: "text",
    wrapperStyle: { width: "48%", marginRight: 8 },
  },
  {
    name: "ShopRate",
    placeholder: "Enter Amount",
    label: "Amount",
    // required: true,
    keyboardType: "numeric",
    wrapperStyle: { width: "48%", marginRight: 1, marginBottom: 5 },
  },
  {
    name: "Contingency",
    placeholder: "Enter Contingency",
    label: "Contingency",
    // required: true,
    keyboardType: "numeric",
    wrapperStyle: { width: "48%", marginRight: 1 },
  },
];