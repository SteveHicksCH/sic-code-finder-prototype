type ApplicationConfiguration = Readonly<{
    env:                      string;
    dbURI:                    string; 
    port:                     number;
}>

export default ApplicationConfiguration;