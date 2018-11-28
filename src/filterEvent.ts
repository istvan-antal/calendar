import { Event } from './vcalendar';
import { DateTime } from 'luxon';

export default (event: Event, referenceTime: DateTime, view: 'month') => true;