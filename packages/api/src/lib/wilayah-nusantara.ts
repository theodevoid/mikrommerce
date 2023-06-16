import axios from "axios";

export interface PageableResponse<T> {
  meta: {
    limit: number;
    page: number;
    total: number;
  };
  data: T[];
}

export interface Province {
  code: string;
  province: string;
}

export interface Regency {
  code: string;
  province: string;
  regency: string;
  type: "Kabupaten" | "Kota";
}

export interface District {
  code: string;
  regency: string;
  district: string;
}

export interface Village {
  code: string;
  district: string;
  village: string;
  postalCode: string;
}

export const axiosWN = axios.create({
  baseURL: "https://api.wilayah-nusantara.id",
});
