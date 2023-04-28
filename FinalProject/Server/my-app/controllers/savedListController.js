const SavedList = require('../models/saved_list.js');

//Add a job to a user's saved list
exports.addJobToSavedList = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const jobData = req.body;

    let savedList = await SavedList.findOne({ userId });

    if (!savedList) {
      savedList = new SavedList({ userId, jobs: [jobData] });
    } else {
      if (savedList.jobs.some(job => job.link == jobData.link)) {
        return res.status(400).json({ message: 'Job already in saved list' });
      }
      savedList.jobs.push(jobData);
    }

    await savedList.save();
    res.status(200).json({ message: 'Job added to saved list' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

};

//Get all of the saved jobs for a user
exports.getSavedJobs = async (req, res) => {
  try {
    const userId = req.session.user._id;

    const savedList = await SavedList.findOne({ userId }).lean();

    if (!savedList) {
      return res.status(404).json({ message: 'Saved list not found', jobs: [] });
    }

    res.status(200).json({ jobs: savedList.jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Remove a job from a user's saved list
exports.removeJobFromSavedList = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const jobId = req.query.jobId;

    const savedList = await SavedList.findOne({ userId });

    if (!savedList) {
      return res.status(404).json({ message: 'Saved list not found' });
    }

    const index = savedList.jobs.findIndex(job => 
      job._id == jobId
    );

    if (index === -1) {
      return res.status(404).json({ message: 'Job not found in saved list' });
    }

    savedList.jobs.splice(index, 1);
    await savedList.save();

    res.status(200).json({ message: 'Job removed from saved list' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Search using a keyword
exports.searchSavedJobs = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const keyword = req.query.query.toLowerCase();

    const savedList = await SavedList.findOne({ userId });

    if (!savedList) {
      return res.status(404).json({ message: 'You do not have a saved list yet!' });
    }

    const matchedJobs = savedList.jobs.filter(job =>
      job.position_title.toLowerCase().includes(keyword) ||
      job.organization_name.toLowerCase().includes(keyword) ||
      job.location.toLowerCase().includes(keyword) ||
      job.description.toLowerCase().includes(keyword) ||
      job.qualifications.toLowerCase().includes(keyword)
    );

    res.status(200).json(matchedJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.removeAllJobsFromSavedList = async (req, res) => {
  try {
    const userId = req.session.user._id;

    const savedList = await SavedList.findOne({ userId });

    if (!savedList) {
      return res.status(404).json({ message: 'Saved list not found' });
    }

    savedList.jobs = []; // Set the jobs array to an empty array
    await savedList.save(); // Save the updated document

    res.status(200).json({ message: 'All jobs removed from saved list' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



