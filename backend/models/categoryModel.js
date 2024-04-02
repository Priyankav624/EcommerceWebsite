import mongoose from "mongoose";

// how admin look alike   and properties
const categorySchema = new mongoose.Schema(
    {
    name: {
        type : String,
        trim : true,
        required : true,
        unquie: true,
        maxLength: 32,
    },
});

export default mongoose.model('Category' , categorySchema);
