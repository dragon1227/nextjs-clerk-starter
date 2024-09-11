import { QUERY_KEYS } from "@/config/const";
import {
  createProductRequest,
  getAllProductsRequest,
} from "@/requests/products";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  const queryKey = [QUERY_KEYS.products];
  return useQuery({
    queryKey,
    queryFn: getAllProductsRequest,
    gcTime: 99999999,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProductRequest,
  });
};
