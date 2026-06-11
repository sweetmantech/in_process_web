import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFormSchema, CreateFormData } from "@/lib/schema/createFormSchema";
import { useState, useEffect, useRef } from "react";
import { useMask } from "./useMask";
import { useBlobUrls } from "./useBlobUrls";
import { Currency } from "@/types/balances";

const useMetadataForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Non-form state (not in react-hook-form schema)
  const [isTimedSale, setIsTimedSale] = useState<boolean>(false);
  const [mimeType, setMimeType] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [isOpenPreviewUpload, setIsOpenPreviewUpload] = useState<boolean>(false);
  const [embedCode, setEmbedCode] = useState("");
  const [link, setLink] = useState<string>("");
  const [writingText, setWritingText] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [animationFile, setAnimationFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isOpenAdvanced, setIsOpenAdvanced] = useState<boolean>(false);

  const { blobUrls, previewFileUrl, animationFileUrl } = useBlobUrls({
    previewFile,
    imageFile,
    animationFile,
    mimeType,
  });

  const mask = useMask(isOpenAdvanced, writingText);

  // react-hook-form is the single source of truth for form fields
  const form = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: "",
      price: "1",
      priceUnit: "usdc" as Currency,
      description: undefined,
      startDate: undefined,
      splits: undefined,
      totalSupply: undefined,
    },
    mode: "onChange",
  });

  // Derive form field values — form is the single source of truth
  const name = useWatch({ control: form.control, name: "name" }) ?? "";
  const price = useWatch({ control: form.control, name: "price" }) ?? "1";
  const priceUnit = (useWatch({ control: form.control, name: "priceUnit" }) ?? "usdc") as Currency;
  const description = useWatch({ control: form.control, name: "description" }) ?? "";
  const startDate = useWatch({ control: form.control, name: "startDate" });
  const totalSupply = useWatch({ control: form.control, name: "totalSupply" });

  // Reset price to sensible default when currency unit changes
  useEffect(() => {
    form.setValue("price", priceUnit === "usdc" ? "1" : "0.000111");
  }, [priceUnit, form]);

  // Setters — thin wrappers so consumers don't need to know about form internals
  const setName = (val: string) => form.setValue("name", val, { shouldValidate: false });
  const setPrice = (val: string) => form.setValue("price", val, { shouldValidate: false });
  const setPriceUnit = (val: Currency) =>
    form.setValue("priceUnit", val, { shouldValidate: false });
  const setDescription = (val: string) =>
    form.setValue("description", val || undefined, { shouldValidate: false });
  const setTotalSupply = (val: number | undefined) =>
    form.setValue("totalSupply", val, { shouldValidate: false });
  const onChangeStartDate = (val: Date) =>
    form.setValue("startDate", val, { shouldValidate: false });

  const clearMediaState = () => {
    setImageFile(null);
    setAnimationFile(null);
    setPreviewFile(null);
    setMimeType("");
    setDownloadUrl("");
    setEmbedCode("");
    setLink("");
    setWritingText("");
  };

  const resetForm = () => {
    form.setValue("name", "", { shouldValidate: false });
    form.setValue("description", undefined, { shouldValidate: false });
    clearMediaState();
  };

  const resetFiles = () => {
    clearMediaState();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // name and description live in form — clearMediaState doesn't touch them
  };

  const hasMedia = Boolean(previewFile || imageFile || animationFile);

  return {
    form,

    name,
    setName,
    priceUnit,
    setPriceUnit,
    price,
    setPrice,
    description,
    setDescription,
    isTimedSale,
    setIsTimedSale,
    mimeType,
    setMimeType,
    downloadUrl,
    setDownloadUrl,
    isOpenPreviewUpload,
    setIsOpenPreviewUpload,
    setWritingText,
    writingText,
    setEmbedCode,
    embedCode,
    setLink,
    link,
    resetForm,
    resetFiles,

    startDate,
    onChangeStartDate,
    isOpenAdvanced,
    setIsOpenAdvanced,
    totalSupply,
    setTotalSupply,

    ...mask,

    imageFile,
    setImageFile,
    animationFile,
    setAnimationFile,
    previewFile,
    setPreviewFile,

    hasMedia,

    blobUrls,
    previewFileUrl,
    animationFileUrl,

    uploadProgress,
    setUploadProgress,
    isUploading,
    setIsUploading,

    fileInputRef,
  };
};

export default useMetadataForm;
