import { httpService } from "@/api";
import { DEBOUNCE_TIME } from "@/constants";
import { useState, useEffect } from "react";

const useDebouncedSearch = (initialTerm: string) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialTerm);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await httpService.search(searchTerm);
      setResults(response);
    };

    const debounceTimer = setTimeout(() => {
      fetchData();
    }, DEBOUNCE_TIME);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm]);

  return {
    searchTerm,
    results,
    setSearchTerm,
  };
};

export default useDebouncedSearch;
