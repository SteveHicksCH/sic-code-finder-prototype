const mongoose = require('mongoose');

export class DatabaseSearchService {

    // think about changing any if I introduce an interface for the mongoose model∑
    public search(searchText: string): Promise<any> {

        const searchTextLowerCase = searchText.toLowerCase();

        console.log("service search [" + searchTextLowerCase + "]");

        const CombinedSicActivity = mongoose.model('CombinedSicActivity');
        return CombinedSicActivity.find({ "activityDescriptionLowerCase" : { $regex : new RegExp(searchTextLowerCase) }});
    }

}
