export const overrideFields = [
  // {
  //   name: "cost",
  //   inputType: "tableInput",
  //   label: "Cost",
  //   formStyle: {
  //     flexDirection: "row",
  //     flexWrap: "wrap",
  //     alignItems: "center",
  //     marginBottom: 0,
  //   },
  //   fields: [
  //     {
  //       name: "overrideType",
  //       inputType: "select",
  //       url: "/OverrideLog/GetOverrideTypes",
  //       placeholder: "Select Type",
  //       label: "Override Type",
  //       zIndex: 3000,
  //       labelAttributes: "text",
  //       wrapperStyle: { width: "35%", marginRight: 5 },
  //     },
  //     {
  //       name: "hours",
  //       placeholder: "Enter hours",
  //       label: "Hours",
  //       inputType: "text",
  //       wrapperStyle: { width: "30%", marginRight: 5 },
  //     },
  //     {
  //       name: "craftSkill",
  //       inputType: "select",
  //       url: "/CraftSkill",
  //       placeholder: "Select Skill",
  //       label: "Craft Skill",
  //       required: true,
  //       zIndex: 3001,
  //       wrapperStyle: { width: "30%", marginRight: 5 },
  //     },
  //   ],
  // },
  {
    name: "department",
    inputType: "select",
    url: "/Department",
    placeholder: "Select Department",
    label: "Department",
    required: true,
    zIndex: 1004,
    zIndexInverse: 1004,
  },
  {
    name: "unit",
    inputType: "select",
    url: "/Unit",
    placeholder: "Select Unit",
    label: "Unit",
    required: true,
    zIndex: 1003,
    condition: {
      fieldName: "department",
      action: "useValue",
      paramField: "Department.Id",
    },
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
    name: "workCompletedDate",
    inputType: "datetime",
    placeholder: "Select Date",
    label: "Work Complete Date",
  },
   {
    name: "reason",
    placeholder: "Enter reason",
    label: "Override Reason",
    required: true,
    inputType: "textarea",
  },
  // {
  //   name: "reasonForRequest",
  //   inputType: "select",
  //   url: "/ReasonForRequest",
  //   placeholder: "Select Reason",
  //   label: "Reason For Request",
  //   required: true,
  //   zIndex: 1001,
  // },
  // {
  //   name: "delayReason",
  //   inputType: "select",
  //   url: "/TOTLog/GetDelayReasons",
  //   placeholder: "Select Reason",
  //   label: "Reason For Request",
  //   // required: true,
  //   zIndex: 997,
  //   labelAttributes: "text",
  //   valueAttribute: "text",
  //   isEnum: true,
  //   wrapperStyle: { width: "48%", marginRight: 5 },
  // },
  // {
  //   name: "startOfWorkDelay",
  //   inputType: "select",
  //   url: "/StartOfWorkDelay",
  //   placeholder: "Select Start of Work",
  //   label: "Start of Work",
  //   // required: true,
  //   zIndex: 995,
  //   wrapperStyle: { width: "48%", marginRight: 5 },
  //   condition: {
  //     fieldName: "delayReason",
  //     action: "show",
  //     matchValue: "StartOfWork",
  //   },
  // },
  // {
  //   name: "shiftDelay",
  //   inputType: "select",
  //   url: "/ShiftDelay",
  //   placeholder: "Select Delay",
  //   label: "Shift Delays",
  //   // required: true,
  //   zIndex: 998,
  //   wrapperStyle: { width: "48%", marginRight: 5 },
  //   condition: {
  //     fieldName: "delayReason",
  //     action: "show",
  //     matchValue: "ShiftDelay",
  //   },
  // },
  // {
  //   name: "reworkDelay",
  //   inputType: "select",
  //   url: "/ReworkDelay",
  //   placeholder: "Select Delay",
  //   label: "Rework Delays",
  //   // required: true,
  //   zIndex: 996,
  //   wrapperStyle: { width: "48%", marginRight: 5 },
  //   condition: {
  //     fieldName: "delayReason",
  //     action: "show",
  //     matchValue: "ReworkDelay",
  //   },
  // },
  //  {
  //   name: "company",
  //   inputType: "select",
  //   url: "/Company",
  //   placeholder: "Select Company",
  //   label: "Company",
  //   required: true,
  //   zIndex: 986,
  // },
  {
    name: "poNumber",
    placeholder: "Enter number",
    label: "PO Number#",
    required: true,
    keyboardType: "numeric",
  },
  // {
  //   name: "overrideType",
  //   inputType: "select",
  //   url: "/OverrideType",
  //   placeholder: "Select Type",
  //   label: "Override Type",
  //   required: true,
  //   zIndex: 1000,
  // },
  // {
  //   name: "craftSkill",
  //   inputType: "select",
  //   url: "/CraftSkill",
  //   placeholder: "Select Skill",
  //   label: "Craft Skill",
  //   required: true,
  //   zIndex: 999,
  // },
  // {
  //   name: "craftRate",
  //   inputType: "select",
  //   url: "/CraftRate",
  //   placeholder: "Select Craft",
  //   label: "Craft Rate",
  //   required: true,
  //   zIndex: 998,
  // },
  // {
  //   name: "overrideHours",
  //   placeholder: "Hours",
  //   label: "Hours",
  //   required: true,
  //   keyboardType: "numeric",
  // },
  // {
  //   name: "dateSubmitted",
  //   inputType: "datetime",
  //   placeholder: "Select Date",
  //   label: "Submitted Date",
  // },
  // {
  //   name: "timeSubmitted",
  //   inputType: "datetime",
  //   placeholder: "Select Time",
  //   label: "Submitted Time",
  //   mode: "time",
  // },
  // {
  //   name: "permitNo",
  //   placeholder: "Enter Permit",
  //   label: "Permit#",
  // },
  {
    name: "workScope",
    placeholder: "Enter Scope",
    label: "Work Scope",
  },
  // {
  //   name: "delayDescription",
  //   placeholder: "Enter Description",
  //   label: "Description",
  //   required: true,
  //   inputType: "textarea",
  // },
  // {
  //   name: "description",
  //   placeholder: "Enter Description",
  //   label: "Description",
  //   required: true,
  //   inputType: "textarea",
  // },
  // {
  //   name: "requester",
  //   inputType: "select",
  //   url: "/Requester",
  //   placeholder: "Select requester",
  //   label: "Requester",
  //   required: true,
  //   zIndex: 987,
  // },

  // {
  //   name: "approver",
  //   inputType: "select",
  //   url: "/Account/getAllUsers?role=approver",
  //   placeholder: "Select Approver",
  //   labelAttributes: "userName",
  //   label: "Approver",
  //   zIndex: 993,
  //   required: true,
  //   condition: {
  //     fieldName: "unit",
  //     action: "useValue",
  //     paramField: "Unit.Id",
  //   },
  // },
];
