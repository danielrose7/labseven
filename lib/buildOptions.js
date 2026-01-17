export const buildOptions = (product) => {
  let label = product.Name + " - " + product.ManufacturerSku;
  if (label.startsWith(product.Manufacturer)) {
    label = label.substring(product.Manufacturer.length + 1);
  }

  return {
    asOption: {
      value: product.manufacturerSkuCode,
      label,
    },
    asSelectedOption: {
      value: product.manufacturerSkuCode,
      label: product.ManufacturerSku,
    },
  };
};
