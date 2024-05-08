import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { capitalize, filter } from "lodash";
import { Key } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export const SectionView = ({ title, content }: any) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View>{content}</View>
    </View>
  );
};
export const CommonFilterRow = ({
  data,
  filterName,
  filters,
  setFilters,
}: any) => {
  const onSelect = (item: any) => {
    setFilters({ ...filters, [filterName]: item });
  };
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item: string | undefined, index: Key | null | undefined) => {
          const isActive = filters && filters[filterName] === item;
          const backgroundColor = isActive
            ? theme.colors.neutral(0.7)
            : "white";
          const color = isActive ? "white" : theme.colors.neutral(0.7);
          return (
            <Pressable
              key={index}
              onPress={() => onSelect(item)}
              style={[styles.outlineButton, { backgroundColor }]}
            >
              <Text style={[styles.outlineButtonText, { color }]}>
                {capitalize(item)}
              </Text>
            </Pressable>
          );
        })}
    </View>
  );
};

export const ColorFilter = ({ data, filterName, filters, setFilters }: any) => {
  const onSelect = (item: any) => {
    setFilters({ ...filters, [filterName]: item });
  };
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item: string | undefined, index: Key | null | undefined) => {
          const isActive = filters && filters[filterName] === item;
          const borderColor = isActive ? theme.colors.neutral(0.4) : "white";
          return (
            <Pressable key={index} onPress={() => onSelect(item)}>
              <View style={[styles.colorWrapper, { borderColor }]}>
                <View style={[styles.color, { backgroundColor: item }]} />
              </View>
            </Pressable>
          );
        })}
    </View>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: hp(2.4),
    fontWeight: theme.fontWeights.medium as any,
    color: theme.colors.neutral(0.8),
  },
  flexRowWrap: {
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  outlineButton: {
    padding: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.xs,
    borderCurve: "continuous",
  },
  outlineButtonText: {},
  color: {
    height: 30,
    width: 40,
    borderRadius: theme.radius.sm - 3,
    borderCurve: "continuous",
  },
  colorWrapper: {
    padding: 3,
    borderRadius: theme.radius.sm,
    borderWidth: 2,
    borderCurve: "continuous",
  },
});
