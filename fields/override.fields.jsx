export const overrideFields = [
  {
    name: "dateSubmitted",
    inputType: "datetime",
    placeholder: "Select Date",
    label: "Submitted Date",
  },
  {
    name: "timeSubmitted",
    inputType: "datetime",
    placeholder: "Select Time",
    label: "Submitted Time",
    mode: "time",
  },
  {
    name: "workCompletedDate",
    inputType: "datetime",
    placeholder: "Select Date",
    label: "Work Complete Date",
  },
  {
    name: "overrideHours",
    placeholder: "Hours",
    label: "Override Hours",
    required: true,
    keyboardType: "numeric",
  },
  {
    name: "poNumber",
    placeholder: "Enter number",
    label: "PO Number#",
    required: true,
    keyboardType: "numeric",
  },
  {
    name: "contractor",
    inputType: "select",
    url: "/Contractor",
    placeholder: "Select Contractor",
    label: "Contractor",
    required: true,
    zIndex: 3000,
    zIndexInverse: 1000,
  },
  {
    name: "reasonForRequest",
    inputType: "select",
    url: "/ReasonForRequest",
    placeholder: "Select Reason",
    label: "Request Reason",
    required: true,
    zIndex: 999,
  },
  {
    name: "shift",
    inputType: "select",
    url: "/Shift",
    placeholder: "Select Shift",
    label: "Shift",
    required: true,
    zIndex: 997,
  },
  {
    name: "unit",
    inputType: "select",
    url: "/Unit",
    placeholder: "Select Unit",
    label: "Unit",
    required: true,
    zIndex: 996,
  },
  {
    name: "description",
    placeholder: "Enter Descriptions",
    label: "Descriptions",
    required: true,
    inputType: "textarea",
  },
  {
    name: "craftRate",
    inputType: "select",
    url: "/CraftRate",
    placeholder: "Select Craft",
    label: "Craft Rate",
    required: true,
    zIndex: 990,
  },
  {
    name: "craftSkill",
    inputType: "select",
    url: "/CraftSkill",
    placeholder: "Select Skill",
    label: "Craft Skill",
    required: true,
    zIndex: 989,
  },
  {
    name: "overrideType",
    inputType: "select",
    url: "/OverrideType",
    placeholder: "Select Type",
    label: "Override Type",
    required: true,
    zIndex: 988,
  },
  {
    name: "requester",
    inputType: "select",
    url: "/Requester",
    placeholder: "Select requester",
    label: "Requester",
    required: true,
    zIndex: 987,
  },
  {
    name: "company",
    inputType: "select",
    url: "/Company",
    placeholder: "Select Company",
    label: "Company",
    required: true,
    zIndex: 986,
  },
  {
    name: "approver",
    inputType: "select",
    url: "/Account/getAllUsers?role=approver",
    placeholder: "Select Approver",
    labelAttributes: "userName",
    label: "Approver",
    zIndex: 993,
    required: true,
  },
];