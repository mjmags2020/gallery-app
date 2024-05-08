import axios from "axios";

const API_KEY = "43615988-84b42b876472d365cf90984d4";

const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params: any) => {
  let url = apiUrl + "&per_page=25&safesearch=true&editors_choice=true";
  if (!params) return url;

  let paramKeys = Object.keys(params);
  paramKeys.map((key) => {
    let value = key === "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });
  console.log("URL", url);
  return url;
};
export const apiCall = async (params: any) => {
  try {
    const response = await axios.get(formatUrl(params));
    const { data } = response;
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    console.log("ERROR", error?.message);
    return {
      success: false,
      msg: error.message,
    };
  }
};
