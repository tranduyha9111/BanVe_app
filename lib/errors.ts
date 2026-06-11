type AxiosLikeError = {
  response?: {
    status?: number;
    data?: { message?: string };
  };
};

export function getAxiosErrorMessage(
  error: unknown,
  fallback = "Đã xảy ra lỗi"
): string {
  if (error && typeof error === "object" && "response" in error) {
    const message = (error as AxiosLikeError).response?.data?.message;
    if (message) return message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export function getAxiosStatus(error: unknown): number | undefined {
  if (error && typeof error === "object" && "response" in error) {
    return (error as AxiosLikeError).response?.status;
  }
  return undefined;
}

export function isAxiosStatus(error: unknown, status: number): boolean {
  return getAxiosStatus(error) === status;
}
