"use client";

import qs from "query-string";
import { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <form onSubmit={onSubmit} className="relative w-full flex items-center">
      <div className="relative w-full flex-grow">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          className="pr-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 lg:w-[635px] md:w-[455px] sm:w-[305px] w-full"
        />

        {value && (
          <X
            className="absolute top-2.5 right-12 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition mr-4"
            onClick={onClear}
          />
        )}
        <Button
          type="submit"
          size="sm"
          variant="secondary"
          className="absolute top-0 right-0 h-full rounded-l-none bg-white border-2"
        >
          <SearchIcon className="text-[#1d3966]" />
        </Button>
      </div>
    </form>
  );
};
