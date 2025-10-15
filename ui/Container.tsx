import React from 'react'
import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
}
const Container = ({children,className}:Props) => {
  const newclassName = twMerge('max-w-screen-xl mx-auto py-2 px-4 lg:px-10', className)
  return (
    <div className={newclassName}>{children}</div>
  )
}

export default Container;