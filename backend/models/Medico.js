const mongoose = require("mongoose");

const MedicoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    img: { type: String },
    usuario: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    hospital: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },
  },
  {
    collection: "medicos",
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.updatedAt;
      },
    },
  }
);

module.exports = mongoose.model("Medico", MedicoSchema);
