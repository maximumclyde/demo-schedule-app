import { useState, useEffect } from 'react';

import classes from './MeetingInput.module.css';

const MeetingInput = (props)=>{
    const [coordinator, setCoordinator] = useState('');
    const [workerArray, setWorkerArray] = useState([]);
    const [optionClicked, setOptionClicked] = useState();

    useEffect(()=>{
        setCoordinator(props.coordinator);
        setOptionClicked(false);
    }, [props.coordinator]);

    const changeCoordinator = (event)=>{
        let e = event.target.value;
        setCoordinator(event.target.value);

        let tmp = [];
        props.workerArray.forEach(worker=>{
            if(worker.name.toLowerCase().includes(e.toLowerCase()) || e.toLowerCase().includes(worker.name.toLowerCase())) {
                tmp.push(
                    <div 
                        key={worker.id}
                        className={classes.workerResult}
                        onClick={()=>{
                            setOptionClicked(true);
                            let tmp = (`${worker.name}`);
                            setCoordinator(tmp);
                            props.onChangeCoordinator(tmp);
                            setWorkerArray([]);
                        }}
                    >
                        <span>{`${worker.name}`}</span>
                    </div>
                );
            }
        });

        setWorkerArray(tmp);
    }

    const blurHandler = (event)=>{
        setTimeout(()=>{
            if(!optionClicked) {
                setWorkerArray([]);
                setCoordinator(event.target.value);
                props.onChangeCoordinator(event.target.value);
            }
        }, 200);
    }

    const teamBlurHandler = (event)=>{
        props.onChangeTeam(event.target.value);
    }

    return (
        <div className={classes.frame} >
            <div className={classes.workerInput} >
                <input 
                    type='text' 
                    placeholder='Coordinator' 
                    value={coordinator} 
                    onChange={changeCoordinator}
                    onBlur={blurHandler} />
                </div>
                <div className={classes.workerResultContainer} >
                    {workerArray}
                </div>
            <input 
                type='text' 
                placeholder='Team' 
                defaultValue={props.team} 
                onBlur={teamBlurHandler}    
            />
        </div>
    );

};

export default MeetingInput;