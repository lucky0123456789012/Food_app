import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { 
    type: String, 
    required: [true, 'user name is required'],
    unique: true,
    trim: true, // Removes extra spaces
    sparse: false
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true
  },
  password: { 
    type: String,
    required: [true, 'password is required']
  },
  address: { 
    type: String
  },
  phone: {
    type: String,
    required: [true, 'phone is required']
  },
  userType: {
    type: String,
    required: [true, 'UserType is required'],
    default: 'client',
    enum: ['client', 'admin', 'vendor', 'driver']
  },
  profile: {
    type: String,
    default: 'https://banner2.cleanpng.com/20180321/lvq/av0m7nwj5.webp'
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export { User };
