// Handle result and send back response to client
function handleResult(error,response,result,message){
    if (error){
        let errorName = error.name;
        if ( errorName == "MongoError" ){  // send only the "mapped error" message
            let errorCode = error.code;
            response.status(495).send(switchMongoErrorMessage(errorCode));
        }else
            response.status(495).send(error); // else send the error entire message
    }
	else if (result)
        response.status(200).send(result);
    else
		response.status(400).send(message);
}

function switchMongoErrorMessage(errorCode){
    switch (errorCode) {
        case 11000:
            return "Duplicate entry for entity. Please check already existent entries. Saving data not possible!"
            break;
        default:
            return "No message customized for code: " + errorCode;
    }

}

// Export function 
module.exports.handleResult = handleResult;