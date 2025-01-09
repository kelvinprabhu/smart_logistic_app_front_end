import React from 'react';

interface StockLevelIndicatorProps {
  current: number;
  minimum: number;
  maximum: number;
}

const StockLevelIndicator: React.FC<StockLevelIndicatorProps> = ({
  current,
  minimum,
  maximum,
}) => {
  const percentage = (current / maximum) * 100;
  const isLow = current <= minimum;

  return (
    <div className="w-full">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${
            isLow ? 'bg-red-500' : 'bg-green-500'
          } transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>{current} units</span>
        <span>{maximum} max</span>
      </div>
    </div>
  );
};

export default StockLevelIndicator;