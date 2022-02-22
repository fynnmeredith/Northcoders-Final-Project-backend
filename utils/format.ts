const formatUsers = (users) => {
  return users.map((user) => {
    return [user.username, user.profile];
  });
};

const formatGoals = (goals) => {
  return goals.map((goal) => {
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

const formatSubgoals = (subgoals) => {
  return subgoals.map((subgoal) => {
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

const formatPosts = (posts) => {
  return posts.map((post) => {
    return [
      post.associated_data_type,
      post.associated_id,
      post.owner,
      formatDatetime(post.datetime),
      post.message,
    ];
  });
};
const formatComments = (comments) => {
  return comments.map((comment) => {
    return [
      comment.post_id,
      comment.owner,
      comment.message,
      formatDatetime(comment.datetime),
    ];
  });
};
const formatReactions = (reactions) => {
  return reactions.map((reaction) => {
    return [reaction.post_id, reaction.owner, reaction.reaction];
  });
};

const formatFriendships = (friendships) => {
  return friendships.map((friendship) => {
    return [friendship.user_1, friendship.user_2];
  });
};

const formatDate = (date: Date | undefined): string | undefined => {
  if (!date) {
    return undefined;
  }

  date = new Date(date);

  const year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();

  if (month.length === 1) {
    month = "0" + month;
  }

  if (day.length === 1) {
    day = "0" + day;
  }

  const formattedDate = year + "-" + month + "-" + day;

  return formattedDate;
};

const formatDatetime = (datetime: Date | undefined): string | undefined => {
  if (!datetime) {
    return undefined;
  }

  datetime = new Date(datetime);

  const year = datetime.getFullYear().toString();
  let month = (datetime.getMonth() + 1).toString();
  let day = datetime.getDate().toString();

  let hour = datetime.getHours().toString();
  let minute = datetime.getMinutes().toString();
  let second = datetime.getSeconds().toString();

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

  const formattedDatetime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return formattedDatetime;
};

export {
  formatUsers,
  formatGoals,
  formatSubgoals,
  formatPosts,
  formatComments,
  formatReactions,
  formatFriendships,
};
