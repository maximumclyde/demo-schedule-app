import { useSelector } from "react-redux";

import classes from './LectureInfo.module.css';

const LectureInfo = (props) =>{

    let lectureInfo = useSelector(state=> state.lecture);
    lectureInfo = lectureInfo.filter(lecture=>lecture.id === props.id);
    lectureInfo = lectureInfo[0];

    let professorInfo = useSelector(state=>state.professor);
    professorInfo = professorInfo.filter(prof=>prof.id === lectureInfo.professorId);
    professorInfo = professorInfo[0];

    return(
        <div className={classes.lectureLine} >
            <span className={classes.title} >Lecture information</span>
            <div>
                <span className={classes.header}>{'- Professor:'}&nbsp;</span>
                <span>{`${professorInfo.title} ${professorInfo.name}`}</span>
            </div>
            <div>
                <span className={classes.header} >{'- Credits:'}&nbsp;</span>
                <span>{lectureInfo.credits}</span>
            </div>
        </div>
    );

};

export default LectureInfo;