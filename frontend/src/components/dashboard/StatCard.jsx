function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-start">
        
        <div>
          <h3 className="text-gray-500 text-sm mb-2">
            {title}
          </h3>

          <h2 className="text-4xl font-bold mb-2">
            {value}
          </h2>

          <p className="text-sm text-gray-400">
            {subtitle}
          </p>
        </div>

        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;