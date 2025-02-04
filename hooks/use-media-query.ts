import * as React from "react";

type MediaQueryKeys =
  | "min-width"
  | "max-width"
  | "min-height"
  | "max-height"
  | "orientation";

// 미디어쿼리 형식을 정의하는 타입
type MediaQueryString = `(${MediaQueryKeys}: ${number}px)`;

export function useMediaQuery(query: MediaQueryString) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);

    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
