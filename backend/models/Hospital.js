const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    img: { type: String },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  {
    collection: "hospitales",
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.updatedAt;
        delete ret.createdAt;
      },
    },
  }
);

module.exports = mongoose.model("Hospital", HospitalSchema);
