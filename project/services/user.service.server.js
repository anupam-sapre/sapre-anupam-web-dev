module.exports = function(app,models) {

    var userModel = models.userModel;

    app.post("/proj/user", createUser);
    app.get("/proj/user", findUserByCredentials);

    function createUser(req, res) {
        var user = req.body;

        userModel
            .createUser(user)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            )

    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function(err) {
                    res.statusCode(404).send(err);
                }
            )
    }

};