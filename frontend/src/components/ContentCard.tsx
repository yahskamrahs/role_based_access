import React from 'react';

interface ContentCardProps {
  title: string;
  content?: string;
  isLoading: boolean;
  error?: string | null;
  colorScheme: 'blue' | 'green' | 'red';
}

const colorStyles = {
  blue: 'border-blue-500 bg-blue-50 text-blue-800',
  green: 'border-green-500 bg-green-50 text-green-800',
  red: 'border-red-500 bg-red-50 text-red-800',
};

const ContentCard: React.FC<ContentCardProps> = ({ title, content, isLoading, error, colorScheme }) => {
  return (
    <div className={`border-l-4 rounded-md p-6 shadow-sm bg-white ${colorStyles[colorScheme].split(' ')[0]}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      
      {isLoading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ) : error ? (
        <div className="p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
          <p className="text-sm font-medium">{error}</p>
        </div>
      ) : (
        <div className={`p-4 rounded-md ${colorStyles[colorScheme].split(' ').slice(1).join(' ')}`}>
          <p className="text-md font-medium">{content}</p>
        </div>
      )}
    </div>
  );
};

export default ContentCard;
