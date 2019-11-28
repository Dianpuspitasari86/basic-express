let users = require('../../models/users');

module.exports = {
    register: (req,res) => {
        try {
            const { name, email, password } = req.body;
            console.log(name, email, password)
            
            if(!name || !email || !password) {
                return res.status(401).json ({
                    message: 'body cannot be empty'
                });
            }

            const existedUser = users.find(user => user.email === email);

            if(existedUser) {
                return res.status(409).json ({
                    message: 'user already registered, please login' 
                });
            }


            users.push({name, email, password});
            res.status(201).json ({
                message: 'user successfully created',
                name,
                email
            });

        } catch(error) {
            return res.status(500).json ({
                message: 'error in register route',
                error: error.message
            });
        }
    },

    authentication: (req,res) => {
        try {
            const{ email, password } = req.body

            const existedUser = users.find(user => user.email === email);

            if(existedUser) {
                return res.status(409).json ({
                    message: 'login failed, your email is not match' 
                });
            } else if(existedUser.password === password) {
                return res.status(200).json ({
                    message: 'login succesfull',
                    isLoggedIn: true,
                    email,
                    fakeId: 10210
                });
            } else {
                return res.status(400).json ({
                    message: 'login failed, your password is not match',
                })
            }

        } catch (error) {
            return res.status(500).json ({
                message: 'error in authentication route',
                error: error.message
            }); 
        }
    },
    logout: (req, res) => {
        return res.status(200).json ({
            message: 'logout succesfull',
            isLoggedIn: true,
        });
    }
};