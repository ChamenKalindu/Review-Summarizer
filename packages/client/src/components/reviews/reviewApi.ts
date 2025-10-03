import axios from "axios";

export type Review = {
  id: number;
  author: string;
  rating: number;
  content: string;
  createdAt: string;
};

export type GetReviewsResponse = {
  summary: string;
  reviews: Review[];
};

export type SummarizeResponse = {
  summary: string;
};

export const reviewApi = {
  async fetchReviews(productId: number) {
    return await axios.get<GetReviewsResponse>(
      `/api/products/${productId}/reviews`
    ).then((res) => res.data);
  },

  async summarizeReviews(productId: number) {
    return await axios.post<SummarizeResponse>(
      `/api/products/${productId}/reviews/summary`
    ).then((res) => res.data);
  },
};
