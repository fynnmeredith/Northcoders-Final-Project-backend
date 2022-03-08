export const requestKeyCheck = (requestObj, ...keys) => {
  // First arg to be the object that requires testing, the following arguments to be a list of keys required in the object

  const reqKeys = [...keys];
  const reqObjKeys = Object.keys(requestObj);

  for (let i = 0; i < keys.length; i++) {
    if (reqObjKeys.indexOf(reqKeys[i]) == -1) {
      return false;
    }
  }
  return true;
};
