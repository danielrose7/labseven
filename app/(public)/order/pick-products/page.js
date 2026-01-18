import PickProductsClient from "components/PickProductsClient";
import { getAllProductCategories, getAllProducts } from "lib/products";

const PickProductsPage = async () => {
  // build manufacturer database
  const allProducts = await getAllProducts();
  const manufacturersByCategoryCode = {}; // categoryCode => manufacturerCode[]
  const manufacturerLabelMap = {}; // code => label

  for (const product of allProducts) {
    const Manufacturer = product.Manufacturer;
    const manufacturerCode = product.manufacturerCode;

    // - add label
    if (!manufacturerLabelMap[manufacturerCode]) {
      manufacturerLabelMap[manufacturerCode] = Manufacturer;
    }

    // - add to categories
    for (const category of product.Categories) {
      const prevManufacturers =
        manufacturersByCategoryCode[category.code] || [];
      if (!prevManufacturers.includes(manufacturerCode)) {
        manufacturersByCategoryCode[category.code] = [
          ...prevManufacturers,
          manufacturerCode,
        ];
      }
    }
  }

  // build options
  const allProductCategoryData = await getAllProductCategories();
  const categoryOptions = allProductCategoryData.map((category) => ({
    label: category.Name,
    value: category.code,
    manufacturerOptions: manufacturersByCategoryCode[category.code]
      .map((mCode) => ({
        label: manufacturerLabelMap[mCode],
        value: mCode,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  }));

  return <PickProductsClient categoryOptions={categoryOptions} />;
};

export default PickProductsPage;
