type ProgressPoint = [Date, Number];

interface User {
  username: String;
  profile: String;
}

interface Goal {
  goal_id: Number;
  objective: String;
  description: String;
  start_date?: Date;
  end_date: Date;
  type: "progress" | "boolean";
  status: "active" | "completed";
  owner: String;
  target_value?: Number;
  unit?: String;
  progress?: ProgressPoint[];
}

interface Subgoal {
  subgoal_id: Number;
  goal_id: Number;
  objective: String;
  start_date?: Date;
  end_date: Date;
  type: "progress" | "boolean";
  status: "active" | "completed";
  owner: String;
  target_value?: Number;
  unit?: String;
  progress?: ProgressPoint[];
  finish_date?: Date;
}

export { User, Goal, Subgoal };
