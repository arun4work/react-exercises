import {useEffect, useState, useCallback} from 'react';
import MealItem from './MealItem';
import Card from '../CommonUI/Card';
import useHttp from '../../hooks/use-http';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const {sendRequest, isLoading, isError} = useHttp();

    const fetchData = useCallback(async () => {
        const result = await sendRequest({
            url: 'https://react-http-b7eed-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json',
        });
        const fetchedMeals = [];
        for (const key in result) {
            fetchedMeals.push({
                id: key,
                name: result[key].name,
                description: result[key].description,
                price: result[key].price,
            });
        }
        setMeals(fetchedMeals);
    }, [sendRequest]);

    useEffect(() => {
        console.log('AvailableMeals useEffect Running!');
        fetchData();
    }, [fetchData]);

    if (isLoading) {
        return (
            <section className={classes['loading-section']}>
                <p>Loading...</p>
            </section>
        );
    }
    if (isError) {
        return (
            <section className={classes['error-section']}>
                <p>Something went wrong!</p>
            </section>
        );
    }

    const mealList = meals.map((meal) => {
        return (
            <MealItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        );
    });

    return (
        <Card className={classes.meals}>
            <ul>{mealList}</ul>
        </Card>
    );
};

export default AvailableMeals;
