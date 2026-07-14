import React from 'react'

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  return (
    <div>
      <input
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.map(result => (
        <div
          key={result.label}
          onClick={() => onSelect(result)}
        >
          {result.label}
        </div>
      ))}
    </div>
  );
}

export default SearchBar