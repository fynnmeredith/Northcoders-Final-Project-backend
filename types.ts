import { getAllJSDocTagsOfKind, NoSubstitutionTemplateLiteral } from "typescript"

type ProgressPoint = [Date, Number]

interface Subgoal {

    subgoal_id: Number,
    goal_id: Number,
    objective: String,
    start_date?: Date,
    end_date: Date,
    type: 'progress'|'boolean', 
    status: 'active'|'completed', 
    owner: String, 
    target_value?: Number,
    unit?: String,
    progress?: ProgressPoint[]

}

const subgoalA: Subgoal = {
    subgoal_id: 2,
    goal_id: 3,
    objective: 'Save £200',
    start_date: new Date(2022, 2, 1),
    end_date: new Date(2022, 2, 22),
    type: 'progress',
    status: 'active',
    owner: 'jeff',
    target_value: 800,
    unit: '£',
    progress: [[new Date(2022, 2, 4), 32]]
}

export  { Subgoal }