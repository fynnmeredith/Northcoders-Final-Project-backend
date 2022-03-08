"use strict";
// jeff,susan,mary,stuart,mahood,martina,dmitri,betty
// jeff:susan,mary,stuart,betty
// susan:mary, jeff
// stuart: jeff, mary, dmitri
// mahmood: mary,dmitri
// martina: noone
// dmitri: stuart,betty,mahmood
// betty: jeff,dimitri
exports.__esModule = true;
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
        user_1: "stuart",
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
    {
        user_1: "fynn",
        user_2: "andrew"
    },
    {
        user_1: "fynn",
        user_2: "ben"
    },
    {
        user_1: "fynn",
        user_2: "joe"
    },
    {
        user_1: "fynn",
        user_2: "michael"
    },
    {
        user_1: "andrew",
        user_2: "ben"
    },
    {
        user_1: "andrew",
        user_2: "joe"
    },
    {
        user_1: "andrew",
        user_2: "michael"
    },
    {
        user_1: "ben",
        user_2: "joe"
    },
    {
        user_1: "ben",
        user_2: "michael"
    },
    {
        user_1: "joe",
        user_2: "michael"
    },
];
exports.friendshipData = friendshipData;
