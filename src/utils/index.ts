import { type ApiResponse } from "@/src/types";

export async function getProducts(): Promise<ApiResponse> {
  try {
    const res = await fetch("/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();

    if (!res.ok) {
      return {
        errorMessage:
          data?.message || `Failed to fetch products: ${res.status}`,
        statusCode: res.status,
        data: data.message,
      };
    }

    return {
      data: data,
      successMessage: "Products fetched successfully!",
    };
  } catch (error: any) {
    const errorMessages = error?.message;
    const formattedError = Array.isArray(errorMessages)
      ? errorMessages.join("\n")
      : errorMessages || "Something went wrong";

    return {
      errorMessage: formattedError || "Failed to get products",
      statusCode: error?.statusCode,
    };
  }
}

export async function getProductById(id: number): Promise<ApiResponse> {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();

    if (!res.ok) {
      return {
        errorMessage: data?.error || `Failed to fetch product: ${res.status}`,
        statusCode: res.status,
        data: data.message,
      };
    }

    return {
      data: data,
      successMessage: "Product fetched successfully!",
    };
  } catch (error: any) {
    const errorMessages = error?.message;
    const formattedError = Array.isArray(errorMessages)
      ? errorMessages.join("\n")
      : errorMessages || "Something went wrong";

    return {
      errorMessage: formattedError || "Failed to get product",
      statusCode: error?.statusCode,
    };
  }
}
