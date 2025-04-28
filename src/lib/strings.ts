import { getValue, type Path } from "./getNested";

const UIStrings = {
  a: {
    b: "hello",
    c: "bye",
  },
} as const;

export function getUIString<P extends Path<typeof UIStrings>>(path: P) {
  return getValue(UIStrings, path);
}
