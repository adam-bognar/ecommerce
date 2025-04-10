import axios from "axios"
import { CartDto, OrderDto, Product } from "./Models";
import apiBaseUrl from "./apiConfig";

export interface response {
    data: Product[];
}

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getAllProducts = async (params?: {
    category?: string;
    search?: string;
    difficulty?: string[]; // Accept multiple values
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
}) => {
    try {
        const response = await axios.get<Product[]>(`${apiBaseUrl}/api/Product`, {
            params, // Axios will handle array params correctly
            paramsSerializer: (params) => {
                const searchParams = new URLSearchParams();
                Object.entries(params).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        value.forEach((v) => searchParams.append(key, v)); // Append multiple values
                    } else if (value !== undefined) {
                        searchParams.append(key, String(value));
                    }
                });
                return searchParams.toString();
            },
        });
        return response.data;
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            return e.message;
        }
    }
};


export const getProductByName = async (search: string) => {
    try {
        const response = await axios.get<Product[]>(
            `${apiBaseUrl}/api/Product?search=${search}`
        )
        console.log(response.data[0].name)
        return response.data[0];
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            return e.message;
        }
    }
}

export const getProductByID = async(id: number) => {
    try{
        const response = await axios.get<Product>(
            `${apiBaseUrl}/api/Product/${id}`
        )
        return response.data;
    }catch(e){
        if(e instanceof Error){
            console.error(e.message);
            return e.message;
        }
    }
}

export const getSimilarProducts = async (id: string) => {
    try {
        const response = await axios.get<Product[]>(
            `${apiBaseUrl}/api/Product/${id}/similar`
        )
        return response;
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            return e.message;
        }
    }
}

export const register = async (firstname: string,lastname, email: string, password: string) => {
    try {
        const response = await axios.post(
            `${apiBaseUrl}/api/Auth/register`,
            {
                firstname,
                lastname,
                email,
                password
            }
        )
        console.log(response.data);
        return response.data;
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            return e.message;
        }
    }
}

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/api/Auth/login`, {
            email,
            password,
        });

        const { token, userId } = response.data;

        // Store the token in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        return { token, userId };
    } catch (error: any) {
        console.error("Login error:", error.response?.data || error.message);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
};

export const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
};

export const getMyCart = async (): Promise<CartDto | string> => {
    try {
        const response = await axios.get<CartDto>(`${apiBaseUrl}/api/Cart/me`);
        return response.data;
    } catch (e) {
        if (e instanceof Error) {
            console.error("Error fetching cart:", e.message);
            return e.message;
        }
    }
};

export const updateQuantity = async (productId: number, quantity: number) => {
    try {
        const response = await axios.put(
            `${apiBaseUrl}/api/Cart/update`,
            { 
                productId,
                quantity
             },
        );
        return response.data;
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            return e.message;
        }
    }
}

export const deleteItem = async (productId: number) => {
    try{
        const response = await axios.delete(
            `${apiBaseUrl}/api/Cart/me/${productId}`);
        return response.data;
    }catch(e){
        if(e instanceof Error){
            console.error(e.message);
            return e.message;
        }
    }
}

export const addToCart = async (productId: number) => {
    try{
        const response = await axios.post(
            `${apiBaseUrl}/api/Cart/add`,
            { productId }
        )
        return response.data;
    } catch(e){
        if(e instanceof Error){
            console.error(e.message);
            return e.message;
        }
    }
}

export const getOrders = async (params? :{
    status?: string,
    sort?: string,
    take?: number,
}) => {
    try {
        const response = await axios.get<OrderDto[]>(`${apiBaseUrl}/api/Order/me`,{
            params, // Axios will handle array params correctly
            paramsSerializer: (params) => {
                const searchParams = new URLSearchParams();
                Object.entries(params).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        value.forEach((v) => searchParams.append(key, v)); // Append multiple values
                    } else if (value !== undefined) {
                        searchParams.append(key, String(value));
                    }
                });
                return searchParams.toString();
            }
        });
        return response.data;
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            return e.message;
        }
    }
}

export const createOrder = async () => {
    try {
        const response = await axios.post(`${apiBaseUrl}/api/Order`);
        return response.data;
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            return e.message;
        }
    }
}
