import { BASE_URL, CACHE_EXPIRE_TIME, CACHE_KEY } from "@/constants";
import axios, { AxiosInstance } from "axios";

type SickItem = {
  sickCd: string;
  sickNm: string;
};

class HttpService {
  #httpClient: AxiosInstance;

  constructor(BASE_URL: string) {
    this.#httpClient = axios.create({
      baseURL: BASE_URL,
    });
  }

  #getCacheData = () => {
    const cacheData = sessionStorage.getItem(CACHE_KEY);
    const parsedCache = cacheData ? JSON.parse(cacheData) : {};

    Object.keys(parsedCache).forEach((key) => {
      if (Date.now() - parsedCache[key].timestamp > CACHE_EXPIRE_TIME) {
        delete parsedCache[key];
      }
    });

    sessionStorage.setItem(CACHE_KEY, JSON.stringify(parsedCache));
    return parsedCache;
  };

  #setCacheData = (keyword: string, data: string[]) => {
    const currentCache = this.#getCacheData();
    currentCache[keyword] = {
      data,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(currentCache));
  };

  search = async (endpoint: string, keyword: string): Promise<string[]> => {
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
    const response = await this.#httpClient.get(endpoint, { params });
    const sickNmArray = response.data.map((item: SickItem) => item.sickNm);

    this.#setCacheData(keyword, sickNmArray);

    return sickNmArray;
  };
}

export default new HttpService(BASE_URL);
