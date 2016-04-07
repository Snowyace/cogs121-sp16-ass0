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
    
    var email = new emaildb({email: req.body.email, content: req.body.content, created: new Date()});
	email.save(afterSaving);

    function afterSaving(err){
        //console.log(err);
        res.redirect(303, '/');
    }
	/*
	emaildb.update({email: req.body.email},{content: req.body.content},{runValidators: true},function(err){
        if(err){
            console.log("did not update");
        }else
        console.log("updated");
        
    });
    */
}
