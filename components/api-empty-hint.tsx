"use client";

/**
 * Shown when destinations/tours/hotels lists are empty so users know
 * they need to start the API and run the seed to see data.
 */
export function ApiEmptyHint() {
  return (
    <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
      To load data, start the API in the <code className="bg-muted px-1 rounded">api</code> folder
      with <code className="bg-muted px-1 rounded">npm run start:dev</code>, then run{" "}
      <code className="bg-muted px-1 rounded">npm run seed</code> to populate the database.
    </p>
  );
}
