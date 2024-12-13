'use client'

import { useSearchParams } from 'next/navigation';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'Unknown error';

  return (
    <div>
      <h1>Authentication Error</h1>
      <p>{error}</p>
    </div>
  );
}
