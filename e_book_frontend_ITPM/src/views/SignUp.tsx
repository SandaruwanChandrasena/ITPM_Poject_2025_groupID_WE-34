import { Button, Input } from "@nextui-org/react";
import { FC, FormEventHandler, useState } from "react";
import Book from "../svg/Book";
import client from "../api/client";
import { RiMailCheckLine } from "react-icons/ri";
import "./SignUp.css";

interface Props {}

const emailRegex = new RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
);

const SignUp: FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);
  const [showSuccessResponse, setShowSuccessResponse] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    if (!emailRegex.test(email)) return setInvalidForm(true);

    setInvalidForm(false);

    setBusy(true);
    try {
      await client.post("/auth/generate-link", {
        email,
      });

      setShowSuccessResponse(true);
    } catch (error) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  };

  if (showSuccessResponse)
    // return (
    //   <div className="flex-1 flex flex-col items-center justify-center md:p-0 p-4">
    //     <RiMailCheckLine size={80} className="animate-bounce" />
    //     <p className="text-lg text-center">
    //       Please check your email we just sent you a magic link.
    //     </p>
    //     <p className="font-semibold">
    //       If you are a new user then it may take some time to show up mail
    //       inside your inbox. So have patience.
    //     </p>
    //   </div>
    // );

    return (
      <div className="flex-1 flex flex-col items-center justify-center md:p-0 p-4 space-y-6">
        {/* Adding a shadow effect on the icon for a more prominent look */}
        <RiMailCheckLine size={80} className="animate-bounce text-indigo-600 shadow-lg p-2 rounded-full bg-white border-2 border-transparent hover:border-blue-500 transition-all duration-600 ease-in-out"/>
    
        {/* Added some styling for the text */}
        <p className="text-lg text-center text-gray-700 font-medium">
          Please check your email we just sent you a magic link.
        </p>
        
        <p className="font-semibold text-gray-800 text-sm">
          If you are a new user then it may take some time to show up mail
          inside your inbox. So have patience.
        </p>
      </div>
    );
    
  // return (
  //   <div className="flex-1 flex items-center justify-center">
  //     <div className="flex flex-col items-center justify-center w-96 border-2 p-5 rounded-md">
  //       <Book className="w-44 h-44" />
  //       <h1 className="text-center text-xl font-semibold">
  //         Books are the keys to countless doors. Sign up and unlock your
  //         potential.
  //       </h1>

  //       <form onSubmit={handleSubmit} className="w-full space-y-6 mt-6">
  //         <Input
  //           label="Email"
  //           placeholder="john@email.com"
  //           variant="bordered"
  //           isInvalid={invalidForm}
  //           errorMessage="Invalid email!"
  //           value={email}
  //           onChange={({ target }) => {
  //             setEmail(target.value);
  //           }}
  //         />
  //         <Button isLoading={busy} type="submit" className="w-full">
  //           Send Me The Link
  //         </Button>
  //       </form>
  //     </div>
  //   </div>
  // );


  return (
    <div className="flex-1 flex items-center justify-center bg-gray-100 min-h-screen bg-pic-signup relative ">
      <div className="flex flex-col items-center justify-center w-96 border-2 border-black bg-white shadow-lg p-6 rounded-lg backdrop-blur-2xl backdrop-opacity-60">
        <Book className="w-44 h-44 text-indigo-600" />
        <h1 className="text-center text-xl font-semibold text-gray-800 mt-4">
          Books are the keys to countless doors. Sign up and unlock your
          potential.
        </h1>
  
        <form onSubmit={handleSubmit} className="w-full space-y-6 mt-6 ">
          <Input
            label="Email"
            placeholder="john@email.com"
            variant="bordered"
            isInvalid={invalidForm}
            errorMessage="Invalid email!"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            className="w-full border-gray-400 focus:border-indigo-500"
          />
          <Button
            isLoading={busy}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition"
          >
            Send Me The Link
          </Button>
        </form>
      </div>
    </div>
  );
  
};

export default SignUp;
