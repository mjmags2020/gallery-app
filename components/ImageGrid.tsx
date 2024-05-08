import { StyleSheet, View } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./ImageCard";
import { ImageData } from "@/constants/types";
import { getColumnCount, wp } from "@/helpers/common";

const ImageGrid = ({ images, router }: any) => {
  const columns = getColumnCount();
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={2}
        contentContainerStyle={styles.listContainerStyle}
        renderItem={({ item, index }) => (
          <ImageCard
            item={item}
            columns={columns}
            index={index}
            router={router}
          />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100),
  },
  listContainerStyle: {
    paddingHorizontal: wp(1),
  },
});

export default ImageGrid;
