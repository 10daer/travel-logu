function getErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/email-already-exists":
      return "Email is already in use.";

    case "auth/internal-error":
      return "Internal server error. Contact support team.";

    case "auth/invalid-email":
      return "Invalid email address.";

    case "auth/invalid-email-verified":
      return "Unable to verify your email.";

    case "auth/invalid-password":
      return "Invalid password. Check again.";

    case "auth/invalid-photo-url":
      return "Unable to retrieve your profile picture.";

    case "auth/operation-not-allowed":
      return "Operation is not allowed";

    case "auth/phone-number-already-exists":
      return "Phone number is already in use.";

    case "auth/too-many-requests":
      return "Too many requests. Please try again later.";

    case "auth/uid-already-exists":
      return "UID is already in use.";

    case "auth/user-not-found":
      return "User not found.";

    case "Firebase: Error (auth/internal-error).":
      return "Poor internet connection";

    case "Firebase: Error (auth/network-request-failed).":
      return "Poor internet connection";

    case "Failed to get document because the client is offline.":
      return "User is unauthorized";

    default:
      return "An unexpected error occurred.";
  }
}

export default function userReducer(state, action) {
  switch (action.type) {
    case "signin":
      return {
        ...state,
        user: action.payload,
        userMessage: "Access Granted",
        userIsAuthentic: true,
        userIsLoading: false,
      };

    case "signup":
      return {
        ...state,
        user: action.payload,
        userMessage: "Signup successful",
        userIsAuthentic: true,
        userIsLoading: false,
      };

    case "logout":
      return {
        user: null,
        userIsAuthentic: false,
        userMessage: "",
        userIsLoading: false,
      };

    case "load":
      return {
        ...state,
        userIsLoading: true,
      };

    case "error":
      return {
        ...state,
        userMessage: getErrorMessage(action.payload),
        userIsAuthentic: false,
        userIsLoading: false,
      };

    case "userMessage":
      return {
        ...state,
        userMessage: getErrorMessage(action.payload),
      };

    case "closeMessage":
      return {
        ...state,
        userMessage: "",
      };

    default:
      throw new Error("Unknown action");
  }
}
