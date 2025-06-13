import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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
