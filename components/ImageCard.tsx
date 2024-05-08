import { View, StyleSheet, Pressable } from "react-native";
import React from "react";
import { ImageData } from "@/constants/types";
import { Image } from "expo-image";
import { getSameSize, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";

type TProps = {
  item: any;
  index: number;
  columns: number;
  router: any;
};
const ImageCard = ({ item, index, columns, router }: TProps) => {
  const isLatInRow = () => {
    return (index + 1) % columns === 0;
  };
  const getImageHeight = () => {
    if (!item?.imageHeight && !item?.imageWidth)
      return { height: getSameSize(200, 200) };

    let { imageHeight: height, imageWidth: width } = item;
    return { height: getSameSize(height, width) };
  };
  return (
    <Pressable
      style={[styles.imageWrappper, !isLatInRow() && styles.spacing]}
      onPress={() =>
        router.push({ pathname: "home/image", params: { ...item } })
      }
    >
      <Image
        style={[styles.image, getImageHeight()]}
        // style={[styles.image]}
        source={item?.webformatURL}
        transition={100 * index}
      />
      {/*   <Image style={styles.image} source={{ uri: item?.userImageURL }} /> */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  imageWrappper: {
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(2),
  },
  spacing: {
    marginRight: wp(2),
  },
});

export default ImageCard;
