const { mongoose, Schema, model } = require("mongoose");


const reposSchema = new Schema({
    repoID:{type:String, required: true, unique: true},
    repoName:{type:String,},
    repoDescription: {type:String,},
    repoLanguage: {type:String, },
    repoPushedDate: {type:Date},
    repoCreatedDate: {type:Date,},
    repoUpdatedDate:{type:Date,},
    repoUrl:{type:String,},
    repoEventsUrl:{type:String,},
    ownerName:{type:String,},
    ownerID:{type:Number,},
    ownerReceivedEvents_url:{type:Object,}, 
});

const modelRepos = model("ghRepos",reposSchema);

module.exports = modelRepos