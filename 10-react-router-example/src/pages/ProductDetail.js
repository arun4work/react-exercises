import {useParams} from 'react-router-dom';
const ProductDetail = (props) => {
    const params = useParams();
    console.log(params);
    return (
        <section>
            <h2>The product details page</h2>
            <p>{params.productId}</p>
        </section>
    );
};
export default ProductDetail;
