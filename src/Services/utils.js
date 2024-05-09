const dateFormat = (fullDate) => {
    let currentDay = "";
    let currentMonth = "";
    if((fullDate.getMonth()+1) < 10){
      currentMonth = "0" + (fullDate.getMonth()+1);
    }else{
      currentMonth = fullDate.getMonth()+1;
    }
  
    if((fullDate.getDate()) < 10){
      currentDay = "0" + (fullDate.getDate());
    }else{
      currentDay = fullDate.getDate();
    }
    const currentDate = `${currentDay}-${currentMonth}-${fullDate.getFullYear()}`;
    return currentDate;
   }

   export default dateFormat;