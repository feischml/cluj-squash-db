// Handle result and send back response to client

module.exports.handleResult = function(error,response,result,message){
    if (error)
		response.status(495).send(error);
	else if (result)
        response.status(200).send(result);
    else
		response.status(400).send(message);
}