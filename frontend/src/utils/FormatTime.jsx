
export function FormatTime({rawDate}){

    const formattedTime = new Date(rawDate).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    });
    
    

    return <div style={{fontSize: "9px"}} className=" text-gray-300">{formattedTime}</div>
}

export function FormatDate({rawDate}){
    const formattedDate = new Date(rawDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    });

    return <div style={{fontSize: "9px"}} className=" text-gray-300">{formattedDate}</div>
}
 
export const isToday = (value) => {
        const rawDate = new Date(value);
        const today = new Date();
        const result = rawDate.toDateString() === today.toDateString()
        return result
    }