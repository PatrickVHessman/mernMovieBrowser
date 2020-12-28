const express = require('express');
const router = express.Router();

const Movie = require('../models/movie');

router.get('/', (req, res) => {
    const str = "dinosaur"
    const blankStr = '';
    // Movie.find({fullplot: {$regex: str}, year: 1993})
    Movie.find({fullplot: {$regex: str, $options : 'i'}, title: {$regex: blankStr, $options : 'i'}})
        .then(Movies => {
        res.json(Movies)
        })
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    let query = {};
    if (req.body.query.titleKeyword !== '') {
        query = {
            ...query,
            title: {$regex: req.body.query.titleKeyword, $options : 'i'}
        }
    }
    if (req.body.query.plotKeyword !== '') {
        query = {
            ...query,
            plot: {$regex: req.body.query.plotKeyword, $options : 'i'}
        }
    }
    if (req.body.query.director !== '') {
        query = {
            ...query,
            directors: {$regex: req.body.query.director, $options : 'i'}
        }
    }
   
    Movie.find(query)
        .then(Movies => {
        res.json(Movies)
        })
        .catch(err => console.log(err))
})

module.exports = router