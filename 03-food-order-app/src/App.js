import {useState} from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartContextProvider from './store/CartContextProvider';

function App() {
    const [isCartShown, setIsCartShown] = useState(false);

    const showCartHandler = () => {
        setIsCartShown(true);
    };

    const hideCartHandler = () => {
        setIsCartShown(false);
    };

    return (
        <CartContextProvider>
            {isCartShown && <Cart onHide={hideCartHandler} />}
            <Header onShow={showCartHandler} />
            <main>
                <Meals />
            </main>
        </CartContextProvider>
    );
}

export default App;
