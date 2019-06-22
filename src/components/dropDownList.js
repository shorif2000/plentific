export const DropsownListObject = data => {
  return (
    <select name="category">
      {data.map((e, key) => {
        return (
          <option key={key} value={e.id}>
            {e.name}
          </option>
        );
      })}
    </select>
  );
};

//export default DropsownListObject;
