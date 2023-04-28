const mongoose = require('mongoose');

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

const Job = mongoose.model('Job', jobSchema, 'job');