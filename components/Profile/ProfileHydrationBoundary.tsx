"use client";

import { HydrationBoundary, type DehydratedState } from "@tanstack/react-query";
import { ReactNode } from "react";

interface ProfileHydrationBoundaryProps {
  state: DehydratedState;
  children: ReactNode;
}

const ProfileHydrationBoundary = ({ state, children }: ProfileHydrationBoundaryProps) => (
  <HydrationBoundary state={state}>{children}</HydrationBoundary>
);

export default ProfileHydrationBoundary;
