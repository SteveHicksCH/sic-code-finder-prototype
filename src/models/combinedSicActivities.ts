const mongoose = require('mongoose');

const combinedSicActivitySchema = new mongoose.Schema({
    sic_code: {
        type: String,
        required: true
    },
    sic_description: {
        type: String,
        required: true
    },
    activity_description: {
        type: String,
        required: true
    },
    activity_description_lower_case: {
        type: String,
        required: true
    }
}, { collection: 'combined_sic_activities' })
mongoose.model('CombinedSicActivity', combinedSicActivitySchema );
