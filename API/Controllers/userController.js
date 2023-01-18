const User = require('../Models/user')
const bcrypt = require('bcrypt')


const logUser = (req, res, next) => {
    const { email, password } = req.body

    User.findOne({ email })
        .exec()
        .then((response) => {
            if (response !== null) {
                bcrypt.compare(password, response.password)
                    .then((match) => {
                        if (match) {
                            res.status(200)
                                .json({
                                    userId: response._id,
                                    name: response.name,
                                    email: response.email,
                                    token: "",
                                    accessRole: response.accessRole
                                })
                        }
                        else {
                            res.status(400)
                            next('password incorrect')
                        }
                    }).catch((err) => {
                        res.status(500)
                        next(err)
                    })
            }
            else {
                res.status(400)
                next('email incorrect')
            }
        })
        .catch((err) => {
            res.status(500)
            next(err)
        })

}

const registerUser = (req, res, next) => {
    const { name, email, password } = req.body

    User.findOne({ email })
        .exec()
        .then((response) => {
            if (response === null) {
                const salt = bcrypt.genSalt(process.env.SALT);
                bcrypt.hash(password, salt)
                    .then((hashedpassword) => {
                        User.create({ name, email, hashedpassword })
                        res.status(201)
                            .json({ message: "success" })
                    })

                    .catch((err) => {
                        res.status(500)
                        next(err)
                    })
            }
            else {
                res.status(400)
                next('user already exists')
            }
        })


}

const editUser = (req, res) => {
    const id = req.params.id

    if (condition) {
        User.findByIdAndUpdate(id, req.body.userInfo)
            .then((response) => {
                res.status(201)
                    .json({ message: "success" })
            }).catch((err) => {
                next(err)
            })


        res.status(401)
        next('Unauthorized')

    }

}

const deleteUser = (req, res) => {
    const id = req.params.id

    if (condition) {
        User.findByIdAndDelete(id)
            .then((response) => {
                res.status(201)
                    .json({ message: "success" })
            }).catch((err) => {
                next(err)
            })
    }
    else {
        res.status(401)
        throw new Error('Unauthorized')
    }
}


module.exports = { logUser, registerUser, editUser, deleteUser }