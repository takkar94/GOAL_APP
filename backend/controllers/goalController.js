const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel')

const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find();
    console.log('goals');
    res.status(200).json(goals)
})
 

const setGoal =asyncHandler (async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add the text');
    }
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
})


const updateGoal =asyncHandler (async (req,res) => {
    const goal = await Goal.find(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error('Please add the id');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal)
} )


const deleteGoal =asyncHandler (async (req,res) => {
    res.status(200).json({message:  `Delete goals ${req.params.id}`})
} )

module.exports = {getGoals, setGoal ,updateGoal, deleteGoal};