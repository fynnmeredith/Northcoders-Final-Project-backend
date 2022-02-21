const formatSubgoals = ( subgoals ) => {

    return subgoals.map((subgoal) => {

        return [ subgoal.goal_id, subgoal.objective, formatDate(subgoal.start_date), formatDate(subgoal.end_date), subgoal.type, subgoal.status, subgoal.owner, subgoal.target_value, subgoal.unit, JSON.stringify(subgoal.progress) ]

    })

}

const formatDate = ( date:Date|undefined ): String|undefined => {

    if (!date) {

        return undefined

    }

    const year = date.getFullYear().toString()
    let month = date.getMonth().toString()
    let day = date.getDate().toString()

    if (month.length === 1) {

        month = '0' + month

    }

    if (day.length === 1) {

        day = '0' + day

    }

    const formattedDate = year + '-' + month + '-' + day

    console.log(formattedDate)

    return formattedDate

}

export { formatSubgoals }