import mongoose from "mongoose";

const hubSchema = new mongoose.Schema({
  name: { type: String, required: true },          
  location: { type: String, required: true },      
  image: { type: String },                        
  createdAt: { type: Date, default: Date.now }   
});

const Hub = mongoose.model("Hub", hubSchema);

export default Hub;
