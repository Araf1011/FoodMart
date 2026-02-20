export type User = {
    id: string;
    name: string;
    email: string;
    role: 'customer' | 'admin' | 'driver' | 'restaurant_owner';
};

export type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    restaurantId: string;
};

export type Restaurant = {
    id: string;
    name: string;
    description: string;
    address: string;
    rating: number;
    menu: MenuItem[];
};

export type matchType = {
    params: {
        id: string;
    };
};
