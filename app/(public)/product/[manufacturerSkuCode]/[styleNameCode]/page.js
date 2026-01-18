import { ProductDetailClient } from "components";
import {
  getAllProducts,
  getProductByStyle,
  getProductCategory,
} from "lib/products";

export async function generateStaticParams() {
  const allProducts = await getAllProducts();
  const params = [];

  for (const product of allProducts) {
    for (const style of product.Styles) {
      params.push({
        manufacturerSkuCode: product.manufacturerSkuCode,
        styleNameCode: style.nameCode,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }) {
  const { manufacturerSkuCode, styleNameCode } = await params;
  const productData = await getProductByStyle(manufacturerSkuCode, styleNameCode);
  const activeStyle = productData.activeStyle;

  const title = `${productData.Manufacturer} - ${productData.ManufacturerSku} // ${activeStyle.Name}`;
  const description =
    productData.LongDescription ||
    `Design your own ${productData.Name} (${productData.Manufacturer} ${productData.ManufacturerSku}) in ${activeStyle.Name} with help from Lab Seven`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(activeStyle.mainImageUrl && { images: [activeStyle.mainImageUrl] }),
    },
    ...(productData.Keywords && { keywords: productData.Keywords }),
    ...(productData.defaultHref && {
      alternates: { canonical: productData.defaultHref },
    }),
  };
}

const ProductPage = async ({ params }) => {
  const { manufacturerSkuCode, styleNameCode } = await params;
  const productData = await getProductByStyle(manufacturerSkuCode, styleNameCode);

  const category =
    productData.Categories.find((cat) => !!cat.subCategoryCode) ||
    productData.Categories[0];
  let categoryData = null;
  let subcategoryData = null;

  if (category) {
    categoryData = (await getProductCategory(category.code)) || null;
    if (categoryData) {
      subcategoryData =
        categoryData.SubCategories.find(
          (sub) => sub.code == category.subCategoryCode
        ) || null;
    }
  }

  return (
    <ProductDetailClient
      productData={productData}
      categoryData={categoryData}
      subcategoryData={subcategoryData}
    />
  );
};

export default ProductPage;
