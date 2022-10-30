import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import DateTimeInput from './DateTimeInput';
import ProfessorInput from './ProfessorInput';
import MeetingInput from './MeetingInput';
import { MdDone, MdOutlineClose } from 'react-icons/md';
import Modal from '../UI/Modal';

import classes from './Form.module.css';

/** the props will hold the id 
 * information and sync with redux to get the data */

const typeColorClass = {
    'EVENT': `${classes.eventBg}`,
    'MEETING': `${classes.meetingBg}`,
    'LECTURE': `${classes.lectureBg}`,
    'BIRTHDAY': `${classes.birthdayBg}`,
};


const Form = (props)=>{
    const [eventType, setEventType] = useState('EVENT');
    const [repetitionType, setRepetitionType] = useState('NO_REPETITION');
    const [profObj, setProfObj] = useState({
        profName: '',
        credits: 0
    });
    const [meetingObj, setMeetingObj] = useState({
        coordinator: '',
        team: ''
    });
    const [eventToEdit, setEventToEdit] = useState({
        id: 'e6',
        title: '',
        type: 'EVENT',
        description: '',
        startDay: {
            date: '',
            month: '',
            year: ''
        },
        endDay: {
            date: '',
            month: '',
            year: ''
        },
        weekdays: '',
        startTime: '00:00',
        endTime: '00:00',
        repetition: 'NO_REPETITION',
        duration: 1,
        break: 0
    });

    const eventSelector = useSelector(state=>state.panel);
    const lectureSelector = useSelector(state=>state.lecture);
    const meetingSelector = useSelector(state=>state.meeting);
    const workerSelector = useSelector(state=>state.worker);
    const profSelector = useSelector(state=>state.professor);


    useEffect(()=>{
        if(props.id !== '') {
            let tmp;
            tmp = eventSelector.eventsToShow.filter(event=>event[0].id === props.id);
            tmp = tmp[0];
            setEventToEdit(tmp[0]);

            setEventType(tmp[0].type);
            setRepetitionType(tmp[0].repetition);

            if(tmp[0].type==='LECTURE') {
                let tmpLecture = lectureSelector.filter(lecture=>lecture.id===props.id);
                tmpLecture = tmpLecture[0];
                let tmpProf = profSelector.filter(prof=>prof.id === tmpLecture.professorId);
                setProfObj({
                    profName: `${tmpProf[0].title} ${tmpProf[0].name}`,
                    credits: tmpLecture.credits
                });
            } else if(tmp[0].type==='MEETING') {
                let tmpMeeting = meetingSelector.filter(meeting=>meeting.id===props.id);
                tmpMeeting = tmpMeeting[0];
                setMeetingObj({
                    coordinator: tmpMeeting.coordinator.name,
                    team: tmpMeeting.team
                });
            }

        } else {
            let tmp = new Date();
            let tmpDate = {
                date: tmp.getDate(),
                month: tmp.getMonth(),
                year: tmp.getFullYear()
            }
            setEventToEdit((prev)=>{
                return {...prev, startDay: tmpDate, endDay: tmpDate};
            })
        }
    }, [eventSelector, lectureSelector, meetingSelector, profSelector, props.id]);


    const changeTitle = (event)=>{
        setEventToEdit((prev)=>{
            return {...prev, title: event.target.value}
        })
    }

    const changeType = (event)=>{
        setEventType(event.target.value.toUpperCase());
        setEventToEdit((prev)=>{
            return {...prev, type: event.target.value.toUpperCase()}
        })
    }

    const getButtonTypes = (value)=>{
        if(value===eventType) {
            return `${classes.type} ${classes.selectedType}`
        }
        return `${classes.type}`;
    }

    const changeProfName = (value)=>{
        setProfObj((prev)=>{
            return {...prev, profName: value}
        });
    }

    const changeCredits = (value)=>{
        setProfObj((prev)=>{
            return {...prev, credits: value}
        });
    }

    const changeCoordinator = (value)=>{
        setMeetingObj((prev)=>{
            return {...prev, coordinator: value};
        })
    }

    const changeTeam = (value)=>{
        setMeetingObj((prev)=>{
            return {...prev, team: value};
        })
    }

    const changeDate=(value, start)=>{
        if(start===true) {
            setEventToEdit((prev)=>{
                return {...prev, startDay: value.date, startTime: value.time};
            })
        } else {
            setEventToEdit((prev)=>{
                return {...prev, endDay: value.date, endTime: value.time};
            })
        }
    }

    const changeRepetition = (event)=>{
        setRepetitionType(event.target.value);
        setEventToEdit((prev)=>{
            return {...prev, repetition: event.target.value}
        })
    }

    const changeDuration = (event)=>{
        setEventToEdit((prev)=>{
            return {...prev, duration: event.target.value}
        })
    }

    const changeBreak = (event)=>{
        setEventToEdit((prev)=>{
            return {...prev, break: event.target.value}
        })
    }

    const checkWeekDay=(day)=>{
        if(eventToEdit.weekdays.includes(day)) {
            return true;
        }
        return false;
    }

    const changeWeekday = (event)=>{
        if(event.target.checked) {
            setEventToEdit((prev)=>{
                let wd = prev.weekdays;
                wd = wd+event.target.value;
                return {...prev, weekdays: wd}
            })
        } else {
            setEventToEdit((prev)=>{
                let wd = prev.weekdays;
                wd = wd.replace(event.target.value, '');
                return {...prev, weekdays: wd}
            })
        }
    }

    const changeDescription = (event)=>{
        setEventToEdit((prev)=>{
            return {...prev, description: event.target.value}
        })
    }

    
    const submitHandler = (e)=>{
        e.preventDefault();
    }

    /**
     * 
     * =====FEATURE DOESEN'T WORK WITHOUT PROPER BACKEND======
     * 
     */

    const onEventAdd = ()=>{
        //====POST REQUEST TO AN API =======
        
        props.onClose();
    }


    return (
        <Modal onClose={props.onClose} >
            <div className={classes.main} >
                <form onSubmit={submitHandler} >
                    <div className={classes.titleLine} >
                        <div className={`${classes.typeIndicator} ${typeColorClass[eventType]}`} />
                        <input 
                            type='text' 
                            placeholder='Event Title'
                            value={eventToEdit.title}
                            onChange={changeTitle}
                            className={classes.title}
                        />
                    </div>
                    
                    <div className={classes.typeLine} >
                        <button 
                            className={getButtonTypes('EVENT')} 
                            value='EVENT'
                            onClick={changeType} 
                        >Event</button>
                        <button 
                            className={getButtonTypes('LECTURE')} 
                            value='LECTURE'
                            onClick={changeType} 
                        >Lecture</button>
                        <button 
                            className={getButtonTypes('MEETING')} 
                            value='MEETING'
                            onClick={changeType} 
                        >Meeting</button>
                        <button 
                            className={getButtonTypes('BIRTHDAY')} 
                            value='BIRTHDAY'
                            onClick={changeType} 
                        >Birthday</button>
                    </div>

                    {eventType==='LECTURE' ?
                    <div className={classes.extraLine} >
                        <div className={classes.dateSeparator} />
                        <ProfessorInput
                            profName={profObj.profName}
                            credits={profObj.credits}
                            onProfChange={changeProfName}
                            onCreditChange={changeCredits}
                            profArray={profSelector}
                        />
                    </div> : ''}

                    {eventType==='MEETING' ?
                    <div className={classes.extraLine} >
                        <div className={classes.dateSeparator} />
                        <MeetingInput
                            coordinator={meetingObj.coordinator}
                            team={meetingObj.team}
                            onChangeCoordinator={changeCoordinator}
                            onChangeTeam={changeTeam}
                            workerArray={workerSelector}
                        />
                    </div> : ''}
                    
                    <div className={classes.dateTimeLine} >
                        <div className={classes.dateSeparator} />
                        <DateTimeInput
                            start={true}    
                            date={eventToEdit.startDay.date}
                            month={eventToEdit.startDay.month}
                            year={eventToEdit.startDay.year}
                            time={eventToEdit.startTime}
                            onChangeDate={changeDate}
                        />
                        {eventType==='BIRTHDAY' ? '' : 
                        <div className={classes.dateSeparator} />
                        }
                        {eventType==='BIRTHDAY' ? '' : 
                        <DateTimeInput
                            start={false}   
                            date={eventToEdit.endDay.date}
                            month={eventToEdit.endDay.month}
                            year={eventToEdit.endDay.year}
                            time={eventToEdit.endTime}
                            onChangeDate={changeDate}
                        />
                        }
                        {eventType!=='BIRTHDAY' ? 
                        <div className={classes.dateSeparator} /> : '' }
                    </div>

                    {eventType!=='BIRTHDAY' ? 
                    <div className={classes.repetitionLine} >
                        <span>Repetition:</span>
                        <select 
                            value={repetitionType}
                            onChange={changeRepetition} 
                        >
                            <option value='NO_REPETITION'>No repetition</option>
                            <option value='DAY' >Daily</option>
                            <option value='WEEK' >Weekly</option>
                            <option value='MONTH' >Monthly</option>
                            <option value='YEAR' >Yearly</option>
                        </select>
                    </div> : ''}

                    {repetitionType==='NO_REPETITION' || eventType==='BIRTHDAY' ? '' : 
                    <div className={classes.frequencyLine} >
                        <div className={classes.dateSeparator} />
                        <div className={classes.frequencyFrase} >
                            <div>
                                <span>This event repeats every&nbsp;</span>
                                <input 
                                    defaultValue={eventToEdit.duration}
                                    type='number'
                                    min='0' 
                                    onBlur={changeDuration}
                                />
                                <span>&nbsp;{`${repetitionType.toLowerCase()}s`}&nbsp;</span>
                            </div>
                            <div className={classes.innerFrase} >
                                <span>with&nbsp;</span>
                                <input 
                                    defaultValue={eventToEdit.break}
                                    type='number'
                                    min='0' 
                                    onBlur={changeBreak}
                                />
                                <span>&nbsp;{`${repetitionType.toLowerCase()}s in between`}</span>
                            </div>
                        </div>
                    </div>}

                    {repetitionType==='WEEK' && eventType!=='BIRTHDAY' ? 
                        <div className={classes.weekdaysLine} >
                            <input type='checkbox' value='mon' defaultChecked={checkWeekDay('mon')} onClick={changeWeekday} />
                            <span>Mon</span>
                            <input type='checkbox' value='tue' defaultChecked={checkWeekDay('tue')} onClick={changeWeekday} />
                            <span>Tue</span>
                            <input type='checkbox' value='wed' defaultChecked={checkWeekDay('wed')} onClick={changeWeekday} />
                            <span>Wed</span>
                            <input type='checkbox' value='thu' defaultChecked={checkWeekDay('thu')} onClick={changeWeekday} />
                            <span>Thu</span>
                            <input type='checkbox' value='fri' defaultChecked={checkWeekDay('fri')} onClick={changeWeekday} />
                            <span>Fri</span>
                            <input type='checkbox' value='sat' defaultChecked={checkWeekDay('sat')} onClick={changeWeekday} />
                            <span>Sat</span>
                            <input type='checkbox' value='sun' defaultChecked={checkWeekDay('sun')} onClick={changeWeekday} />
                            <span>Sun</span>
                        </div> : ''}

                    <div className={classes.descriptionLine} >
                        <div className={classes.dateSeparator} />
                        <textarea
                        defaultValue={eventToEdit.description}
                        placeholder='Notes...'
                        onBlur={changeDescription}
                        />
                    </div>

                    <div className={classes.buttonsLine} >
                        <button 
                            className={classes.actionButton} 
                            onClick={onEventAdd}
                            >
                            <MdDone />
                        </button>
                        <button 
                            className={classes.actionButton}
                            onClick={props.onClose} >
                            <MdOutlineClose />
                        </button>
                    </div>

                </form>
            </div>
        </Modal>
    );

};

export default Form;