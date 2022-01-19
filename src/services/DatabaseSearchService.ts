const mongoose = require('mongoose');

export class DatabaseSearchService {

    public search(searchText: string, matchOptions: string): Promise<any> {

        const keywords = searchText.toLowerCase().split(' ');
       
        let regex = keywords.join("|") ;
        if (matchOptions === "and") {
            const keywordsForAndRegEx = keywords.map(keyword => "(?=.*" + keyword + ")");
            regex = keywordsForAndRegEx.join("") ;
        }
    
        console.log("service search [" + keywords + "] with regex [", regex, "] with match option [", matchOptions, "]");

        const CombinedSicActivity = mongoose.model('CombinedSicActivity');
        return CombinedSicActivity.find({ "activity_description_lower_case" : { $regex : new RegExp(regex) }});
    }

}
