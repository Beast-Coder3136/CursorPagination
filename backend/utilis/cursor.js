
export const encodeCursor = (product) => {

  const cursorData = {
    createdAt: product.createdAt,
    id: product._id,
  };
  // console.log(cursorData)
  return Buffer.from(
    JSON.stringify(cursorData)
  ).toString("base64");
};


export const decodeCursor = (cursor) => {
  return JSON.parse(
    Buffer.from(cursor, "base64").toString()
  );

};
