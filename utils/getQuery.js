const getQuery = (obj) => {

  const objKeys = Object.keys(obj);

  if (!objKeys.length) return "";

  let queryString = "?";

  for (const [key, value] of Object.entries(obj)) {
    queryString += `${key}=${value}${
      key != objKeys[objKeys.length - 1] ? "&" : ""
    }`;
  }
  return queryString;
};

export default getQuery;
