import moment from 'moment-timezone'

function guessTimezone() {
  // Moment Timezone uses the Internationalization API (Intl.DateTimeFormat().resolvedOptions().timeZone)
  // in supported browsers to determine the user's time zone.

  // On other browsers, time zone detection is rather tricky to get right,
  // as there is little information provided by those browsers.
  // For those, it will use Date#getTimezoneOffset and Date#toString on a handful of moments around the current year
  // to gather as much information about the browser environment as possible.
  // It then compares that information with all the time zone data loaded and returns the closest match.
  // In case of ties, the time zone with the city with largest population is returned.
  return moment.tz.guess()
}

export { guessTimezone }
