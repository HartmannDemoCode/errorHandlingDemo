const RenderErrorDemo = ({user}) => (
  <div style={{ padding: "1rem", backgroundColor: "#fb1111", marginBottom: "1rem" }}>
    <h2>Demo</h2>
    <p>This is a demo of error handling in React.</p>
    {user.name}
  </div>
);

const JSErrorDemo = () => {
  const handleClick = () => {
    // This will throw a ReferenceError
    nonExistentFunction();
  };

  return (
    <div style={{ padding: "1rem", backgroundColor: "#041765", marginBottom: "1rem" }}>
      <h2>JS Error Demo</h2>
      <p>This is a demo of a JavaScript error.</p>
      <button onClick={handleClick}>Trigger JS Error</button>
    </div>
  );
};
export { RenderErrorDemo, JSErrorDemo };