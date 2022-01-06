import ChartBar from './ChartBar';
import styles from './Chart.module.css';

const Chart = (props) => {
    const dataPoints = [
        {label: 'Jan', value: 0},
        {label: 'Feb', value: 0},
        {label: 'Mar', value: 0},
        {label: 'Apr', value: 0},
        {label: 'May', value: 0},
        {label: 'Jun', value: 0},
        {label: 'Jul', value: 0},
        {label: 'Aug', value: 0},
        {label: 'Sep', value: 0},
        {label: 'Oct', value: 0},
        {label: 'Nov', value: 0},
        {label: 'Dec', value: 0},
    ];

    for (const expense of props.filteredExpenses) {
        dataPoints[expense.date.getMonth() - 1].value = expense.amount;
    }
    const expenseAmounts = props.filteredExpenses.map(
        (expense) => expense.amount
    );

    const maxValue = Math.max(...expenseAmounts);

    return (
        <div className={styles.chart}>
            {dataPoints.map((dataPoint) => (
                <ChartBar
                    key={dataPoint.label}
                    label={dataPoint.label}
                    value={dataPoint.value}
                    maxValue={maxValue}
                />
            ))}
        </div>
    );
};

export default Chart;
