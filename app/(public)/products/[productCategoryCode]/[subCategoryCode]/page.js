import { Suspense } from "react";
import { ProductsClient, ThreeDotLoader } from "components";
import {
  getAllProductCategories,
  getProductCategory,
  getAllProducts,
} from "lib/products";
import { paginate } from "lib/utils";

export const metadata = {
  title: "Shop our products",
};

// Revalidate cached pages after 24 hours
export const revalidate = 86400;

export async function generateStaticParams() {
  const allCategories = await getAllProductCategories();
  const params = [];

  for (const category of allCategories) {
    for (const subcategory of category.SubCategories) {
      params.push({
        productCategoryCode: category.code,
        subCategoryCode: subcategory.code,
      });
    }
  }

  return params;
}

const SubCategoryPage = async ({ params }) => {
  const { productCategoryCode, subCategoryCode } = await params;
  const allProductCategoryData = await getAllProductCategories();
  const categoryData = await getProductCategory(productCategoryCode);
  const subcategoryData = categoryData.SubCategories.find(
    (sub) => sub.code === subCategoryCode
  );
  const allProducts = await getAllProducts();

  const categoryProductData = allProducts.filter((product) =>
    subcategoryData.ItemIds.includes(product.ID)
  );
  const [productData, pagination] = paginate(categoryProductData, 1, 16);

  return (
    <Suspense fallback={<ThreeDotLoader />}>
      <ProductsClient
        fallbackData={{ products: productData, pagination }}
        allProductCategoryData={allProductCategoryData}
        categoryData={categoryData}
        subcategoryData={subcategoryData}
        routeParams={{ productCategoryCode, subCategoryCode }}
      />
    </Suspense>
  );
};

export default SubCategoryPage;
