import { useState, useEffect } from 'react';

import classes from './ProfessorInput.module.css';

const ProfessorInput = (props)=>{

    const [professor, setProfessor] = useState('');
    const [profArray, setProfArray] = useState([]);
    const [optionClicked, setOptionClicked] = useState();

    useEffect(()=>{
        setProfessor(props.profName);
        setOptionClicked(false);
    }, [props.profName]);
    

    const changeName=(event)=>{
        let e = event.target.value;
        setProfessor(e);

        let tmp = [];
        props.profArray.forEach(prof=>{
            if(prof.name.toLowerCase().includes(e.toLowerCase()) || e.toLowerCase().includes(prof.name.toLowerCase())) {
                tmp.push(
                    <div 
                        key={prof.id}
                        className={classes.profResult}
                        onClick={()=>{
                            setOptionClicked(true);
                            let tmp = (`${prof.title} ${prof.name}`);
                            setProfessor(tmp);
                            props.onProfChange(tmp);
                            setProfArray([]);
                        }}
                    >
                        <span>{`${prof.title} ${prof.name}`}</span>
                    </div>
                );
            }
        });

        setProfArray(tmp);
    }

    const profBlurHandler = (event)=>{
        setTimeout(()=>{
            if(!optionClicked) {
                setProfArray([]);
                props.onProfChange(event.target.value);
            }
        }, 200);
    }

    const creditsBlurHandler = (event) =>{
        props.onCreditChange(event.target.value);
    }

    return(
        <div className={classes.frame} >
            <div className={classes.profInput} >
                <input 
                    type='text'
                    value={professor}
                    onChange={changeName}
                    onBlur={profBlurHandler}
                    placeholder='Professor'
                />
                <div className={classes.profResultContainer} >
                    {profArray}
                </div>
            </div>
            <div className={classes.inner} >
                <span>Credits:&nbsp;</span>
                <input 
                    type='number' 
                    defaultValue={props.credits}
                    onBlur={creditsBlurHandler}
                />
            </div>
        </div>
    );

};

export default ProfessorInput;