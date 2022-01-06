import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../../store/cart';
import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
    const products = useSelector((state) => state.product.products);
    const dispatch = useDispatch();

    const addToCartHandler = (product) => {
        dispatch(addToCart(product));
    };

    const productList = products.map((product) => {
        return (
            <ProductItem
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                description={product.description}
                onAdd={addToCartHandler.bind(null, product)}
            />
        );
    });
    return (
        <section className={classes.products}>
            <h2>Buy your favorite products</h2>
            <ul>{productList}</ul>
        </section>
    );
};

export default Products;
