// Generated by https://quicktype.io

export interface Producto {
  nombre:               string;
  id:                   string;
  idProductor:          string;
  precio:               number;
  origen:               string;
  pesoAproximadoUnidad: number;
  esFRoHO?: EsFRoHO;
  alt_img?: string;
}

export enum EsFRoHO{
  FR = "FR",
  HO = "HO",
}
