const express = require('express');
const router = express.Router();
const axios = require('axios');
const savedListController = require('../controllers/savedListController');
const ensureAuthentication = require('../middleware/ensureAuthentication');
const jobDataController = require('../controllers/jobDataController');

//If using for European job listings 
const ADZUNA_BASE_URL = 'https://api.adzuna.com/v1/api/jobs/gb/search';
const ADZUNA_APP_ID = '16a57661';
const ADZUNA_APP_KEY = '4b3debc51dbfe806da2cfdc90b20ad71';

//If using for US job listings
const USAJOBS_BASE_URL = 'https://data.usajobs.gov/api/search';
//Headers for USAJOBS API
const USAJOBS_AUTHORIZATION = 'eqZopqznQlnIvQF9cj3OgQNjqO9fY/n+0llgOg5SvPE=';
const USAJOBS_HOST = 'data.usajobs.gov';
const USAJOBS_USER_AGENT = 'gress2123@uwlax.edu';

//This is a route that will return all the jobs that match the query parameters (USA JOBS)
router.get('/jobs', async (req, res, next) => {
  try {
    //These are all the different possible query parameters that can be passed in
    const keyword = req.query.keyword || '';
    const location = req.query.location || '';
    const jobCategory = req.query.jobCategory || '';
    const payGradeHigh = req.query.payGradeHigh || '';
    const payGradeLow = req.query.payGradeLow || '';

    const response = await axios.get(`${USAJOBS_BASE_URL}/`, {
      params: {
        Keyword : keyword,
      },
      headers: {
        'Authorization-Key' : USAJOBS_AUTHORIZATION,
        'Host' : USAJOBS_HOST,
        'User-Agent' : USAJOBS_USER_AGENT,
      },
    });
    //log the url

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//ROUTES FOR SAVING JOBS
//This is a route that will save a job to the database (user is sent in the session and the job information is sent in the body so a new job can be created and stored)
router.post('/jobs', ensureAuthentication, savedListController.addJobToSavedList);

//This is a route that will return all the jobs that the user saved
router.get('/savedJobs', ensureAuthentication, savedListController.getSavedJobs);

//This is a route that will remove a job from a users saved list (id of the job to be removed is in the body)
router.delete('/savedJobs', ensureAuthentication, savedListController.removeJobFromSavedList);

//This is a route that will return all the jobs that match the query parameters 
router.get('/savedJobs/list', ensureAuthentication, savedListController.searchSavedJobs);

//This is a route that will remove all jobs from the users saved list
router.delete('/savedJobs/all', ensureAuthentication, savedListController.removeAllJobsFromSavedList);

//ROUTES FOR JOB DATA
//projections
router.get('/projections/data', ensureAuthentication, jobDataController.getProjections);
//salaries
router.get('/salaries/data', ensureAuthentication, jobDataController.getSalaries);

module.exports = router;

