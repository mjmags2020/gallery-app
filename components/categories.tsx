import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { data } from "@/constants/data";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Animated, { FadeInRight } from "react-native-reanimated";

type TCategoryType = {
  activeCategory?: string | null;
  handleCategory: (category: string | null) => void;
};
type TProps = {
  title: string;
  index: number;
  isActive: boolean;
} & TCategoryType;

const CategoryItem = ({ title, index, isActive, handleCategory }: TProps) => {
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}
    >
      <Pressable
        onPress={() => handleCategory(isActive ? null : title)}
        style={[
          styles.category,
          {
            backgroundColor: isActive
              ? theme.colors.neutral(0.8)
              : theme.colors.white,
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              color: isActive ? theme.colors.white : theme.colors.neutral(0.8),
            },
          ]}
        >
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const Categories = ({ activeCategory, handleCategory }: TCategoryType) => {
  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatlistContainer}
      showsHorizontalScrollIndicator={false}
      data={data.categories}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <CategoryItem
          title={item}
          index={index}
          isActive={activeCategory === item}
          handleCategory={handleCategory}
        />
      )}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({
  flatlistContainer: {
    gap: 8,
    paddingHorizontal: wp(4),
  },
  category: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    // backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.medium as any,
  },
});
