export default function SearchBar({ onChange, placeholder }) {
  return (
    <input
      type="text"
      onChange={e => onChange && onChange(e.target.value)}
      placeholder={placeholder || 'Search...'}
      className="w-full p-2 border rounded"
    />
  );
}
