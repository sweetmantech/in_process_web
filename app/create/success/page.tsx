"use client";

import { useSearchParams } from "next/navigation";
import CreateSuccess from "@/components/CreateSuccess";
import BatchSuccess from "@/components/CreateSuccess/BatchSuccess";

const Success = () => {
  const searchParams = useSearchParams();
  const isBatch = searchParams.has("tokenIds");

  if (isBatch) {
    return <BatchSuccess />;
  }

  return <CreateSuccess />;
};

export default Success;
