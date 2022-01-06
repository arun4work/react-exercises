import styles from './ExpenseFilter.module.css';

const ExpenseFilter = (props) => {
    const changeHandler = (event) => {
        props.onYearChange(event.target.value);
    };

    return (
        <div className={styles['expenses-filter']}>
            <div className={styles['expenses-filter__control']}>
                <label>Filter by year</label>
                <select value={props.filteredYear} onChange={changeHandler}>
                    <option value='2019'>2019</option>
                    <option value='2020'>2020</option>
                    <option value='2021'>2021</option>
                    <option value='2022'>2022</option>
                </select>
            </div>
        </div>
    );
};

export default ExpenseFilter;
