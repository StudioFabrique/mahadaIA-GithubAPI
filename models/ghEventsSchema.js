const { Schema, model } = require('mongoose');



const eventsSchema = new Schema({
    idEv: { type: String},
    typeEv: { type: String },
    createdAt: { type: String },
    repoEv: { type: Object },
    actorEv: { type: Object },
    Org: { type: Object },

});

// module.exports = model('ghEvents', eventsSchema);

const modelEvents = model("ghEvents",eventsSchema);

module.exports = modelEvents