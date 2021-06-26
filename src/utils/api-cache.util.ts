import { ApplicationHolder } from './app-holder.util';

/**
 * Cache result class
 */
export class CacheResult {
  constructor(
    public requestUrl: string,
    public requestBody: string | undefined,
    public data: any,
    public expireTime = 0
  ) {}

  get expired(): boolean {
    return this.expireTime < new Date().getTime();
  }
}

/**
 * Api cache util class. Use to cache api response
 * @author - Md.Rajib-Ul-Islam<mdrajibul@gmail.com>
 */
export class ApiCacheUtil {
  /** Set expiry time to control when cache will be expired. -1 to set lifetime */
  private expiryTime = ApplicationHolder.instance.projectSetup.cacheExpiryTime
    ? 1000 * 60 * 60 * ApplicationHolder.instance.projectSetup.cacheExpiryTime
    : 86400 * 1000 * 3; // 3 days

  /** Property to store all cach data */
  private cache: Array<CacheResult> = [];

  /** Reference od singletone instance */
  static instance: ApiCacheUtil;

  constructor() {
    if (!!ApiCacheUtil.instance) {
      return ApiCacheUtil.instance;
    }
    ApiCacheUtil.instance = this;
    return this;
  }

  /**
   * Set cache data
   * @param requestUrl  - Api url that need to be cache.
   * @param cacheData - Data that need to be cache
   * @param requestBody - RequestBody to make unified url
   */
  set(requestUrl: string, cacheData: any, requestBody?: string): void {
    requestUrl = this.urlAsBase64(requestUrl);
    if (requestBody) {
      requestBody = this.urlAsBase64(requestBody);
    }
    let existData = this.find(requestUrl, requestBody);
    if (this.isExpired(existData)) {
      this.remove(requestUrl, requestBody);
      existData = undefined;
    }

    if (!existData) {
      this.cache.push(new CacheResult(requestUrl, requestBody, cacheData, new Date().getTime() + this.expiryTime));
    }
  }
  /**
   * Get cached data
   * @param requestUrl - Api url that need to be cache.
   * @param requestBody - RequestBody to make unified url
   */
  get(requestUrl: string, requestBody?: string): CacheResult | null {
    requestUrl = this.urlAsBase64(requestUrl);
    if (requestBody) {
      requestBody = this.urlAsBase64(requestBody);
    }
    const cacheData = this.find(requestUrl, requestBody);
    if (cacheData && !this.isExpired(cacheData)) {
      return cacheData.data;
    }
    return null;
  }

  /**
   * Remove cached data
   * @param requestUrl - Api url that need to be cache.
   * @param requestBody - RequestBody to make unified url
   */
  private remove(requestUrl: string, requestBody?: string): void {
    this.cache = this.cache.filter(cData => {
      if (requestBody) {
        return cData.requestUrl !== requestUrl && cData.requestBody !== requestBody;
      }
      return cData.requestUrl !== requestUrl;
    });
  }
  /**
   * Find data form cache store
   * @param requestUrl - Api url that need to be cache.
   * @param requestBody - RequestBody to make unified url
   */

  private find(requestUrl: string, requestBody?: string) {
    return this.cache.find(cData => {
      if (requestBody) {
        return cData.requestUrl === requestUrl && cData.requestBody === requestBody;
      }
      return cData.requestUrl === requestUrl;
    });
  }

  /**
   * Check the expired cahed data
   * @param cacheData -  Cache data to check expired
   */
  private isExpired(cacheData: CacheResult): boolean {
    return this.expiryTime > -1 && !!cacheData && cacheData.expired;
  }

  /**
   * Make the url as base64 excode
   *  @param key - Key that need to be encoded.
   */
  private urlAsBase64(key: string): string {
    return Buffer.from(key, 'base64').toString();
  }
}
