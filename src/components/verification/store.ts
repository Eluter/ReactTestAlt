import { create } from "zustand";
import { CodeCallback, CodePromise } from "./types";

export const useVerificationCode = create<{
  visible: boolean;
  callback: CodeCallback | undefined;
  promise: CodePromise | undefined;
  requestCode: (callback?: CodeCallback) => Promise<string>;
  onCancel: () => void;
  onSubmit: (code: string) => Promise<void>;
}>((set, get) => ({
  visible: false,
  promise: undefined,
  callback: undefined,
  requestCode: (callback) => {
    return new Promise<string>((resolve, reject) => {
      set({ callback, promise: { resolve, reject }, visible: true });
    });
  },
  onCancel: () => {
    get().promise?.reject();
    set({
      visible: false,
    });
  },
  onSubmit: async (code) => {
    await get().callback?.(code);
    get().promise?.resolve(code);
    set({ visible: false });
  },
}));
