"use strict";
exports.__esModule = true;
var goalData = [
    {
        objective: "Run 120km",
        description: "Getting in shape",
        start_date: new Date(2022, 1, 7),
        end_date: new Date(2022, 2, 6),
        type: "progress",
        status: "active",
        owner: "jeff",
        target_value: 120,
        unit: "km",
        progress: [
            [new Date(2022, 1, 8), 10],
            [new Date(2022, 1, 8), 20],
            [new Date(2022, 1, 10), 30],
            [new Date(2022, 1, 15), 40],
            [new Date(2022, 1, 17), 50],
        ]
    },
    {
        objective: "Write novella",
        description: "Complete the novella I've been working on",
        start_date: new Date(2022, 1, 9),
        end_date: new Date(2022, 2, 4),
        type: "boolean",
        status: "active",
        owner: "jeff"
    },
    {
        objective: "Save £800",
        description: "Save for holiday",
        start_date: new Date(2022, 0, 7),
        end_date: new Date(2022, 4, 6),
        type: "progress",
        status: "active",
        owner: "mary",
        target_value: 800,
        unit: "£",
        progress: [[new Date(2022, 0, 29), 200]]
    },
    {
        objective: "Redecorate bedroom",
        description: "Spruce up the abode",
        start_date: new Date(2022, 1, 21),
        end_date: new Date(2022, 2, 14),
        type: "boolean",
        status: "active",
        owner: "mahmood"
    },
    {
        objective: "Achieve 100m freestyle PB",
        description: "Meet me, I swim like a fish",
        start_date: new Date(2022, 0, 1),
        end_date: new Date(2022, 5, 30),
        type: "boolean",
        status: "completed",
        owner: "stuart",
        finish_date: new Date(2022, 1, 10)
    },
    {
        objective: "Complete triathlon",
        description: "Triple threat",
        start_date: new Date(2022, 0, 1),
        end_date: new Date(2022, 11, 31),
        type: "boolean",
        status: "active",
        owner: "betty"
    },
    {
        objective: 'Learn to play "Smells Like Teen Spirit" on guitar',
        description: "Trying to start a Nirvana cover band",
        start_date: new Date(2022, 1, 1),
        end_date: new Date(2022, 1, 28),
        type: "boolean",
        status: "completed",
        owner: "dmitri",
        finish_date: new Date(2022, 1, 14)
    },
    {
        objective: 'Learn to play "Come As You Are" on guitar',
        description: "Trying to start a Nirvana cover band",
        start_date: new Date(2022, 2, 1),
        end_date: new Date(2022, 2, 28),
        type: "boolean",
        status: "active",
        owner: "dmitri"
    },
    {
        objective: 'Learn to play "Lithium" on guitar',
        description: "Trying to start a Nirvana cover band",
        start_date: new Date(2022, 3, 1),
        end_date: new Date(2022, 3, 28),
        type: "boolean",
        status: "active",
        owner: "dmitri"
    },
    {
        objective: 'Learn to play "In Bloom" on guitar',
        description: "Trying to start a Nirvana cover band",
        start_date: new Date(2022, 4, 1),
        end_date: new Date(2022, 4, 28),
        type: "boolean",
        status: "active",
        owner: "dmitri"
    },
    {
        objective: 'Learn to play "You Know You\'re Right" on guitar',
        description: "Trying to start a Nirvana cover band",
        start_date: new Date(2022, 5, 1),
        end_date: new Date(2022, 5, 28),
        type: "boolean",
        status: "active",
        owner: "dmitri"
    },
    {
        objective: 'Learn to play "Heart-Shaped Box" on guitar',
        description: "Trying to start a Nirvana cover band",
        start_date: new Date(2022, 6, 1),
        end_date: new Date(2022, 6, 28),
        type: "boolean",
        status: "active",
        owner: "dmitri"
    },
    {
        objective: 'Learn to play "Pennyroyal Tea" on guitar',
        description: "Trying to start a Nirvana cover band",
        start_date: new Date(2022, 0, 1),
        end_date: new Date(2022, 0, 28),
        type: "boolean",
        status: "completed",
        owner: "dmitri",
        finish_date: new Date(2022, 0, 21)
    },
    {
        objective: "Finish cool coding project",
        description: "Wanna be a coding boss",
        start_date: new Date(2022, 1, 28),
        end_date: new Date(2022, 1, 28),
        type: "boolean",
        status: "active",
        owner: "jeff"
    },
    {
        objective: "Finish awesome coding project",
        description: "Wanna be a coding king",
        start_date: new Date(2022, 2, 1),
        end_date: new Date(2022, 2, 1),
        type: "boolean",
        status: "active",
        owner: "jeff"
    },
    {
        objective: "Write 1000 lines of code",
        description: "Wanna be a coding don",
        start_date: new Date(2022, 1, 28),
        end_date: new Date(2022, 1, 28),
        type: "progress",
        status: "active",
        owner: "jeff",
        target_value: 1000,
        unit: "lines",
        progress: []
    },
    {
        objective: "Write 2000 lines of code",
        description: "Wanna be a coding master",
        start_date: new Date(2022, 2, 1),
        end_date: new Date(2022, 2, 1),
        type: "progress",
        status: "active",
        owner: "jeff",
        target_value: 2000,
        unit: "lines",
        progress: []
    },
    {
        objective: "Finish mindbending coding project",
        description: "Wanna be a coding doyen",
        start_date: new Date(2022, 2, 1),
        end_date: new Date(2022, 2, 1),
        type: "boolean",
        status: "active",
        owner: "jeff"
    },
    {
        objective: "Finish radical coding project",
        description: "Wanna be a coding legend",
        start_date: new Date(2022, 2, 1),
        end_date: new Date(2022, 2, 1),
        type: "boolean",
        status: "active",
        owner: "jeff"
    },
    {
        objective: "Play six rounds of golf in three days",
        description: "Getting into the swing of things",
        start_date: new Date(2022, 2, 2),
        end_date: new Date(2022, 2, 4),
        type: "boolean",
        status: "active",
        owner: "jeff"
    },
];
exports.goalData = goalData;
