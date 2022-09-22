const { Schema, model } = require('mongoose');



const userGithubSchema = new Schema({
    idGh: { type: String, required: true, unique: true},
    nomGh: { type: String, required: true },
    avatarGh: { type: String },
    urlProfilGh: { type: String },
    urlReposGh: { type: String },
    createdAt: { type: String },
    repos: { type: Number },
    reposId: { type: Object },
    eventsRef: [{ type: Schema.Types.ObjectId, ref: 'ghEvents', },{default:null}],
    reposRef: [{ type: Schema.Types.ObjectId, ref: 'ghRepos' },{default:null}]
    
});

// module.exports = model('ghUser', userGithubSchema);

const modelUser = model("ghUser",userGithubSchema);

module.exports = modelUser