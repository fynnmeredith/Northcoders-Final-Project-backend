"use strict";
// jeff,susan,mary,stuart,mahood,martina,dmitri,betty
// jeff:susan,mary,stuart,betty
// susan:mary, jeff
// stuart: jeff, mary
// mahood: mary
// martina: dmitri
// dmitri: martina
// betty: jeff
exports.__esModule = true;
exports.friendshipData = void 0;
var friendshipData = [
    {
        user_1: 'jeff',
        user_2: 'susan'
    },
    {
        user_1: 'jeff',
        user_2: 'mary'
    },
    {
        user_1: 'stuart',
        user_2: 'jeff'
    },
    {
        user_1: 'mary',
        user_2: 'stuart'
    },
    {
        user_1: 'betty',
        user_2: 'jeff'
    },
    {
        user_1: 'mary',
        user_2: 'mahood'
    },
    {
        user_1: 'mary',
        user_2: 'susan'
    },
    {
        user_1: 'martina',
        user_2: 'dmitri'
    }
];
exports.friendshipData = friendshipData;
