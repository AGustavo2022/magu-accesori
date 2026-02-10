'use client';

import { Search, X } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

export default function SearchNew({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const initialValue = searchParams.get('query') ?? '';
  const [value, setValue] = useState(initialValue);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const clearSearch = () => {
    setValue('');
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.delete('query');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-full px-1 py-5">

      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

      <input
        className="block w-full rounded-md border border-gray-200 py-2 pl-9 pr-9 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          handleSearch(e.target.value);
        }}
      />

      {value && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-11 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
