const mongoose = require('mongoose');

//Job model is stored in the saved list model because we are not storing jobs in the database, we are just storing the job id and the date it was added to the saved list
const jobSchema = new mongoose.Schema({
    position_title : { type: String, required: true },
    organization_name : { type: String, required: true },
    low_range : { type: Number, required: true },
    high_range : { type: Number, required: true },
    remuneration : { type: String, required: true },
    location : { type: String, required: true },
    description : { type: String, required: true },
    qualifications : { type: String, required: true },
    link : { type: String, required: true },
});

const savedListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobs: [jobSchema],
});

const SavedList = mongoose.model('SavedList', savedListSchema, 'saved_list');
module.exports = SavedList;
