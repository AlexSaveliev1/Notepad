var mongoose = require('mongoose');

// Notes Schema
var NotesSchema = mongoose.Schema({ // Notes model
    usernameId: {
        type: String,
        index:true
    },
    title:{
        type: String
    },
    text:{
        type: String
    }
});

var Note = module.exports = mongoose.model('Note', NotesSchema);



module.exports.createNote = function(newNote, callback){
            newNote.save(callback); // save Phrase in DB
}
/*
module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}*/
