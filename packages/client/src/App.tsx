import ReviewList from "./components/reviews/ReviewList";
import "react-loading-skeleton/dist/skeleton.css";

const App = () => {
  return (
    <>
      <ReviewList productId={3} />
    </>
  );
};

export default App;
