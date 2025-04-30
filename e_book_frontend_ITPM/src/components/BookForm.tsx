import {
    Autocomplete,
    AutocompleteItem,
    Button,
    DatePicker,
    Input,
    Radio,
    RadioGroup,
  } from "@nextui-org/react";
  import {
    ChangeEventHandler,
    FC,
    FormEventHandler,
    useEffect,
    useState,
  } from "react";
  import { genreList, genres, languageList, languages } from "../utils/data";
  import PosterSelector from "./PosterSelector";
  import RichEditor from "./rich-editor";
  import { parseDate } from "@internationalized/date";
  import { z } from "zod";
  import ErrorList from "./common/ErrorList";
  import clsx from "clsx";
  import { parseError } from "../utils/helper";
  
  export interface InitialBookToUpdate {
    id: string;
    slug: string;
    title: string;
    status: string;
    description: string;
    genre: string;
    language: string;
    cover?: string;
    price: { mrp: string; sale: string };
    publicationName: string;
    publishedAt: string;
  }
  
  interface Props {
    title: string;
    submitBtnTitle: string;
    initialState?: InitialBookToUpdate;
    onSubmit(formData: FormData, file?: File | null): Promise<void>;
  }
  
  interface DefaultForm {
    file?: File | null;
    cover?: File;
    title: string;
    description: string;
    publicationName: string;
    publishedAt?: string;
    genre: string;
    language: string;
    mrp: string;
    sale: string;
    status: string;
  }
  
  const defaultBookInfo = {
    title: "",
    description: "",
    language: "",
    genre: "",
    mrp: "",
    publicationName: "",
    sale: "",
    status: "published",
  };
  
  interface BookToSubmit {
    title: string;
    status: string;
    description: string;
    uploadMethod: "aws" | "local";
    language: string;
    publishedAt?: string;
    slug?: string;
    publicationName: string;
    genre: string;
    price: {
      mrp: number;
      sale: number;
    };
    fileInfo?: {
      type: string;
      name: string;
      size: number;
    };
  }
  
  const commonBookSchema = {
    title: z.string().trim().min(5, "Title is too short!"),
    description: z.string().trim().min(5, "Description is too short!"),
    genre: z.enum(genreList, { message: "Please select a genre!" }),
    language: z.enum(languageList, { message: "Please select a language!" }),
    publicationName: z
      .string({ required_error: "Invalid publication name!" })
      .trim()
      .min(3, "Description is too short!"),
    uploadMethod: z.enum(["aws", "local"], {
      message: "Upload method is missing!",
    }),
    publishedAt: z.string({ required_error: "Publish date is missing!" }).trim(),
    price: z
      .object({
        mrp: z
          .number({ required_error: "MRP is missing!" })
          .refine((val) => val > 0, "MRP is missing!"),
        sale: z
          .number({ required_error: "Sale price is missing!" })
          .refine((val) => val > 0, "Sale price is missing!"),
      })
      .refine((price) => price.sale <= price.mrp, "Invalid sale price!"),
  };
  
  const fileInfoSchema = z.object({
    name: z
      .string({ required_error: "File name is missing!" })
      .min(1, "File name is missing!"),
    type: z
      .string({ required_error: "File type is missing!" })
      .min(1, "File type is missing!"),
    size: z
      .number({ required_error: "File size is missing!" })
      .refine((val) => val > 0, "Invalid file size!"),
  });
  
  const newBookSchema = z.object({
    ...commonBookSchema,
    fileInfo: fileInfoSchema,
  });
  
  const updateBookSchema = z.object({
    ...commonBookSchema,
    fileInfo: fileInfoSchema.optional(),
  });
  
  const BookForm: FC<Props> = ({
    initialState,
    title,
    submitBtnTitle,
    onSubmit,
  }) => {
    const [bookInfo, setBookInfo] = useState<DefaultForm>(defaultBookInfo);
    const [cover, setCover] = useState("");
    const [busy, setBusy] = useState(false);
    const [isForUpdate, setIsForUpdate] = useState(false);
    const [errors, setErrors] = useState<{
      [key: string]: string[] | undefined;
    }>();
  
    const handleTextChange: ChangeEventHandler<HTMLInputElement> = ({
      target,
    }) => {
      const { value, name } = target;
  
      setBookInfo({ ...bookInfo, [name]: value });
    };
  
    const handleFileChange: ChangeEventHandler<HTMLInputElement> = ({
      target,
    }) => {
      const { files, name } = target;
  
      if (!files) return;
  
      const file = files[0];
  
      if (name === "cover") {
        try {
          setCover(URL.createObjectURL(file));
        } catch (error) {
          setCover("");
        }
      }
  
      setBookInfo({ ...bookInfo, [name]: file });
    };
  
    const handleBookPublish = async () => {
      setBusy(true);
      try {
        const formData = new FormData();
  
        const { file, cover } = bookInfo;
  
        // Validate book file (must be epub type)
        if (file?.type !== "application/epub+zip") {
          return setErrors({
            ...errors,
            file: ["Please select a valid (.epub) file."],
          });
        } else {
          setErrors({
            ...errors,
            file: undefined,
          });
        }

  export default BookForm;
  