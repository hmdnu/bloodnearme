import { FetchOptions, ofetch } from "ofetch";

export type TRegencie = {
  id: string;
  province_id: string;
  name: string;
};

export type TProvince = {
  id: string;
  name: string;
};

export class Location {
  async getProvince(): Promise<TProvince[]> {
    return await this.fetch("provinces.json", { method: "GET" }).catch((err) => console.log(err));
  }

  async getRegencies(provinceId: string): Promise<TRegencie[]> {
    return await this.fetch(`/regencies/${provinceId}.json`).catch((err) => console.log(err));
  }

  private async fetch(url: string, options: FetchOptions = {}) {
    return ofetch(url, {
      ...options,
      baseURL: "https://www.emsifa.com/api-wilayah-indonesia/api",
    }).then((res) => res);
  }
}
