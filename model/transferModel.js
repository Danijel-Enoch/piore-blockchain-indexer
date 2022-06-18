const mongoose=require("mongoose");

const transferSchema=mongoose.Schema({
    from:{
    type:String
  },
  amount:{
    type:String
  },
  to:{
    type:String
  },
date:{
  type:Date,
  default:Date.now
},
  
})

module.exports=mongoose.model('transfer',transferSchema)