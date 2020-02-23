import axios from "axios"

let pending: any[] = [];
const CancelToken: any = axios.CancelToken;

const removePending: any = (config: any, f: any) => {
  const flagUrl = config.url;
  if (pending.indexOf(flagUrl) !== -1) {
    if (f)
      f("cancel the duplicate request");
    else
      pending.splice(pending.indexOf(flagUrl), 1);
  }
  else
    if (f)
      pending.push(flagUrl);
};

const service = axios.create({
  baseURL: "",
  timeout: 5000
});

service.interceptors.request.use((config: any) => {
  if (!config.neverCancel) {
    config.cancelToken = new CancelToken((c: any) => {
      removePending(config, c)
    });
  }
  return config;
}, (error: any) => {
  Promise.reject(error);
})

service.interceptors.response.use((response: any) => {
  removePending(response.config);
  if (response.status !== 200) {
    alert(1);
    if (response.status === 401) {
      if (location.hash === "#/")
        return response;
      else
        location.href ="/#/"
    }
    return Promise.reject("error");
  }
  else
    response;
}, (error: any) => {
  console.log(error);
  pending = [];
  if (error.message === "cancel the duplicate request")
    return Promise.reject(error);
  return Promise.reject(error)
})

export default service;