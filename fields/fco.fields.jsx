export const labourFields = [
  {
    name: "overrideType",
    inputType: "select",
    isEnum: true,
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
    name: "MN",
    placeholder: "Enter hours",
    label: "MN",
    required: true,
    // inputType: "text",
    keyboardType: "numeric",
    wrapperStyle: { width: "48%", marginRight: 1 },
  },
  {
    name: "DU",
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
    name: "date",
    inputType: "datetime",
    placeholder: "Select Date",
    label: "Date",
    required: true,
  },
  {
    name: "unit",
    inputType: "select",
    url: "/Unit",
    placeholder: "Select Unit",
    label: "Unit",
    required: true,
    zIndex: 1003,
  },
  {
    name: "location",
    placeholder: "Enter Location",
    label: "Service Location",
    required: true,
    // inputType: "textarea",
  },
  {
    name: "preTA",
    label: "Pre TA/TA",
    // required: true,
    inputType: "radio",
    options: [
      {
        label: "Pre TA",
        value: true,
      },
      {
        label: "TA",
        value: false,
      },
    ],
  },
  {
    name: "shutdownRequired",
    label: "Shutdown Required",
    inputType: "radio",
    options: [
      {
        label: "Yes",
        value: true,
      },
      {
        label: "No",
        value: false,
      },
    ],
  },
  {
    name: "scaffoldRequired",
    label: "Scafflod Required",
    inputType: "radio",
    options: [
      {
        label: "Yes",
        value: true,
      },
      {
        label: "No",
        value: false,
      },
    ],
  },
  {
    name: "photo",
    label: "Photo",
    inputType: "upload",
    buttonText: "Upload Photo",
    wrapperStyle: { width: "48%", marginRight: 1 },
  },
  {
    name: "equipmentNumber",
    label: "Loop Identification# & Equipment Number",
    required: true,
  },
  {
    name: "descriptionOfFinding",
    placeholder: "Enter Description",
    label: "Description of Finding (Attach marked-upP&ID’s or iso/Sketch)",
    inputType: "textarea",
  },
  {
    name: "file",
    label: "File",
    inputType: "upload",
    buttonText: "Upload Photo",
    wrapperStyle: { width: "48%", marginRight: 1 },
  },
  {
    name: "fcoType",
    inputType: "select",
    url: "/FCOType",
    placeholder: "Select Type",
    label: "FCO Type",
    required: true,
    zIndex: 1000,
  },
  {
    name: "fcoReason",
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
    name: "company",
    inputType: "select",
    url: "/Company?DisablePagination=true",
    placeholder: "Select Company",
    label: "Company",
    required: true,
  },
  {
    name: "fcoSections",
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
    name: "materialName",
    placeholder: "Enter Name",
    label: "Name",
    // required: true,
    // inputType: "text",
    wrapperStyle: { width: "48%", marginRight: 8 },
  },
  {
    name: "materialRate",
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
    name: "equipmentName",
    placeholder: "Enter Name",
    label: "Name",
    // required: true,
    // inputType: "text",
    wrapperStyle: { width: "48%", marginRight: 8 },
  },
  {
    name: "equipmentRate",
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
    name: "shopName",
    placeholder: "Enter Name",
    label: "Name",
    // required: true,
    // inputType: "text",
    wrapperStyle: { width: "48%", marginRight: 8 },
  },
  {
    name: "shopRate",
    placeholder: "Enter Amount",
    label: "Amount",
    // required: true,
    keyboardType: "numeric",
    wrapperStyle: { width: "48%", marginRight: 1, marginBottom: 5 },
  },
  {
    name: "contingency",
    placeholder: "Enter Contingency",
    label: "Contingency",
    // required: true,
    keyboardType: "numeric",
    wrapperStyle: { width: "48%", marginRight: 1 },
  },
];