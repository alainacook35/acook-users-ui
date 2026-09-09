/**
 * Determines whether a value is "defined" for query-building purposes.
 * - Strings must be non-null/undefined and non-blank after trimming.
 * - Numbers (and other non-string values) must simply not be null/undefined.
 */
export function isDefined(value: string | number | object | null | undefined): boolean {
  if (typeof value === "string") {
    return value.trim() !== "";
  }

  return value !== null && value !== undefined;
}
