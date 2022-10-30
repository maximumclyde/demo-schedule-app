import { useState } from 'react';

import NavBar from './components/nav-bar/NavBar';
import Calendar from './components/calendar-section/Calendar';
import PanelSection from './components/panel-section/PanelSection';

import classes from './App.module.css';
import OptionsPortal from './components/UI/OptionsPortal';
import OptionsPanel from './components/options-panel/OptionsPanel';

const App = ()=>{

    const [optionsShow, setOptionsShow] = useState(false);

    const optionsToggle=()=>{
        setOptionsShow((prev)=>{
            return !prev;
        });
    };

    return(
        <div className={classes.main} >
            <NavBar onClick={optionsToggle} />
            <div className={classes.appFrame} >
                
                {optionsShow===true ? 
                <OptionsPortal onBackDropClick={optionsToggle} >
                    <OptionsPanel />
                </OptionsPortal>
                : '' }

                <PanelSection />
                <Calendar />
            </div>
        </div>
    );

};

export default App;