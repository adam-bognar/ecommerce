export interface Product {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    categoryName: string;
    difficulty: string;
    tags: string[];
    reviews: Review[];
}

export interface Review {
    id: number;
    username: string;
    rating: number;
    textReview: string;
    createdAt: Date;
    productName: string;
}

export interface CartItemDto {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
}

export interface CartDto {
    id: number;
    userId: string;
    totalPrice: number;
    cartItems: CartItemDto[];
}

export interface OrderDto{
    id: number;
    status: string;
    createdAt: Date;
    totalPrice: number;
    items: OrderItemDto[];
}

export interface OrderItemDto{
    productName: string;
    price: number;
    quantity: number;
}


