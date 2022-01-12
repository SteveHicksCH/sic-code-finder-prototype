
db.combined_sic_activities.drop()

db.economic_activity_sic_codes.aggregate([
    { $lookup:
        {
           from: "condensed_sic_codes",
           localField: "sicCode",
           foreignField: "sicCode",
           as: "sicRecord"
        }
    },
    {
        $unwind:"$sicRecord"
    },
    {
        $project:{
            "_id":1,
            "sicCode" : 1,
            "activityDescription" : 1,
            "activityDescriptionLowerCase" : { $toLower: "$activityDescription"},
            "sicDescription" : "$sicRecord.sicDescription"
        }
    },
    { $out : "combined_sic_activities"}
]);

db.combined_sic_activities.createIndex( { "sicCode" : 1 } )
