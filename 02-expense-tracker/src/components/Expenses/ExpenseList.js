import ExpenseItem from './ExpenseItem';
import styles from './ExpenseList.module.css';

const ExpenseList = (props) => {
    if (props.filteredExpenses.length === 0) {
        return (
            <h2 className={styles['expenses-list__fallback']}>
                No expense found.
            </h2>
        );
    }

    return (
        <ul className={styles['expenses-list']}>
            {props.filteredExpenses.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    date={expense.date}
                    title={expense.title}
                    amount={expense.amount}
                />
            ))}
        </ul>
    );
};

export default ExpenseList;
