import React, { useState } from 'react';
import moment from 'moment';
const Timer = (props) => {

    const [now, setNow ] = useState(moment());

    let diffInSeconds = now.diff(props.date, 'seconds');
    let diffInMinutes = now.diff(props.date, 'minutes');
    let diffInHours = now.diff(props.date, 'hours');
    let diffInDays = now.diff(props.date, 'days');
    let diffInMounth = now.diff(props.date, 'mounth');

    const createdDate = `${diffInSeconds<60?diffInSeconds+' секунд тому':diffInMinutes<60?diffInMinutes+' хвилин тому':diffInHours<24?diffInHours+' годин тому':diffInDays<31?diffInDays+' днів тому':diffInMounth<12?diffInMounth+' місяців тому':diffInMounth<12?diffInMounth+' місяців тому':moment(props.date).format('dddd, MMMM DD YYYY, H:mm:ss')}`;

    setTimeout(()=>{setNow(moment(),1000)})

    return <span className='post-created__date'>
        { createdDate }
    </span>
}

export default Timer;