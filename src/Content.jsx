import { useOutletContext } from "react-router";

function ErrorThrowingComponent() {
  throw new Error("Our custom error occurred in the React component!");
}

const Content = () => {
  const { showRenderError } = useOutletContext();

  return (
    <div>
      <h1>Content</h1>
      {showRenderError && <ErrorThrowingComponent />}
    </div>
  );
};

export default Content;