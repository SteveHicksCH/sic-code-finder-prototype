const mongoose = require('mongoose');

const combinedSicActivitySchema = new mongoose.Schema({
    sicCode: {
        type: String,
        required: true
    },
    sicDescription: {
        type: String,
        required: true
    },
    activityDescription: {
        type: String,
        required: true
    },
    activityDescriptionLowerCase: {
        type: String,
        required: true
    }
}, { collection: 'combined_sic_activities' })
mongoose.model('CombinedSicActivity', combinedSicActivitySchema );
