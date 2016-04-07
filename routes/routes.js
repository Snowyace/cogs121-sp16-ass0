var emaildb = require('../models.js');
var data = {data: []};
exports.root = function(req, res) {
   emaildb.find()
        .sort({created: 'desc'})
        .exec(renderProjects);

    function renderProjects(err, message) {
        res.render('index', { 'data': message });
    }
   	
    
}

exports.message = function(req,res){
    function afterSaving(err){
        if(err){console.log(err); res.send(500);}
    }
    var email = new emaildb({email: req.body.email, content: req.body.content, created: new Date()});
	email.save(afterSaving);
	/*
	emaildb.update({email: req.body.email},{content: req.body.content},{runValidators: true},function(err){
        if(err){
            console.log("did not update");
        }else
        console.log("updated");
        
    });
    */
}
