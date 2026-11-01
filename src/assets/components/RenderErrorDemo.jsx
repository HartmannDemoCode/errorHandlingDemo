import { Outlet } from "react-router";

export default function RenderErrorDemo({ showRenderError }) {
  if (showRenderError) {
    throw new Error("Our custom error occurred in the React component!");
  }

  return <Outlet context={{ showRenderError }} />;
}