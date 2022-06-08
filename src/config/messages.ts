export default {
  requests: {
    errorParsingObject: "Invalid JSON object provided.",
    bodyNotProvided: "Valid request body not provided.",
  },
  validation: {
    bodyNotProvided: "Valid body not provided.",
    idNotProvided: "Valid id not provided.",
    idNotFound: "Id not found.",
    todo: {
      label: {
        notProvided: "Valid label not provided",
        minlength: (minLength: number) => `Todo label should contain ${minLength} symbols at least`
      }
    }
  },
};
