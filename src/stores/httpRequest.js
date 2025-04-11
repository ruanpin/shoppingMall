import { defineStore } from 'pinia'
import { request } from "@/assets/api/index.js";
import { deepParseJson } from 'deep-parse-json';

export const useHttpRequestStore = defineStore('httpRequest', () => {
  function request_GET({ url, data }) {
    return new Promise((resolve, reject) => {
      // console.log('request_GET', url, data);
      request
        .request()
        .get(url, {
          params: data,
          // paramsSerializer: (params) => {
          //   return qs.stringify(params);
          // },
        })
        .then((res) => {
          const data = deepParseJson(res)
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return { request_GET }
})
