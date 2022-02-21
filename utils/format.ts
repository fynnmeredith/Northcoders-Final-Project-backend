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
      // post.datetime,
      post.message,
    ];
  });
};
const formatComments = (comments) => {
  return comments.map((comment) => {
    return [comment.post_id, comment.owner, comment.message, 
      // comment.datetime
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

const formatDate = (date: Date | undefined): String | undefined => {
  if (!date) {
    return undefined;
  }

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

  console.log(formattedDate);

  return formattedDate;
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
