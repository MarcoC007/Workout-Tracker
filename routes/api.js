const router = require('express').Router();
const { db } = require('../models/Workout');
const Workout = require('../models/Workout');

router.get('/api/workouts', (req, res) => {
    db.Workout.aggregate({
        $addFields: { 
            totalDuration: {
                $sum: '$exercises.duration'
            }
        }
    })
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});

router.post('/api/workouts', ({ body }, res) => {
    Workout.insertMany(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.post('/api/workouts', ({ body }, res) => {
    Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.put('/api/workouts/:id', (req, res) => {
    Workout.update(
       { 
           $id: req.params.id 
        },
       { 
           $push: { exercises: req.body } 
        }
    )
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate({
        $addFields: { 
            totalDuration: {
                $sum: '$exercises.duration'
            }
        }
    })
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;