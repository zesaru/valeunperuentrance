import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Buscar por nombre, email o empresa..." }) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 sm:h-5 sm:w-5 text-gray-400" />
      </div>
      <input
        type="search"
        inputMode="search"
        className="block w-full pl-10 sm:pl-11 pr-10 sm:pr-11 py-3 sm:py-3.5 border-2 border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm transition-all shadow-sm focus:shadow-md"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-gray-600 active:text-gray-800 transition-colors"
          aria-label="Limpiar búsqueda"
          type="button"
        >
          <X className="h-5 w-5 sm:h-5 sm:w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
