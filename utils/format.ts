const formatSubgoals = ( subgoals ) => {

    return subgoals.map((subgoal) => {

        return [ subgoal.goal_id, subgoal.objective, /*  subgoal.start_date, subgoal.end_date, */ subgoal.type, subgoal.status, subgoal.owner, subgoal.target_value, subgoal.unit/* , subgoal.progress */ ]

    })

}

export { formatSubgoals }