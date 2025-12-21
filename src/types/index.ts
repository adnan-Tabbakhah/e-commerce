export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image_url: string;
  description?: string;

};
export type ApiResponse = {
  data?: any;
  errorMessage?: string;
  statusCode?: number;
  successMessage?: string;
};
