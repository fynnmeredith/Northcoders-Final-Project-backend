"use strict";
exports.__esModule = true;
exports.formatFriendships = exports.formatReactions = exports.formatComments = exports.formatPosts = exports.formatSubgoals = exports.formatGoals = exports.formatUsers = void 0;
var formatUsers = function (users) {
    return users.map(function (user) {
        return [user.username, user.profile];
    });
};
exports.formatUsers = formatUsers;
var formatGoals = function (goals) {
    return goals.map(function (goal) {
        return [
            goal.objective,
            goal.description,
            formatDate(goal.start_date),
            formatDate(goal.end_date),
            goal.type,
            goal.status,
            goal.owner,
            goal.target_value,
            goal.unit,
            JSON.stringify(goal.progress),
            formatDate(goal.finish_date),
        ];
    });
};
exports.formatGoals = formatGoals;
var formatSubgoals = function (subgoals) {
    return subgoals.map(function (subgoal) {
        return [
            subgoal.goal_id,
            subgoal.objective,
            formatDate(subgoal.start_date),
            formatDate(subgoal.end_date),
            subgoal.type,
            subgoal.status,
            subgoal.owner,
            subgoal.target_value,
            subgoal.unit,
            JSON.stringify(subgoal.progress),
            formatDate(subgoal.finish_date),
        ];
    });
};
exports.formatSubgoals = formatSubgoals;
var formatPosts = function (posts) {
    return posts.map(function (post) {
        return [
            post.associated_data_type,
            post.associated_id,
            post.owner,
            formatDatetime(post.datetime),
            post.message,
        ];
    });
};
exports.formatPosts = formatPosts;
var formatComments = function (comments) {
    return comments.map(function (comment) {
        return [
            comment.post_id,
            comment.owner,
            comment.message,
            formatDatetime(comment.datetime),
        ];
    });
};
exports.formatComments = formatComments;
var formatReactions = function (reactions) {
    return reactions.map(function (reaction) {
        return [reaction.post_id, reaction.owner, reaction.reaction];
    });
};
exports.formatReactions = formatReactions;
var formatFriendships = function (friendships) {
    return friendships.map(function (friendship) {
        return [friendship.user_1, friendship.user_2];
    });
};
exports.formatFriendships = formatFriendships;
var formatDate = function (date) {
    if (!date) {
        return undefined;
    }
    date = new Date(date);
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 1).toString();
    var day = date.getDate().toString();
    if (month.length === 1) {
        month = "0" + month;
    }
    if (day.length === 1) {
        day = "0" + day;
    }
    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
};
var formatDatetime = function (datetime) {
    if (!datetime) {
        return undefined;
    }
    datetime = new Date(datetime);
    var year = datetime.getFullYear().toString();
    var month = (datetime.getMonth() + 1).toString();
    var day = datetime.getDate().toString();
    var hour = datetime.getHours().toString();
    var minute = datetime.getMinutes().toString();
    var second = datetime.getSeconds().toString();
    if (month.length === 1) {
        month = "0" + month;
    }
    if (day.length === 1) {
        day = "0" + day;
    }
    if (hour.length === 1) {
        hour = "0" + hour;
    }
    if (minute.length === 1) {
        minute = "0" + minute;
    }
    if (second.length === 1) {
        second = "0" + second;
    }
    var formattedDatetime = "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hour, ":").concat(minute, ":").concat(second);
    return formattedDatetime;
};
