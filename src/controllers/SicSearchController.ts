import { NextFunction, Request, Response } from "express";
import e = require("express");
import { DatabaseSearchService } from "services/DatabaseSearchService";

export class SicSearchController {

    private databaseSearchService: DatabaseSearchService;

    constructor(databaseSearchService: DatabaseSearchService) {
        this.databaseSearchService = databaseSearchService;
    }

    public renderView = (req: Request, res: Response) => {
        console.log("in render view");
        res.render("index", {searchText: "", matches: undefined, matchOptions: "or"});
    };

    public search = async (req: Request, res: Response, next: NextFunction) => {
        console.log("searching for SIC codes using [" + req.body.sic_codeSearchName + "], matchOptions = [" + req.body.matchOptions + "] " );
        const matchOptions = req.body.matchOptions ?? "or"

        const databaseMatches = await this.databaseSearchService.search(req.body.sicCodeSearchName, matchOptions);

        let resultsWithCount = databaseMatches.map(obj => ({
            _id: obj._id,
            sic_code: obj.sic_code,
            sic_description: obj.sic_description,
            activity_description: obj.activity_description,
            count: this.numberOccurances(req.body.sicCodeSearchName.toLowerCase().split(' '), obj.activity_description_lower_case)
        }));

        let sortedResults = resultsWithCount.sort((a, b) => b.count-a.count);         

        const matches = sortedResults.map(obj => [{
            text: obj.sic_code
        }, {
            text: obj.sic_description
        }, {
            text: obj.activity_description
        }]);

        console.log("matches", matches);     

        res.render("index", {searchText: req.body.sicCodeSearchName, matches: matches, matchOptions: matchOptions});
    };

    private numberOccurances(keywords: string[], descriptions: string): number {
        return keywords.filter(k => descriptions.includes(k) ).length;
    }

}