import store from "../store";
// import toast from "./toast";

const axiosErrorResponseHandler = error => {
  store.commit("setProcessing", "");
  store.commit("doneLoadingPage");
  if (error.config.hasOwnProperty("errorHandle") && !error.config.errorHandle) {
    return Promise.reject(error);
  }
  // Do something with response error
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { message } = error.response.data;
    console.log(message);
    switch (error.response.status) {
      case 400:
        console.error(message || "Bad request");
        throw error;
      case 401:
        console.error(message || "Unauthorized");
        throw error;
      // return store.dispatch("logout");
      case 403:
        console.log(
          message || "Forbidden. You do no have access to requested resource"
        );
        throw error;
      case 404:
        console.error(message || "Requested resource cannot be found");
        break;
      case 405:
        console.error(message || "Method not allowed");
        throw error;
      case 408:
        console.error("Timed out. Please ensure you have good connectivity");
        throw error;
      case 422:
        console.error(message || "Unprocessable entity");
        throw error;
      case 500:
        console.error(message || "Something went wrong");
        throw error;
      case 503:
        console.error("Service unavailable");
        throw error;
      default:
        return Promise.reject(error);
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.
    console.error("No response was received");
    return Promise.reject(error);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Something went wrong");
    return Promise.reject(error);
  }
};

export default axiosErrorResponseHandler;
