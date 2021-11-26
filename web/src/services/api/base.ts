import Axios from './axios-wrapper';
import axios from "axios";
import autobind from 'autobind-decorator';

type RequestFunc = (url: string, data?: UniversalObject, withHeaders?: boolean, cancelExpertToken?: any) => UniversalObject | false;

export interface Api {
  constructor: Function,
  post: RequestFunc,
  upload: (url: string, data: UniversalObject, auth: boolean) => UniversalObject | null
  download: (url: string, auth: boolean) => UniversalObject,
  delete: RequestFunc,
  put: RequestFunc,
  get: RequestFunc,
  req: Function,
}

interface UniversalObject {
  [key: string]: any;
}

class BaseApi implements Api {
  private axios: any;
  private axiosWithHeaders: any;
  public Axios: any;
  private url: string

  constructor(url: string, hostType = 'default') {
    this.axios = Axios.create(url, hostType);
    this.Axios = axios;
    this.url = url
    this.axiosWithHeaders = Axios.create(url, hostType, true)
  }

  post(url: string, data = {}, headers = {}, cancelExpertToken = null) {
    return this.req('post', url, data, headers, cancelExpertToken)
  }

  getFileByFullUrl(url: string) {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return axios({
      method: 'get',
      url: url,
      headers: {
        'Bearer': `${token?.replace('%20', ' ')}`
      },
      responseType: 'blob'
    })
  }

  upload(url: string, data = {}, auth = true) {
    const token = localStorage.getItem('token');
    if (!token && auth) return null;
    console.log("DATA", data)
    return axios({
      method: 'post',
      url: `${this.url}/${url}`,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorization': auth ? `${token?.replace('%20', ' ')}` : ''
      },
      responseType: 'json'
    })
  }

  download(url: string, auth = true) {
    return axios({
      method: 'get',
      url,
      headers: {
        "Content-Type": "application/octet-stream",
        "Access-Control-Allow-Origin": "*"
      },
      responseType: "blob"
    })
  }

  delete(url: string, data = {}, withHeaders = false) {
    return this.req('delete', url, data, withHeaders)
  }

  put(url: string, data = {}, withHeaders = false) {
    return this.req('put', url, data, withHeaders || {})
  }

  get(url: string, data = {}, withHeaders = false) {
    return this.req('get', url, data, withHeaders || {})
  }

  async req(method: string, url?: string, data = {}, headers = {}, cancelExpertToken?: any) {

    if (!method)
      throw new Error('Method is required');


    const reqData = {};
    if (method === 'get' || method === 'delete') {
      Object.assign(reqData, {params: data});
    } else {
      Object.assign(reqData, {...data});
    }
    const resp = await this.axios[method](url, reqData, {
      headers,
      cancelToken: cancelExpertToken || null
    });
    return this.serializer(resp);
  }

  @autobind
  private serializer(response: UniversalObject): UniversalObject | false {
    if (response?.status && response.status === 'error') {
      throw response
    }
    return response || false;
  }
}

export default BaseApi
