import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS=[
  {id:'p1', title:'First Book', description:'This is the first book',price:10},
  {id:'p2', title:'Second Book', description:'This is the second book', price:20}
]

const Products = (props) => {
  //console.log(DUMMY_PRODUCTS);
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul >
      {DUMMY_PRODUCTS.map(product =>(      
        <ProductItem 
          key={product.id}
          id={product.id}
          title= {product.title}
          price={product.price}
          description={product.description}
        />
      ))}
      </ul>
    </section>
  );
};

export default Products;
