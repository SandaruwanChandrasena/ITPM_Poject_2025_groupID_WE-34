import { Button } from "@nextui-org/react";
import { FC, FormEventHandler, useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import RichEditor from "../components/rich-editor";
import toast from "react-hot-toast";
import client from "../api/client";
import { parseError } from "../utils/helper";
import { AxiosError } from "axios";

interface Props {}

const ReviewForm: FC<Props> = () => {
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { bookId } = useParams();

  const updateRatingChanges = (rating: number) => {
    const newRatings = Array<string>(rating).fill("selected");
    setSelectedRatings(newRatings);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    if (!selectedRatings.length)
      return toast.error("Please select some rating!");

    try {
      setLoading(true);
      await client.post("/review", {
        bookId,
        rating: selectedRatings.length,
        content,
      });

      toast.success("Thanks for leaving a rating.");
    } catch (error) {
      parseError(error);
    } finally {
      setLoading(false);
    }
  };

  const ratings = Array(5).fill("");

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data } = await client.get("/review/" + bookId);
        setContent(data.content || "");
        updateRatingChanges(data.rating);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) return;
          parseError(error);
        }
      } finally {
        setFetching(false);
      }
    };

    fetchReview();
  }, [bookId]);

  if (fetching)
    return (
      <div className="p-5 text-center">
        <p>Please wait...</p>
      </div>
    );

  // return (
  //   <form onSubmit={handleSubmit} className="p-5 space-y-6">
  //     {ratings.map((_, index) => {
  //       return (
  //         <Button
  //           isIconOnly
  //           color="warning"
  //           variant="light"
  //           radius="full"
  //           key={index}
  //           onClick={() => updateRatingChanges(index + 1)}
  //         >
  //           {selectedRatings[index] === "selected" ? (
  //             <FaStar size={24} />
  //           ) : (
  //             <FaRegStar size={24} />
  //           )}
  //         </Button>
  //       );
  //     })}

  //     <RichEditor
  //       value={content}
  //       onChange={setContent}
  //       placeholder="Write about book..."
  //       editable
  //     />

  //     <Button isLoading={loading} type="submit">
  //       Submit Review
  //     </Button>
  //   </form>
  // );

  return (
    <form onSubmit={handleSubmit} className="max-w-lg p-6 space-y-8">
      <div className="flex justify-start gap-2">
        {ratings.map((_, index) => {
          return (
            <Button
              isIconOnly
              color="warning"
              variant="light"
              radius="full"
              key={index}
              onClick={() => updateRatingChanges(index + 1)}
              className="transition-transform transform hover:scale-110"
            >
              {selectedRatings[index] === "selected" ? (
                <FaStar size={28} className="text-yellow-400" />
              ) : (
                <FaRegStar size={28} className="text-gray-400" />
              )}
            </Button>
          );
        })}
      </div>

      <RichEditor
        value={content}
        onChange={setContent}
        placeholder="Write about the book..."
        editable
        className="p-4 rounded-lg focus:outline-none focus:border-blue-500"
      />

      <Button
        isLoading={loading}
        type="submit"
        color="primary"
        className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-teal-400 hover:from-teal-400 hover:to-blue-500"
      >
        Submit Review
      </Button>
    </form>
  );
  
};

export default ReviewForm;
