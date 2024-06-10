import { UseQueryOptions, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { apiClient } from "./apiClient"

export function useApiData<TResponse, TParams = Record<string, string>>(
    path: string,
    params?: TParams,
    options?: Omit<
      UseQueryOptions<TResponse, Error | AxiosError>,
      'queryKey' | 'queryFn'
    >,
    baseURL?: string,
    headers?: Record<string, string>,
  ) {
    const locale =  'en'
    return useQuery(
      [path, params, locale],
      () => {
        return apiClient
          .get<TResponse>(path, {
            baseURL: baseURL,
            params: params ?? {},
            headers: {
              'Accept-Language': locale,
              ...headers,
            },
          })
          .then((res) => res.data)
      },
      options,
    )
  }