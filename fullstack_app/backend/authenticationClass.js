
//tbd
const bcrypt = require('bcrypt')
const models = require('./data')
const User = models.User

class Authentication
{
    checkEmail(email)
    {
        let result = ""
        try
        {
             result = User.findOne({ 'email': email }).exec().then((data) =>
             {
                 if(data.email != null) 
                    return true
                 else 
                     return false
             }).catch(function(err){ result = false })
        }
        catch(err){ return false}
        console.log(result)
        return result
    }

    checkUsername(username)
    {
        let result = ""
        try
        {
            result = User.findOne({ 'username' : username }).exec().then((data) =>
            {
                if(data.username != null)
                    return true
                else
                    return false
            }).catch(function(err){return false})
        }
        catch(err){ return false }
        return result
    }

    async checkPassword(username, password)
    {
        let result = ""
        try
        {
            result = await User.findOne({ 'username' : username }).exec().then((data) =>
            {
                if( data != null && bcrypt.compareSync(password, data.password))
                    return true
                else
                    return false
            }).catch(function(err){ console.log(err); return false })
        }
        catch(err)
        {
            console.log(err)
            return false
        }
        return result
    }
    hashPassword(password) //could figure out Async to speed up execution, but right this method does not 
    {                             //return quickly enough to catch the User.save
            const saltRounds = 10;
            return bcrypt.hashSync(password, saltRounds) //, function(err, hash){ console.log(hash); return  hash}) 
    }
}

module.exports.Authentication = Authentication
