import { Hospital } from "./hospital.model";



interface MedicoUser {
  id: string;
  nombre: string;
  img: string;
}

interface MedicoHospital {
  id: string;
  nombre: string;
  img: string;
}

export class Medico {

  constructor(
    public nombre: string,
    public id?: string,
    public img?: string,
    public usuario?: MedicoUser,
    public hospital?: Hospital,
  ) { }
}


