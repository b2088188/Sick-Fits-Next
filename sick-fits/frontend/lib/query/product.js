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

function getAllProductsQuery({ page = 1 } = {}) {
   const skip = (page - 1) * process.env.NEXT_PUBLIC_PER_PAGE;
   const first = process.env.NEXT_PUBLIC_PER_PAGE;

   return ` query ALL_PRODUCTS_QUERY{
  allProducts(
  first:${first}
  skip:${skip}
  ){
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

function searchProductsQuery(searchTerm) {
   return `
  query{
    searchTerms:allProducts(
    where:{
      OR:[
      {name_contains_i:"${searchTerm}"}
      {description_contains_i:"${searchTerm}"}
      ]
    }
    ){
      id
      name
      photo{
        image{
          publicUrlTransformed
        }
      }
    }
  }
  `;
}

export { getProductQuery, getAllProductsQuery, getAllProductsCountQuery, searchProductsQuery };
