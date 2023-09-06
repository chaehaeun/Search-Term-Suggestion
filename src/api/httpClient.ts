import { CACHE_EXPIRE_TIME, CACHE_KEY } from "@/constants";
import axios, { AxiosInstance } from "axios";

type SickItem = {
  sickCd: string;
  sickNm: string;
};

class HttpService {
  #httpClient: AxiosInstance;

  constructor() {
    this.#httpClient = axios.create({
      baseURL: "http://localhost:4000",
    });
  }

  #getCacheData = () => {
    const cacheData = sessionStorage.getItem(CACHE_KEY);
    return cacheData ? JSON.parse(cacheData) : {};
  };

  #setCacheData = (keyword: string, data: string[]) => {
    const currentCache = this.#getCacheData();
    currentCache[keyword] = {
      data,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(currentCache));
  };

  search = async (keyword: string): Promise<string[]> => {
    if (keyword.trim().length === 0) return [];

    const cache = this.#getCacheData();

    if (
      cache[keyword] &&
      Date.now() - cache[keyword].timestamp < CACHE_EXPIRE_TIME
    ) {
      return cache[keyword].data;
    }

    const params = { q: keyword };
    console.info("calling api");
    const response = await this.#httpClient.get("/sick", { params });
    const sickNmArray = response.data.map((item: SickItem) => item.sickNm);

    this.#setCacheData(keyword, sickNmArray);

    return sickNmArray;
  };
}

export default new HttpService();
