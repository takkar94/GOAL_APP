const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel')
const User = require('../models/userModel')


const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find({user: req.user.id});
    console.log('goals');
    res.status(200).json(goals)
})
 

const setGoal =asyncHandler (async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add the text');
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})


const updateGoal =asyncHandler (async (req,res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error('Please add the id');
    }

    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401)
        throw new Error("Not valid as user not found")
    }

    //making sure the logged in user matches the goal user
    if(goal.user.toStrinf() != user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(goal, req.body, {new: true})

    res.status(200).json(updatedGoal)
} )


const deleteGoal =asyncHandler (async (req,res) => {
    const goal = await Goal.findById(req.params.id);
    
    if(!goal){
        res.status(400)
        throw new Error('Please add the id');
    }

    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401)
        throw new Error("Not valid as user not found")
    }

    //making sure the logged in user matches the goal user
    if(goal.user.toString() != user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }


    const deleteGoal = await Goal.findByIdAndDelete(req.params.id)
    
    res.status(200).json("The goal is deleted")
} )

module.exports = {getGoals, setGoal ,updateGoal, deleteGoal};