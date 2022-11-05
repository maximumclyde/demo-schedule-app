/**
 * THESE ARE DUMMY DATA USED TO SIMULATE A BACKEND
 * THESE ARE TO BE FED TO REDUX
 */


export const DUMMY_EVENTS = [
    {
        id: 'e1',
        title: 'Event Title 1',
        description: 'This is a dummy description for the sake of developement',
        startDay: {
            date: 31,
            month: 9,
            year: 2022
        },
        endDay: {
            date: 3,
            month: 10,
            year: 2022
        },
        startTime: '00:00',
        endTime: '23:00',
        repetition: 'NO_REPETITION',
        weekdays: '',
        duration: 3,
        break: 0,
        type: 'EVENT'
    },
    {
        id: 'e2',
        title: 'Event Title 2',
        description: 'This is a dummy description for the sake of developement',
        startDay: {
            date: 1,
            month: 10,
            year: 2022
        },
        endDay: {
            date: 2,
            month: 11,
            year: 2022
        },
        startTime: '09:00',
        endTime: '12:00',
        repetition: 'WEEK',
        weekdays: 'thufri',
        duration: 2,
        break: 1,
        type: 'LECTURE'
    },
    {
        id: 'e3',
        title: 'Event Title 3',
        description: 'This is a dummy description for the sake of developement',
        startDay: {
            date: 1,
            month: 10,
            year: 2022
        },
        endDay: {
            date: 4,
            month: 10,
            year: 2022
        },
        startTime: '14:00',
        endTime: '16:30',
        repetition: 'MONTH',
        weekdays: '',
        duration: 1,
        break: 0,
        type: 'MEETING'
    },
    {
        id: 'e4',
        title: 'Event Title 4',
        description: 'This is a dummy description for the sake of developement',
        startDay: {
            date: 16,
            month: 10,
            year: 2022
        },
        endDay: {
            date: 16,
            month: 10,
            year: 9999
        },
        startTime: '00:00',
        endTime: '23:00',
        repetition: 'YEAR',
        weekdays: '',
        duration: 1,
        break: 0,
        type: 'BIRTHDAY'
    },
    {
        id: 'e5',
        title: 'Event Title 5',
        description: 'This is a dummy description for the sake of developement',
        startDay: {
            date: 6,
            month: 11,
            year: 2022
        },
        endDay: {
            date: 7,
            month: 11,
            year: 2022
        },
        startTime: '14:00',
        endTime: '16:30',
        repetition: 'MONTH',
        weekdays: '',
        duration: 1,
        break: 0,
        type: 'MEETING'
    },
];

/**
 * TYPES_OF_EVENTS=[
 *  'EVENT',
 *  'LECTURE',
 *  'MEETING',
 *  'BIRTHDAY'
 * ]
 */

/**
 * TYPES_OF_REPETITIONS = [
 *  'NO_REPETITION',
 *  'DAY',
 *  'WEEK',
 *  'MONTH',
 *  'YEAR'
 * ]
 * THE USER CAN SET A REPETITION DURATION AND A BREAK
 */

export const DUMMY_MEETING_INFORMATION = [
    {
        id: 'e3',
        team: 'Marketing team',
        coordinator: {
            id: 'c1',
            name: 'Mark W.'
        },
        partecipants: [
            {
                id: 'Worker 2',
                name: 'Elma S.'
            },
            {
                id: 'USER',
                name: 'Klajdi M.'
            }
        ]
    },
    {
        id: 'e5',
        team: 'Developer team',
        coordinator: {
            id: 'c1',
            name: 'Mark W.'
        },
        partecipants: [
            {
                id: 'Worker 2',
                name: 'Elma S.'
            },
            {
                id: 'USER',
                name: 'Klajdi M.'
            }
        ]
    }
];

export const DUMMY_WORKERS = [
    {
        id: 'Worker 2',
        name: 'Elma S.'
    },
    {
        id: 'USER',
        name: 'Klajdi M.'
    },
    {
        id: 'c1',
        name: 'Mark W.'
    }
]

export const DUMMY_PROFESSORS = [
    {
        id: 'p1',
        name: 'Helm P.',
        title: 'PhD.'
    },
    {
        id: 'p2',
        name: 'Alan R.',
        title: 'PhD.'
    },
    {
        id: 'p3',
        name: 'Charlie A.',
        title: 'PhD.'
    },
    {
        id: 'p4',
        name: 'Berta S.',
        title: 'PhD.'
    },
]

export const DUMMY_LECTURE_INFORMATION = [
    {
        id: 'e2',
        credits: 6,
        professorId: 'p1'
    }
]