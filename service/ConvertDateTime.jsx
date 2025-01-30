import moment from "moment";


export const FormatDate=(timestamp)=>{
    return new Date(timestamp).setHours(0, 0, 0, 0);
}

export const FormatDateForText=(date)=>{
    return moment(date).format('ll')
}

export const formatTime=(timestamp)=>{
    const date = new Date(timestamp);
    const timeString = date.toLocaleTimeString([],{
        hour: '2-digit',
        minute: '2-digit'
    });

    console.log(timeString);
    return timeString; //
}