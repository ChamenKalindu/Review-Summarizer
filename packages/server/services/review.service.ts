import { llmClient } from "../llm/client";
import { reviewRepository } from "../repositories/review.repository";
import template from '../prompts/review-summarize.txt'

export const reviewService = {

  async summarizeReviews(productId: number): Promise<string> {
    const existingSummary = await reviewRepository.getReviewSummary(productId);
    if (existingSummary) {
      return existingSummary;
    }

    const reviews = await reviewRepository.getReviews(productId, 10);
    const joinedReviews = reviews.map((r) => r.content).join("\n\n");

    const prompt = template.replace("{{reviews}}", joinedReviews);

    const summary = await llmClient.generateText({ 
      propmt: prompt,
      temperature: 0.5,
      maxTokens: 300,
      model: "gpt-4o",
    });

    await reviewRepository.storeReviewSummary(productId, summary);

    return summary;
  },
};

