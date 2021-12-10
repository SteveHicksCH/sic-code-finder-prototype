import { NextFunction, Request, Response } from "express";
import e = require("express");

export class SicSearchController {

    public renderView = (req: Request, res: Response) => {
        console.log("in render view");
        res.render("index");
    };

    public search = async (req: Request, res: Response, next: NextFunction) => {
        console.log("searching for SIC codes ");

        res.render("index");
    };

}