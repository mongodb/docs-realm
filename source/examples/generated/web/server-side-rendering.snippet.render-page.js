export default function Ssr({ lily }) {
  return (
    <div>
      <h1>Data from Server-Side Rendering</h1>
      {lily ? (
        <div>
          <p>{lily.name}</p>
          <p>{lily.color}</p>
        </div>
      ) : (
        "no plant"
      )}
    </div>
  );
}
