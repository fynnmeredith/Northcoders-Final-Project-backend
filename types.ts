type ProgressPoint = [Date, number];

interface User {
  username: string;
  profile: string;
}

interface Goal {
  goal_id: number;
  objective: string;
  description: string;
  start_date?: Date;
  end_date: Date;
  type: "progress" | "boolean";
  status: "active" | "completed";
  owner: string;
  target_value?: number;
  unit?: string;
  progress?: ProgressPoint[];
  finish_date?: Date;
}

interface Subgoal {
  subgoal_id: number;
  goal_id: number;
  objective: string;
  start_date?: Date;
  end_date: Date;
  type: "progress" | "boolean";
  status: "active" | "completed";
  owner: string;
  target_value?: number;
  unit?: string;
  progress?: ProgressPoint[];
  finish_date?: Date;
}

interface CustomError {
  status: number;
  message: string;
}

interface Friendship {
  friendship_id: number;
  user_1: string;
  user_2: string;
}

interface Reaction {
  reaction_id: number;
  post_id: number;
  owner: string;
  reaction: string;
}

export {
  ProgressPoint,
  CustomError,
  User,
  Goal,
  Subgoal,
  Friendship,
  Reaction,
};
