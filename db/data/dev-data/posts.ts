//jeff,susan,mary,stuart,mahood,martina,dmitri,betty
const postData = [
{
    associated_data_type:'goal',
    associated_id:1,
    owner:'jeff',
    datetime:new Date().setDate(-2),
    message:'Learn Guitar'
},
{
    associated_data_type:'subgoal',
    associated_id:1,
    owner:'jeff',
    datetime:new Date().setDate(-4),
    message:'Learn Smoke on Water'
},
{
    associated_data_type:'subgoal',
    associated_id:1,
    owner:'susan',
    datetime:new Date().setDate(-30),
    message:'Knit jumper'
},
{
    associated_data_type:'subgoal',
    associated_id:1,
    owner:'susan',
    datetime:new Date().setDate(-5),
    message:'Become knit master'
},
{
    associated_data_type:'goal',
    associated_id:4,
    owner:'betty',
    datetime:new Date(),
    message:'learn to rock climb'
}
]

export { postData }