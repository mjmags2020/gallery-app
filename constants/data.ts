import { Filters } from "./types";

const categories = [
  "backgrounds",
  "fashion",
  "nature",
  "science",
  "education",
  "feelings",
  "health",
  "people",
  "religion",
  "places",
  "animals",
  "industry",
  "computer",
  "food",
  "sports",
  "transportation",
  "travel",
  "buildings",
  "business",
  "music",
];
const filters: Filters | any = {
  order: ["popular", "latest"],
  orientation: ["horizontal", "vertical"],
  type: ["photo", "illustration", "vector"],
  colors: [
    "red",
    "orange",
    "yellow",
    "green",
    "turquoise",
    "blue",
    "pink",
    "gray",
    "black",
    "brown",
    "white",
  ],
};
export const data = {
  categories,
  filters,
};
