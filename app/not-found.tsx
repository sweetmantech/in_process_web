import { Metadata } from "next";
import NotFoundPage from "@/components/NotFoundPage";

export const metadata: Metadata = {
  title: "Page not found - In Process",
};

const NotFound = () => <NotFoundPage />;

export default NotFound;
