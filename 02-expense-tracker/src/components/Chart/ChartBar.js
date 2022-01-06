import styles from './ChartBar.module.css';

const chartBar = (props) => {
    let maxFillHeight = '0%';
    if (props.maxValue) {
        maxFillHeight = (props.value / props.maxValue) * 100 + '%';
    }

    return (
        <div className={styles['chart-bar']}>
            <div className={styles['chart-bar__inner']}>
                <div
                    className={styles['chart-bar__fill']}
                    style={{height: maxFillHeight}}
                ></div>
            </div>
            <div className={styles['chart-bar__label']}>{props.label}</div>
        </div>
    );
};

export default chartBar;
