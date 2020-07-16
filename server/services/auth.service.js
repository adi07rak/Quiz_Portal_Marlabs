module.exports.registerUser = (req, res) => {
    req.save((error, data) => {
        if (error) {
            if (error.code === 11000) {
                res.status(409).send({
                    message: "Data is already used.",
                    status: false
                });
            } else {
                res.status(500).send({
                    message: "Connection Error.",
                    status: false
                });
            }
        }
        else {
            res.status(200).send({
                message: "Data is saved Successfully.",
                status: true
            });
        }
    });
}