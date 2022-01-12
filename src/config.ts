import ApplicationConfiguration from "./ApplicationConfiguration";

const config: ApplicationConfiguration = {
    env: (process.env.NODE_ENV || "development").toLowerCase(),
    dbURI: process.env.SIC_CODE_MONGO_URL + "/" + process.env.SIC_CODE_DATABASE,
    port: parseInt(process.env.SIC_CODE_WEB_PORT || "3000")
}

export default config;