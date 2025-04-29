export interface Kitty {
  name: string;
  size: string;
  age: string;
  vaccine: boolean;
}

export function getKitty(id: string) {
  return new Promise<Kitty | undefined>((resolve) => {
    setTimeout(() => {
      const rawKitty = localStorage.getItem(`kitties:${id}`);
      if (rawKitty) {
        resolve(JSON.parse(rawKitty) as Kitty);
        return;
      }
      resolve(undefined);
    }, 500);
  });
}

export function saveKitty(id: string, kitty: Kitty, code?: string) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (code === "141516") {
        localStorage.setItem(`kitties:${id}`, JSON.stringify(kitty));
        resolve();
      } else {
        reject(new Error("Incorrect code"));
      }
    }, 1000);
  });
}
