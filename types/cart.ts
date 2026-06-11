export interface CartContentRef {
  id: string;
  title: string;
  description?: string;
  price?: number;
  image?: string;
  thumbnail?: string;
  category?: {
    name: string;
  };
}

export interface CartItem {
  id: string;
  contentId: string;
  content: CartContentRef;
  quantity: number;
  createdAt: string;
}
