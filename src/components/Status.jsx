import React from 'react'

const Status = () => (
  <>
    <strong className="inline-flex items-center border bg-white border-gray-200 rounded relative px-2.5 py-1.5 text-xs font-medium">
      <span className="animate-ping w-2.5 h-2.5 bg-green-600/75 rounded-full absolute -top-1 -left-1" />
      <span className="w-2.5 h-2.5 bg-green-600 rounded-full absolute -top-1 -left-1" />
      <span className="text-gray-700">Service Status: </span>
      <span className="text-green-700 ml-1.5">Active</span>
    </strong>
  </>
);

export default Status
