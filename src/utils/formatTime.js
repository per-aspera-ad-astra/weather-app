import { DateTime } from 'luxon';

export function formatUnixTime(
  unixTime,
  timezoneOffset,
  format = 'ccc, dd LLL yyyy HH:mm'
) {
  return DateTime.fromSeconds(unixTime, { zone: 'utc' })
    .plus({ seconds: timezoneOffset })
    .toFormat(format);
}
