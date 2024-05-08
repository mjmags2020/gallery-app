import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const wp = (percentage: number) => {
  const width = deviceWidth;
  return (percentage * width) / 100;
};
export const hp = (percentage: number) => {
  const height = deviceHeight;
  return (percentage * height) / 100;
};

export const getColumnCount = () => {
  if (deviceWidth >= 1024) {
    // Desktop
    return 4;
  } else if (deviceWidth >= 768) {
    // tablet
    return 3;
  } else {
    // Mobile
    return 2;
  }
};

export const getSameSize = (height: number, width: number) => {
  if (width > height) {
    // landscape
    return 250;
  } else if (width < height) {
    //portrait
    return 300;
  } else {
    return 200;
  }
};

export const capitalize = (str: string) => {
  return str.replace(/\b\w/g, (l: string) => l.toUpperCase());
};
