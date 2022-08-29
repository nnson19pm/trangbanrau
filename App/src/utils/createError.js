const CreateError = {

    //You are not authorized to access this route
    notAuthorized(res) {
        return res.status(403).json({
            message: "You are not authorized to access this route"
        });
    }


}
export default CreateError;