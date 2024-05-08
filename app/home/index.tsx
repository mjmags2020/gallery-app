import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import Categories from "@/components/categories";
import { apiCall } from "../api";
import { ImageData } from "@/constants/types";
import ImageGrid from "@/components/ImageGrid";
import { debounce, filter } from "lodash";
import FiltersModal from "@/components/filtersModal";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();
  let page = 1;
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 0;
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isEndReached, setIsEndReached] = useState(false);
  const searchInputRef = useRef<any>(null);
  const modalRef = useRef<any>(null);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages: any = async (params = { page: 1 }, append = true) => {
    console.log("params", params, append);
    let res = await apiCall(params);
    if (res.success && res.data.hits) {
      if (append) {
        setImages([...images, , ...res.data.hits]);
      } else {
        setImages([...res.data.hits]);
      }
    }
  };
  const handleChangeCategory = (cat: string | null) => {
    setActiveCategory(cat);
    clearSearch();
    setImages([]);
    let params: any = {
      page: 1,
    };

    if (cat) params.category = cat;
    fetchImages(params, false);
  };
  const handleSearch = (text: string) => {
    console.log("SEARCH", text);
    setSearch(text);
    if (text.length > 2) {
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page: 1, q: text }, false);
    }

    if (text === "") {
      setImages([]);
      clearSearch();
      setActiveCategory(null);
      fetchImages({ page: 1 }, false);
    }
  };

  const clearSearch = () => {
    setSearch("");
    searchInputRef?.current?.clear();
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 1000), []);

  const openFilterModal = () => {
    modalRef?.current.present();
  };
  const closeFilterModal = () => {
    modalRef?.current.close();
  };
  const handleScroll = (event: any) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight - scrollViewHeight;
    if (scrollOffset >= bottomPosition - 1) {
      if (!isEndReached) {
        setIsEndReached(true);

        console.log("REACHED LAST ITEM");
        ++page;
        let params = {
          page,
          ...(filters as any),
        };
        if (activeCategory) {
          params.category = activeCategory;
        }
        if (search) {
          params.q = search;
        }
        fetchImages(params);
      }
    } else if (isEndReached) {
      setIsEndReached(false);
    }
  };
  const handleScrollUp = (event: any) => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const applyFilters = () => {
    if (filters) {
      page = 1;
      setImages([]);
      let params = {
        page,
        ...(filters as any),
      };
      if (activeCategory) {
        params.category = activeCategory;
      }
      if (search) {
        params.q = search;
      }
      fetchImages(params, false);
    }

    closeFilterModal();
  };
  const reseFilters = () => {
    if (filters) {
      page = 1;
      setFilters(null);

      setImages([]);
      let params: any = {
        page,
      };
      if (activeCategory) {
        params.category = activeCategory;
      }
      if (search) {
        params.q = search;
      }
      fetchImages(params, false);
    }
    closeFilterModal();
  };

  const clearThisFilter = (filterName: string) => {
    let filterz = { ...(filters as any) };
    delete filterz[filterName];
    setFilters({ ...filterz });
    page == 1;
    setImages([]);
    let params = {
      page,
      ...filterz,
    };
    if (activeCategory) {
      params.category = activeCategory;
    }
    if (search) {
      params.q = search;
    }
    fetchImages(params, false);
  };
  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable onPress={handleScrollUp}>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <Pressable onPress={openFilterModal}>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={5}
        ref={scrollRef}
        contentContainerStyle={{ gap: 15 }}
      >
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <TextInput
            ref={searchInputRef}
            placeholder="Search for photos..."
            style={styles.searchInput}
            // value={search}
            onChangeText={handleTextDebounce}
          />
          {search && (
            <Pressable
              style={styles.closeIcon}
              onPress={() => {
                handleSearch("");
              }}
            >
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>
        <View style={styles.categories}>
          <Categories
            activeCategory={activeCategory}
            handleCategory={handleChangeCategory}
          />
        </View>
        {/* Filters */}
        {filters && (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
            >
              {Object.keys(filters).map((key, index) => {
                return (
                  <View key={key} style={styles.filterItem}>
                    {key === "colors" ? (
                      <View
                        style={{
                          height: 20,
                          width: 30,
                          borderRadius: 7,
                          backgroundColor: filters[key],
                        }}
                      ></View>
                    ) : (
                      <Text style={styles.filterItemText}>{filters[key]}</Text>
                    )}

                    <Pressable
                      style={styles.filterCloseIcon}
                      onPress={() => clearThisFilter(key)}
                    >
                      <Ionicons
                        name="close"
                        size={14}
                        color={theme.colors.neutral(0.8)}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}
        {/* Grid */}
        <View>
          {images.length > 0 && <ImageGrid images={images} router={router} />}
        </View>

        {/* Loading */}
        <View style={{ marginBottom: 70, marginTop: images.length ? 10 : 70 }}>
          <ActivityIndicator size={"large"} />
        </View>
      </ScrollView>
      <FiltersModal
        modalRef={modalRef}
        filters={filters}
        onClose={closeFilterModal}
        setFilters={setFilters}
        onApply={applyFilters}
        onReset={reseFilters}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, gap: 15 },
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(3),
    fontWeight: theme.fontWeights.semibold as any,
    color: theme.colors.neutral(0.9),
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
  categories: {},
  filters: {
    paddingHorizontal: wp(4),
    gap: 10,
  },
  filterItem: {
    backgroundColor: theme.colors.grayBG,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.radius.xs,
    gap: 10,
    paddingHorizontal: 10,
  },
  filterItemText: {
    fontSize: hp(1.9),
  },
  filterCloseIcon: {
    backgroundColor: theme.colors.neutral(0.2),
    padding: 4,
    borderRadius: 7,
  },
});
