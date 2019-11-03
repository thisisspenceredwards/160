const express = require('express')
const { check, validationResult } = require('express-validator')
const models = require('./data')
const authenticationFile = require('./authenticationClass')
const constants = require('./constants')
const router = express.Router()
const Favorites = models.Favorites

/*
const LikedPostSchema = new Schema(
  {
    postId: Schema.Types.ObjectId,
    userID: Schema.Types.ObjectId,
    like: Boolean,
    nolike: Boolean,
  },
  { timestamps: true },
)
*/

// POST method
// create a record that show a user likes or doest not like a post.
// @input @Param postId : the post id
// @input @Param userId:  the user id
// @input @Param like:  like the post
// @Output: the json data of the record
// example:
// url: hhttp://localhost:3001/api/favorites
//{
//    "postId": "5d893a60be54da38e9018308",
//    "userID": "5d893a60be54da38e9018333"
//     "like" : true
//     "nolike": false
//}
/* output
{
    "_id": "5dbfb752a1ada2ad4e96843f",
    "postId": "5d893a60be54da38e9018308",
    "userId": "5d893a60be54da38e9018333",
    "like": true,
    "createdAt": "2019-11-04T05:29:54.769Z",
    "updatedAt": "2019-11-04T05:29:54.769Z",
    "__v": 0
}*/
router.post('/favorites', [
    check('postId').isLength({ min:1 }).withMessage('The postId has to be non-empty.'),
    check('userId').isLength({ min:1 }).withMessage('The userId has to be non-empty.'),
    ], async (req, res) =>
{
    const errors = validationResult(req)
    if (!errors.isEmpty())
    {
        return res.status(422).json(errors)
    }

    let favorites = new Favorites()
    const {postId, userId, like} = req.body
    favorites.postId = postId
    favorites.userId = userId
    favorites.like = like
    console.log(favorites.postId)
    console.log(favorites.userId)
    console.log(favorites.like)

    favorites.save((err) => {
        if (err) {
            console.log(err)
            return res.status(400).json(constants.FAIL_JSON)
        } else {
            return res.json(favorites)
        }
    })
 })


// GET method
// show how many users like or not like the post; if the userId is not empty, show if the user like the post or not
// @input @Param postId : the post id
// @input @Param userId (optional) : the user id
// @Output: "{ 
//              "postId": "5d893a60be54da38e9018308",
//              "userId": "5d893a60be54da38e9018333"
//              "like" : true
//              "favoritesCount": 10
//              "nonFavoritesCount": 2 
//              "}"
// example 2:
/* url: http://localhost:3001/api/favorites?postId=5d893a60be54da38e9018308
{
    "postId": "5d893a60be54da38e9018308",
    "favoritesCount": 3,
    "nonFavoritesCount": 1
}
 */
// example 2:
// url: http://localhost:3001/api/favorites?postId=5d893a60be54da38e9018308&userId=5d893a60be54da38e9018333
/* output
{
    "postId": "5d893a60be54da38e9018308",
    "favoritesCount": 3,
    "nonFavoritesCount": 1,
    "userId": "5d893a60be54da38e9018333",
    "like": true
}
*/
 router.get('/favorites', [
    check('postId').isLength({ min:1 }).withMessage('The postId has to be non-empty.')
    ], async(req, res) =>
 {
    var result = {}
    var searchFavorites = {}
    searchFavorites['postId'] = req.query['postId']
    result['postId'] = req.query['postId']

    searchFavorites['like'] = true

    var favoritesCursor = Favorites.find(searchFavorites)
    favoritesCursor.countDocuments(function(err, cnt) {
        //console.log("total favorites count in the collection: " + cnt)
        result['favoritesCount'] = cnt


        var searchNonFavorites = {}
        searchNonFavorites['postId'] = req.query['postId']
        searchNonFavorites['like'] = false
    
        var nonFavoritesCursor = Favorites.find(searchNonFavorites)
        nonFavoritesCursor.countDocuments(function(err, cnt) {
            //console.log("total non favorites count in the collection: " + cnt)
            result['nonFavoritesCount'] = cnt

            if (req.query['userId']) {
                result['userId'] = req.query['userId']
                //console.log("req.query['userId']= " + req.query['userId'])
        
                var searchUserFavorites = {}
                searchUserFavorites['postId'] = req.query['postId']
                searchUserFavorites['userId'] = req.query['userId']
            
                Favorites.findOne(searchUserFavorites).exec( 
                    function(err, favorites) {
                        if (err) {
                            res.send(err)
                        } else {
                            result['like'] = favorites['like']
                            //console.log("favorites= " + favorites)
                            res.json(result)
                        } 
                })
            } else {
                res.json(result)
            }
        })
    })
 })
 
module.exports = router