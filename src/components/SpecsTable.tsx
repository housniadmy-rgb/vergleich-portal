interface SpecsTableProps {
  specs: Record<string, string>
  highlighted?: string[]
  title?: string
}

export function SpecsTable({ specs, highlighted = [], title = 'Technische Spezifikationen' }: SpecsTableProps) {
  const entries = Object.entries(specs)

  return (
    <div className="card overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {entries.map(([key, value]) => (
          <div key={key}
            className={`spec-row px-5 ${highlighted.includes(key) ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
            <dt className="text-gray-500 dark:text-gray-400 font-medium flex-shrink-0">{key}</dt>
            <dd className={`text-right ml-4 font-medium max-w-[60%] ${highlighted.includes(key) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
              {value}
            </dd>
          </div>
        ))}
      </div>
    </div>
  )
}
