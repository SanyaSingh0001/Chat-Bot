import {Schema} from 'mongoose';
import mongoose from 'mongoose';

const userSchema = new Schema({
    name:{
        type:String , required:true
    },
    username:{
        type:String , required:true , unique:true
    },
    password:{
        type:String , required:true
    },
    token:{
        type:String 
    },
    avatar: { 
        type: String, 
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png" 
    } ,
    location: {
    type: {
        type: String, 
        enum: ['Point'], 
        default: 'Point' 
    },
    coordinates: {
        type: [Number], // [longitude, latitude]
        required: false // Shuruat mein optional rakh sakte hain
    }
}
}, { timestamps: true
}
)


userSchema.index({ location: '2dsphere' }); // Geospatial index for location field
const User = mongoose.model("User",userSchema);
export {User};