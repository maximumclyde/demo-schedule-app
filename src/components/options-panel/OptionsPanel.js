import classes from './OptionsPanel1.module.css';

const OptionsPanel = (props)=>{

    let optionClasses = `${classes.mainFrame} `;
    if(props.show) {
        optionClasses = optionClasses+` ${classes.show}`;
    } else {
        optionClasses = optionClasses+` ${classes.hide}`;
    }

    return (
        <div className={optionClasses}>
            <div className={classes.topOptions} >
                <button className={classes.option} >
                    <span>Account Settings</span>
                </button>
                <button className={classes.option} >
                    <span>View Event Table</span>
                </button>
                <button className={classes.option} >
                    <span>Add Event</span>
                </button>
            </div>
            <button className={`${classes.option} ${classes.logout}`} >
                <span>Logout</span>
            </button>
        </div>
    );

};

export default OptionsPanel;