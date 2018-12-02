export interface RecursiveMap {
    [key: string]: string | RecursiveMap;
}

export const parseVcalendar = (data: string) => {
    const result: RecursiveMap = {};
    let current = result;
    const referenceStack: RecursiveMap[] = [];
    const regex = /(^[^:]+):(.*)$/gm;
    let m;

    // tslint:disable-next-line:no-conditional-assignment
    while ((m = regex.exec(data)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        /* istanbul ignore if */
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        const name = m[1].trim().toLowerCase();
        // tslint:disable-next-line:no-magic-numbers
        const value = m[2];

        if (name === 'begin') {
            current[value.toLowerCase()] = {};
            referenceStack.push(current);
            current = current[value.toLowerCase()] as RecursiveMap;
            continue;
        }
        if (name === 'end') {
            current = referenceStack.pop()!;
            continue;
        }

        /*
        if (name.startsWith('dtstart')) {
            const parts = name.split(';');
            if (parts.includes('value=date')) {
                current.dtstart = '';
                continue;
            }
            current.dtstart = value;
            continue;
        }*/
        current[name] = value;
    }
    return result;
};

interface CalendarDateTime {
    year: number;
    month: number;
    day: number;
    hour?: number;
    minute?: number;
    second?: number;
    timezone?: string;
}

export interface Event {
    calendarUrl: string;
    summary: string;
    description: string;
    start: CalendarDateTime;
    end: CalendarDateTime;
}

const extractDate = (startKey: string, vEvent: RecursiveMap) => {
    const result: CalendarDateTime = {
        year: 0,
        month: 0,
        day: 0,
    };
    const parts = startKey.split(';');
    const dateValue = vEvent[startKey] as string;

    if (parts.includes('value=date')) {
        // tslint:disable-next-line:no-magic-numbers
        result.year = +dateValue.substr(0, 4);
        // tslint:disable-next-line:no-magic-numbers
        result.month = +dateValue.substr(4, 2);
        // tslint:disable-next-line:no-magic-numbers
        result.day = +dateValue.substr(6, 2);
        return result;
    }
    // tslint:disable-next-line:no-magic-numbers
    result.year = +dateValue.substr(0, 4);
    // tslint:disable-next-line:no-magic-numbers
    result.month = +dateValue.substr(4, 2);
    // tslint:disable-next-line:no-magic-numbers
    result.day = +dateValue.substr(6, 2);
    // tslint:disable-next-line:no-magic-numbers
    result.hour = +dateValue.substr(9, 2);
    // tslint:disable-next-line:no-magic-numbers
    result.minute = +dateValue.substr(11, 2);
    // tslint:disable-next-line:no-magic-numbers
    result.second = +dateValue.substr(13, 2);
    const tzid = parts.find(item => item.startsWith('tzid='));
    /* istanbul ignore else */
    if (tzid) {
        result.timezone = tzid.split('tzid=')[1];
    }
    return result;
};

export const toEvent = (data: RecursiveMap) => {
    const vEvent = ((data.vcalendar as RecursiveMap).vevent as RecursiveMap);
    const startKey = Object.keys(vEvent).find(key => key.startsWith('dtstart'))!;
    const endKey = Object.keys(vEvent).find(key => key.startsWith('dtend'))!;

    const start = extractDate(startKey, vEvent);
    const end = extractDate(endKey, vEvent);

    const result: Event = {
        calendarUrl: '',
        summary: vEvent.summary as string,
        description: vEvent.description as string,
        start,
        end,
    };
    return result;
};