import CvBuilderTopBar from '@/components/CvBuilderTopBar';
import React from 'react'

const CvBuilderLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
      <main className="min-h-screen flex flex-col">
        <CvBuilderTopBar />
        <div className="flex-grow">{children}</div>
      </main>
    );
  };
  

export default CvBuilderLayout
