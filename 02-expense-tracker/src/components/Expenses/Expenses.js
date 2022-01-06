import {useState} from 'react';
import Card from '../Common/Card';
import ExpenseFilter from './ExpenseFilter';
import ExpenseList from './ExpenseList';
import Chart from '../Chart/Chart';
import styles from './Expenses.module.css';

const Expenses = (props) => {
    const [filteredYear, setFilteredYear] = useState('2019');

    const yearChangeHandler = (year) => {
        setFilteredYear(year);
    };

    const filteredExpenses = props.expenses.filter(
        (expense) => expense.date.getFullYear().toString() === filteredYear
    );

    return (
        <Card className={styles.expenses}>
            <ExpenseFilter
                onYearChange={yearChangeHandler}
                filteredYear={filteredYear}
            />
            <Chart filteredExpenses={filteredExpenses} />
            <ExpenseList filteredExpenses={filteredExpenses} />
        </Card>
    );
};

export default Expenses;
