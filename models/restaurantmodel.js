import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Restaurant name is required'],
    unique: true,
    trim: true // Removes extra spaces
  },
  description: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  food: {
    type: [String]
  },
  phone: { 
    type: String,
    required: [true, 'Phone number is required']
  },
  address: { // Changed from String to an embedded object
    street: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },
    zipCode: { type: String }
  },
  cuisine: { 
    type: [String], 
    required: true 
  },
  averageRating: { 
    type: Number, 
    default: 1, 
    min: 1, 
    max: 5 
  }
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export { Restaurant };
