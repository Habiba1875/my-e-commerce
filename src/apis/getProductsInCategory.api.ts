export default async function getProductsInCategory(catId: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`,
    { cache: 'no-store' }
  );
  const { data } = await res.json();
  return data;
}
