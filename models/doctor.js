const mongoose = require ('mongoose');

const doctorSchema = new mongoose.Schema({
   
    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },

    
    
    username:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required:true,
        
    },

    email:{

        type:email,
        required:true,
        unique:true
    },

   

    address:{
        type:String,
        required:true
    }

    
})