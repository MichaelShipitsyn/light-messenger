import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const formatTime = (time: string) => {
  const now = dayjs(undefined, 'DD.MM.YYYY');
  const formattedTime = dayjs(time, 'DD.MM.YYYY');

  if (now.diff(formattedTime, 'second', true) < 60) {
    return formattedTime.fromNow();
  }

  if (now.diff(formattedTime, 'minute', true) < 60) {
    return formattedTime.fromNow();
  }

  if (now.diff(formattedTime, 'hour', true) <= 4) {
    return formattedTime.fromNow();
  }

  if (now.diff(formattedTime, 'hour', true) < 12) {
    return dayjs(formattedTime).format('hh:mm A');
  }

  if (now.diff(formattedTime, 'day', true) < 4) {
    return formattedTime.format('DD.MM.YYYY');
  }

  if (now.diff(formattedTime, 'day', true) < 7) {
    return formattedTime.fromNow();
  }

  if (now.diff(formattedTime, 'month', true) > 1) {
    return formattedTime.format('DD.MM.YYYY');
  }

  return formattedTime.format('DD.MM.YYYY');
};
