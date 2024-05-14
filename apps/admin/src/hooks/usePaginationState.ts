import { useState } from "react";

const DEFAULT_PAGE_SIZE = 10;

export function usePaginationState(pageSize = DEFAULT_PAGE_SIZE) {
  const [items, setItems] = useState<number>(pageSize);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  return {
    items,
    setItems,
    isFetchingMore,
    setIsFetchingMore,
    pageSize,
  };
}
