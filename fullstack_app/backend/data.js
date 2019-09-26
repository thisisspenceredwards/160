const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    id: Number,
    message: String
  },
  { timestamps: true }
);

const OrganizationSchema = new Schema(
  {
    id: Number,
    name: String,
    location: String,
    address: String,
    description: String,
    establishedDate: Date
  },
  { timestamps: true }
);


const UserSchema = new Schema(
  {
    id: Number,
    orgId: Number,
    username: String,
    password: String,
    email: String,
  },
  { timestamps: true },

);

const TopicSchema = new Schema(
  {
    topicOrgId: Schema.Types.ObjectId,
    topicName: String,
  },
  { timestamps: true },
);

const PostSchema = new Schema(
  {
    topicId: Schema.Types.ObjectId,
    userID: Schema.Types.ObjectId,
    subject: String,
    createTime: { type: Date, default: Date.now() },
    LatestUpdateTime: { type: Date, default: Date.now() },
    parentPostId: Schema.Types.ObjectId,
    body: String,
  },
  { timestamps: true },
)
// export the new Schema so we could modify it using Node.js
// module.exports = mongoose.model("Data", DataSchema)

exports.Data = mongoose.model("Data", DataSchema);
exports.OrganizationSchema = mongoose.model("Organization", OrganizationSchema);
exports.User = mongoose.model("User", UserSchema);
exports.Topic = mongoose.model("Topic", TopicSchema);
exports.Post = mongoose.model("Post", PostSchema);
