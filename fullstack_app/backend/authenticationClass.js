
//tbd
const bcrypt = require('bcrypt')
const models = require('./data')
const User = models.User

class authentication
{
    static checkEmail(email)
    {
        try{ const result = User.findOne({ 'email': email }).exec().then((data) =>{
               if(data.email != null) 
                   return true
               else return false}).catch
               (function(err){return false})
                   return result
           }
        catch(err){ return false}
    }
    static checkUsername(username)
    {
        try{  const result = User.findOne({ 'username' : username }).exec().then((data) =>{
                if(data.username != null)
                    return true;
                else return false}).catch
                (function(err){return false})
                    return result
           }
        catch(err){ return false }
    }

    static async checkPassword(username, password)
    {
        let result = ""
        let  hashedPassword = ""
        try
        {
            hashedPassword = authentication.hashPassword(password)
            console.log(hashedPassword)
        }
        catch
        {
            console.log("error????")
            result = false
        }
        try
        {    await User.findOne({ 'username' : username }).exec().then((data) =>
            { 
                console.log(data)
                console.log("username: " + data.username)
                console.log("data.password: " + data.password)
                console.log("input password: " + hashedPassword)
                if( bcrypt.compareSync(hashedPassword, data.password))
                {
                       console.log("passwords are equal")
                       result = true
                }
                else
                {
                    console.log("passwords are not equal")
                    result = false
                }
            }).catch(function(err)
            {
               console.log(err)
               result = false
            })
        }
        catch(err)
        {
            console.log(err)
            result = false
        }
        return result
    }
    static hashPassword(password) //could figure out Async to speed up execution, but right this method does not 
                                 //return quickly enough to catch the User.save
    {
            const saltRounds = 10;
            return bcrypt.hashSync(password, saltRounds) //, function(err, hash){ console.log(hash); return  hash}) 
    }
}

module.exports.authentication = authentication
