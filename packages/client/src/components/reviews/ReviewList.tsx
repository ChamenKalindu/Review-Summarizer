import { useEffect, useState } from "react";
import RatingStar from "./RatingStar";
import { IoSparkles } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import ReviewSkeleton from "./ReviewSkeleton";
import { reviewApi, type GetReviewsResponse } from "./reviewApi";

type Props = {
  productId: number;
};

const ReviewList = ({ productId }: Props) => {
  const [summary, setSummary] = useState("");
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState('');

  const reviewsQuery = useQuery<GetReviewsResponse>({
    queryKey: ["reviews", productId],
    queryFn: () => reviewApi.fetchReviews(productId),
  });

  const handleSummarize = async () => {
    try {
      setIsSummaryLoading(true);
      setSummaryError('')
  
      const { summary } = await reviewApi.summarizeReviews(productId);
  
      setSummary(summary);
      setIsSummaryLoading(false);
    } catch (error) {
      console.log(error);
      setSummaryError('Review Summarization failed! Try again!')
    } finally {
      setIsSummaryLoading(false)
    }
  };


  useEffect(() => {
    reviewApi.fetchReviews(productId);
  }, []);

  if (reviewsQuery.isError) {
    return <p className="text-red-600"> 'Could not fetch reviews!' </p>;
  }

  if (reviewsQuery.isLoading) {
    return (
      <div className="flex flex-col gap-5">
        {[1, 2, 3].map((p) => (
          <div>
            <ReviewSkeleton key={p} />
          </div>
        ))}
      </div>
    );
  }

  if (!reviewsQuery.data?.reviews.length) {
    return null;
  }

  const currentSummary = reviewsQuery.data.summary || summary;

  return (
    <div className="p-10">
      <div className="mb-5">
        {currentSummary ? (
          <p>{currentSummary}</p>
        ) : (
          <div>
            <Button onClick={handleSummarize} className="cursor-pointer" disabled={isSummaryLoading}>
              <IoSparkles />
              Summarize
            </Button>

            {isSummaryLoading && (
              <div className="py-3">
                <ReviewSkeleton/>
              </div>
          )}
            {summaryError && (
              <p className="text-red-600">Summarization Failed. Try again!</p>
            )}
          </div>

        )}
      </div>

      <div className="flex flex-col gap-5">
        {reviewsQuery.data?.reviews.map((review) => (
          <div key={review.id}>
            <div className="font-semibold">{review.author}</div>
            <div>
              <RatingStar value={review.rating} />
            </div>
            <p className="py-2">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
