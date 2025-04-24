import { Metadata } from "next";
import { homeMetadata } from "./metadata";
import HomePage from "./page";

export const metadata: Metadata = homeMetadata;

export default function HomePageWrapper() {
  return <HomePage />;
} 