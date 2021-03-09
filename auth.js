const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('user');




module.exports.authenticate = function(email, password) {
    return new Promise(async(resolve, reject) => {
        try {
            // get user through email
            console.log(User)

            const userdata = await User.findOne({
                email
            });
            console.log(userdata)

            // after getting the password now decrypt the password and 
            // then finally comparing the password

            bcrypt.compare(password, userdata.password)
                .then(isMatch => {
                    if (isMatch) {
                        resolve(userdata)
                    } else {
                        reject('Authentication failed')
                    }

                })
                .catch(error => {
                    throw error
                })


        } catch (error) {

            reject('Authentication failed')
        }

    })

}