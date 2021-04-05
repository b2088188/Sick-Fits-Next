function getProductQuery(productId) {
   return `
  query {
  Product(where:{
    id:"${productId}"
  }){
    id
    name
    price
    description
    photo{
      image{
        publicUrlTransformed
      }
    }
  }
}
`;
}

function getAllProductsQuery() {
   return ` query ALL_PRODUCTS_QUERY{
  allProducts{
    id
    name
    price
    description
    photo{
      id
      image{
        publicUrlTransformed
      }
    }
  }
}`;
}

function getAllProductsCountQuery() {
   return `
  query{
  _allProductsMeta{
    count
  }
}
  `;
}

export { getProductQuery, getAllProductsQuery, getAllProductsCountQuery };
