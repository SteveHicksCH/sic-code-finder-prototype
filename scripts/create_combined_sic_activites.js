
db.combined_sic_activities.drop()

db.economic_activity_sic_codes.aggregate([
    { $lookup:
        {
           from: "condensed_sic_codes",
           localField: "sic_code",
           foreignField: "sic_code",
           as: "sic_record"
        }
    },
    {
        $unwind:"$sic_record"
    },
    {
        $project:{
            "_id":1,
            "sic_code" : 1,
            "activity_description" : 1,
            "sic_description" : "$sic_record.sic_description"
        }
    },
    { $out : "combined_sic_activities"}
]);

db.combined_sic_activities.createIndex( { "sic_code" : 1 } )
