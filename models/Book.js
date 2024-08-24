import mongoose from "mongoose";

// Book model
const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  rack: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum optio cupiditate ut voluptates eveniet ducimus quos doloremque dicta fugiat Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias expedita maiores, corrupti quas debitis repellat itaque autem provident ipsam obcaecati consequuntur consectetur odio similique officiis voluptate excepturi officia sequi praesentium dignissimos libero? Necessitatibus, vero, dolores repellat cupiditate illum quas consequatur magni ratione, nulla sit laboriosam alias esse dolorem maiores rerum."
  },
  available: {
    type: Number,
    default: 0
  },
  photo :{
    type: String
    // required: true
  },
  popular:{
    type:Boolean,
    default:false
  }
});

export default mongoose.model("Book", bookSchema);
