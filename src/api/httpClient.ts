import axios, { AxiosInstance, AxiosResponse } from "axios";

type SickItem = {
  sickCd: string;
  sickNm: string;
};

class HttpService {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: "http://localhost:4000",
    });
  }

  search = async (keyword: string): Promise<AxiosResponse> => {
    const params = { q: keyword };
    const response = await this.httpClient.get("/sick", { params });
    const sickNmArray = response.data.map((item: SickItem) => item.sickNm);

    return sickNmArray;
  };
}

export default new HttpService();
