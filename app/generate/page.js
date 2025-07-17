// app/generate/page.js
'use client';
import React, { Suspense } from 'react';
import Page from './PageInner';

export default function PageWrapper() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading form...</div>}>
      <Page />
    </Suspense>
  );
}
