import { Suspense } from "react";
import { ProductsClient, ThreeDotLoader } from "components";
import { getAllProductCategories, getAllProducts } from "lib/products";
import { paginate } from "lib/utils";

export const metadata = {
  title: "Shop our products",
};

const ProductsPage = async () => {
  const allProducts = await getAllProducts();
  const [productData, pagination] = paginate(allProducts, 1, 16);
  const allProductCategoryData = await getAllProductCategories();

  return (
    <Suspense fallback={<ThreeDotLoader />}>
      <ProductsClient
        fallbackData={{ products: productData, pagination }}
        allProductCategoryData={allProductCategoryData}
      />
    </Suspense>
  );
};

export default ProductsPage;
