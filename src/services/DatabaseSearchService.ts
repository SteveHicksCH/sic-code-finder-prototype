const mongoose = require('mongoose');

export class DatabaseSearchService {

    // think about changing any if I introduce an interface for the mongoose model∑
    public search(searchText: string, matchOptions: string): Promise<any> {

        //const searchTextLowerCase = searchText.toLowerCase();
        const keywords = searchText.toLowerCase().split(' ');
        // Use of | for OR - check if we want & for AND
        let regex = keywords.join("|") ;

        if (matchOptions === "and") {
            const keywordsForAndRegEx = keywords.map(keyword => "(?=.*" + keyword + ")");
            regex = keywordsForAndRegEx.join("") ;
        }
        
        // regex = '(?=.*barley)(?=.*growing)'; matches BOTH as https://stackoverflow.com/questions/3041320/regex-and-operator 


        console.log("service search [" + keywords + "] with regex [", regex, "] with match option [", matchOptions, "]");

        const CombinedSicActivity = mongoose.model('CombinedSicActivity');
        return CombinedSicActivity.find({ "activityDescriptionLowerCase" : { $regex : new RegExp(regex) }});
    }

}
