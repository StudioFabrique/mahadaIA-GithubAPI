const UsersGh = require('../models/ghUserSchema')
const EventsGh = require('../models/ghEventsSchema')
const ReposGh = require('../models/ghReposSchema')
const fetch = require('node-fetch')

const test = "RomainDalleCarbonare, Pierre-Camino, AlaaAD86, Bryan,ByFow"

exports.getGhUsers = async (req, res, next) => {

    const user = req.body.user


    try {

        //**Busqueda del usuario
        //TODO agregar funcionalidad para usarse con el front

        const userFetch = await fetch(`https://api.github.com/users/${user}`, {
            headers: {
                auth: `Bearer 52b1aef096788321c6c8a00c836e76621d94606b`
            }
        });
        const data = await userFetch.json();
        //  console.log(data);

        //**Creacion de las variables para usar eventos y repositorios

        // let userName = data.login
        // console.log(userName)
        // let fetchEvents =  ;
        // console.log(fetchEvents);

        // let fetchRepos =  data.repos_url;

        let reposArray = [];
        let eventsArray = [];
        let repoOwnerId = ''
        let eventOwnerId = ''


        //**busqueda de repositorios con el nombre del usuario
        //**++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        let repos_id = [];


        const repos = await fetch(`https://api.github.com/users/${user}/repos?per_page=100?`, {
            headers: {
                auth: `Bearer 52b1aef096788321c6c8a00c836e76621d94606b`
            }
        });
        const reposData = await repos.json();
        // console.log(reposData)

        await reposData.forEach(r => {
            let repo = {
                repoID: r.id,
                repoName: r.name,
                repoDescription: r.description,
                repoLanguage: r.language,
                repoPushedDate: r.pushed_at,
                repoCreatedDate: r.created_at,
                repoUpdatedDate: r.update_at,
                repoUrl: r.url,
                repoEventsUrl: r.events_url,
                ownerName: r.owner.login,
                ownerID: r.owner.id,
                ownerReceivedEvents_url: r.owner.received_events_url,
            }
            reposArray.push(repo);
            repoOwnerId = r.owner.id
            repos_id.push(r.id);
        })

        // ReposGh.insertMany(reposArray)
        console.log(reposArray.length)

        //*Busqueda de eventos por usuario
        //*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const userEvents = await fetch(`https://api.github.com/users/${user}/events?per_page=100`, {
            headers: {
                auth: `Bearer 52b1aef096788321c6c8a00c836e76621d94606b`
            }
        });
        const eventsData = await userEvents.json();
        // console.log(eventsData);

        await eventsData.forEach(e => {
            let event = {
                idEv: e.id,
                typeEv: e.type,
                createdAt: e.created_at,
                actorEv: e.actor,
                repoEv: e.repo,
                Org: e.Org
            }
            eventsArray.push(event);
            // eventOwnerId = e.actor.id

        })
        console.log(eventsArray.length)
        // EventsGh.insertMany(eventsArray)


        //*Comparativa de coleciones y creacion de referencias repo y event
        //*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        
     
        // console.log(reposDb)

        // console.log(evMap)
        // console.log(rpMap)



        //* Creacion del usuario e insericon de los datos en mongo
        //*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        let userGh = await UsersGh.create({
            idGh: data.id,
            nomGh: data.login,
            avatarGh: data.avatar_url,
            urlProfilGh: data.html_url,
            urlReposGh: data.repos_url,
            createdAt: data.created_at,
            repos: data.public_repos,
            reposId: repos_id,
            eventsRef: evMap,
            reposRef: rpMap,
        });
        userGh.save();

        // console.log(reposDb);


        // const usersGh = await UsersGh.find({});
        res.json("ok");

    } catch (error) {
        console.log(error);
        next()
    }
}

exports.showUser = async (req, res, next) => {
    try {
        const user = await UsersGh.find({}).populate('reposRef').populate('eventsRef');
        res.json(user);
        console.log(user)
    } catch (error) {
        console.log(error);
        next();
    }

}
exports.updateUser = async (req, res, next) => {
    const user = req.body.user

    try {

        const userDb = await UsersGh.where("nomGh").equals(user).select("nomGh").then(console.log("name ok"));
        const u = userDb[0]._id
        console.log(u)

        const eventsDb = await EventsGh.where("actorEv.login").equals(user).then(console.log(" events ok"));
        const evMap = await eventsDb.map(e =>
            e._id
        )

        const reposDb = await ReposGh.where("ownerName").equals(user).select("ownerName").then(console.log("repos ok"));
        const rpMap = await reposDb.map(r =>
            r._id
        )
        // console.log(eventsDb)
        // console.log(reposDb)
        console.log(evMap)
        console.log(rpMap)

            // ! TEST UPDATE & INSERT REF IN USER
            const update = {"eventsRef":evMap, "reposRef":rpMap}

            const updateUser = await UsersGh.findOneAndUpdate({_id : u},update,{ new: true });
           


        
        res.json(user);
        console.log(user)
    } catch (error) {
        console.log(error);
        next();
    }

}


exports.getGhEvents = async (req, res, next) => {
    try {
        const userRepos = await UsersGh.find({});
        res.json(userRepos);

    } catch (error) {
        console.log(error);
        next();
    }
}
exports.getGhRepos = async (req, res, next) => {
    try {

        const respuesta = await fetch(`https://api.github.com/users/AlaaAD86/repos`);

        const data = await respuesta.json();
        // console.log(data);
        let repos = [];

        await data.forEach(r => {

            let repo = {
                repoID: r.id,
                repoName: r.name,
                repoDescription: r.description,
                repoLanguage: r.language,
                repoPushedDate: r.pushed_at,
                repoCreatedDate: r.created_at,
                repoUpdatedDate: r.update_at,
                repoUrl: r.url,
                repoEventsUrl: r.events_url,
                ownerName: r.owner.login,
                ownerID: r.owner.id,
                ownerReceivedEvents_url: r.owner.received_events_url,
                eventsRef: ''
            }
            repos.push(repo);
        });

        // console.log(repos)

        // modelRepos.insertMany(repos)

        // const userRepos = await UsersGh.find({});
        res.json();

    } catch (error) {
        console.log(error);
        next();
    }
}
exports.getGhUser = async ( req, res, next ) => {

    const user = req.body.user

    try {
        const usersGh = await UsersGh.findOne({nomGh: user});
        res.json(usersGh);
        
    } catch (error) {
        console.log(error);
    }
}

exports.getGhEvents = async ( req, res, next ) => {
    try {
        const userRepos = await UsersGh.find({});
        res.json(userRepos);
        
    } catch (error) {
        console.log(error);
        next();
    }
}
exports.getRepos = async ( req, res, next ) => {
    try {
        const userRepos = await UserRepos.find({});
        res.json(userRepos);
        
    } catch (error) {
        console.log(error);
        next();
    }
}