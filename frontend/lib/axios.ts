import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export default api;

export async function getFetcher(url: string) {
	const res = await api.get(url);
  return res.data;
}

export async function postFetcher<TRequest, TResponse>(
	url: string,
	{ arg }: { arg: TRequest },
) {
	const res = await api.post<TResponse>(url, arg);
  return res.data;
}

export async function patchFetcher<TRequest, TResponse>(
	url: string,
	{ arg }: { arg: TRequest },
) {
	const res = await api.patch<TResponse>(url, arg);
  return res.data;
}
