import { TGeneralObject } from "@_lib/types";

interface TParams<TObject extends object> {
  object: TObject;
  keys: (keyof TObject)[];
}
const filterKeysObject = <TObject extends object>(params: TParams<TObject>) => {
  const { object, keys } = params;

  keys?.forEach((key) => {
    delete object[key];
  });

  return object;
};

export default filterKeysObject;
