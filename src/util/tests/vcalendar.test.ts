import { readFileSync } from 'fs';
import { resolve } from 'path';
import { parseVcalendar, toEvent } from '../vcalendar';

const exampleVcalendarData = readFileSync(resolve(__dirname, 'vcalendarExample.txt')).toString();

test('vcalendar parse', () => {
    expect(parseVcalendar(exampleVcalendarData)).toMatchSnapshot();
});

test('vcalendar toEvent', () => {
    expect(
        toEvent(parseVcalendar(exampleVcalendarData)),
    ).toMatchSnapshot();
    // tslint:disable-next-line:no-any
    const rawData: any = parseVcalendar(exampleVcalendarData);
    delete rawData.vcalendar.vevent['dtstart;value=date'];
    delete rawData.vcalendar.vevent['dtend;value=date'];
    expect(
        toEvent({
            ...rawData,
            vcalendar: {
                ...rawData.vcalendar,
                vevent: {
                    ...rawData.vcalendar.vevent,
                    'dtstart;tzid=europe/london': '20181121T110500',
                    'dtend;tzid=europe/london': '20181121T161500',
                },
            },
        }),
    ).toMatchSnapshot();
});