export interface CodePromise {
  resolve: any;
  reject: any;
}

export type CodeCallback = (code: string) => Promise<void>;
