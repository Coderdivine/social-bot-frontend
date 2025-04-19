import moment from 'moment';

export function formatDateISO(value) {
  return moment(value).toISOString();
}
