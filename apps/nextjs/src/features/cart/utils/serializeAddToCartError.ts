export const serializeAddToCartError = (message: string) => {
  if (message === "insufficient stock") {
    return "Stok barang tidak mencukupi";
  }

  return message;
};
