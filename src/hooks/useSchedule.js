import { useState } from 'react';
import moment from 'moment';

export function useSchedule() {
  const [scheduleTime, setScheduleTime] = useState(moment().format('YYYY-MM-DDTHH:mm'));
  function formatSchedule() {
    return moment(scheduleTime).toISOString();
  }
  return { scheduleTime, setScheduleTime, formatSchedule };
}
