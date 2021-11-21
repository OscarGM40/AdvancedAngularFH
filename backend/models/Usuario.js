
const mongoose = require('mongoose');


const UsuarioSchema = new mongoose.Schema({
   nombre: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   img: { type: String, },
   role: { type: String, required: true, default: 'USER_ROLE' },
   google: { type: Boolean, default: false },
},{
   timestamps: true,
   versionKey: false,
   toJSON: {
      transform: (doc, ret) => {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
         delete ret.password;
         delete ret.updatedAt;
      }
   }
});

// Esta sería otra forma de cambiar el toJSON
/* UsuarioSchema.methods.toJSON = function() {
   let user = this;
   let userObject = user.toObject();
   delete userObject.password;
   return userObject;
} */

module.exports = mongoose.model('Usuario', UsuarioSchema);