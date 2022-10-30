import { useSelector } from "react-redux";

import classes from './MeetingInfo.module.css';

const MeetingInfo = (props)=>{

    let meetingInformation = useSelector(state=>state.meeting);
    meetingInformation = meetingInformation.filter(meeting=>meeting.id === props.id);
    meetingInformation = meetingInformation[0];

    let tmp = meetingInformation
    .partecipants.map(worker=> (
        <span key={worker.name} >{`${worker.name}`}&nbsp;&nbsp;</span>
    ));

    return (
        <div className={classes.meetingLine} >
            <span className={classes.title} >Meeting Information</span>
            <div>
                <span className={classes.header} >- Team:</span>
                <span>{` ${meetingInformation.team}`}</span>
            </div>
            <div>
                <span className={classes.header} >- Coordinator:</span>
                <span>{` ${meetingInformation.coordinator.name}`}</span>
            </div>
            <div className={classes.partecipants} >
                <span className={classes.header} >{`- Partecipants:`}&nbsp;</span>
                <span>{tmp}</span>
            </div>
        </div>
    );

};

export default MeetingInfo;