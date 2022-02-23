"use strict";
// jeff,susan,mary,stuart,mahood,martina,dmitri,betty
// jeff:susan,mary,stuart,betty
// susan:mary, jeff
// stuart: jeff, mary
// mahmood: mary,dmitri
// martina: dmitri
// dmitri: martina,betty,mahmood
// betty: jeff,dimitri
exports.__esModule = true;
exports.friendshipData = void 0;
var friendshipData = [
    {
        user_1: "jeff",
        user_2: "susan"
    },
    {
        user_1: "jeff",
        user_2: "mary"
    },
    {
        user_1: "stuart",
        user_2: "jeff"
    },
    {
        user_1: "mary",
        user_2: "stuart"
    },
    {
        user_1: "betty",
        user_2: "jeff"
    },
    {
        user_1: "mary",
        user_2: "mahmood"
    },
    {
        user_1: "mary",
        user_2: "susan"
    },
    {
        user_1: "martina",
        user_2: "dmitri"
    },
    {
        user_1: "betty",
        user_2: "dmitri"
    },
    {
        user_1: "mahmood",
        user_2: "dmitri"
    },
];
exports.friendshipData = friendshipData;
