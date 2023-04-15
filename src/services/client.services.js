import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import axios from 'axios';
import { useRouter } from 'next/router';

const fetcher = async ({ url, method }) => {
    return axios[method](url).then(res => res.data);
};

const mutator = async ({ url, method }, { arg }) => {
    return axios[method](url, arg).then(res => res.data);
};
// client servicers other than mutators are only useful for data that needs to load after initial page load
// useful for things like pagination, or for fetching data from components (if not easy to fetch in parent and pass it down)
// User Services
export const useRegisterUser = () => {
    return useSWRMutation({ url: "/api/users", method: "post" }, mutator);
};

export const useLoginUser = () => {
    return useSWRMutation({ url: "/api/auth", method: "post" }, mutator);
};

export const useGetLoggedUser = () => {
    const router = useRouter();
    return useSWR({ url: "/api/auth", method: "get" }, fetcher, {
        onError: () => router.push("/") // redirect to root if not logged in
    });
};

export const useLogoutUser = () => {
    const router = useRouter();
    return useSWRMutation({ url: "/api/auth", method: "delete" }, mutator, { 
        onSuccess: () => router.push("/") // redirect to root after logging out
    });
};

// Product Services
export const useCreateProduct = () => {
    return useSWRMutation({ url: "/api/products", method: "post" }, mutator);
};

export const useUpdateProduct = id => {
    return useSWRMutation(id ? { url: `/api/products/${id}`, method: "put" } : null, mutator);
};

export const useGetAllProducts = () => {
    return useSWR({ url: "/api/products", method: "get" }, fetcher);
};

export const useGetProduct = id => {
    return useSWR(id ? { url: `/api/products/${id}`, method: "get" } : null, fetcher);
};

export const useDeleteProduct = id => {
    return useSWRMutation(id ? { url: `/api/products/${id}`, method: "delete" } : null, fetcher);
};