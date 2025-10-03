import { months, daysOfTheWeek } from "./lists.js";

export function displayCurrentDate() {
  const now = new Date();
  const day = String(now.getDate());
  let ordinalIndicator = '';

  if (day === '1' || day === '21' || day === '31') {
    ordinalIndicator = 'st'; 
  } else if (day === '2' || day === '22') {
    ordinalIndicator = 'nd';
  } else if (day === '3' || day === '23') {
    ordinalIndicator = 'rd';
  } else {
    ordinalIndicator = 'th';
  }

  const weekDay = daysOfTheWeek[now.getDay()];
  const month = months[now.getMonth()];
  const year = String(now.getFullYear());
  
  const dateString = `${weekDay}, ${month} ${day}${ordinalIndicator}, ${year}`;
  return dateString;
}

export function displayShortCurrentDate() {
  const now = new Date();
  let day = String(now.getDate());

  if (day.length === 1) {
    day = String(0 + day);
  }

  const month = String(now.getMonth() + 1);
  const year = String(now.getFullYear()).slice(-2);
  const shortDateString = `${day}/${month}/${year}`;
  return shortDateString;
}

displayShortCurrentDate();