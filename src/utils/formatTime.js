export const formatTime = arg => {
  if(typeof(arg) !== 'number' || arg < 0){
    return null;
  }
  
  const hourNumber = parseInt(arg/3600);
  const minuteNumber = parseInt((arg - (hourNumber * 3600))/60) ;
  const secondNumber = parseInt(arg - (hourNumber * 3600) - (minuteNumber * 60));
  
  return properTimeNumbers(hourNumber, minuteNumber, secondNumber).join(':');
};
  
const properTimeNumbers = (...timeNumbers) => {
  timeNumbers.forEach(timeNumber => {
    if(timeNumber < 10){
      timeNumbers[timeNumbers.indexOf(timeNumber)] = '0' + timeNumber;
    }
  });
  
  return timeNumbers;
};