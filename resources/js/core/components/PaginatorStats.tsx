import { PaginationStatsProps } from "../types/types"

export const PaginationStats= ({pagination,search}:PaginationStatsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-blue-600">{pagination.total}</div>
            <div className="text-gray-600">Total de {search.name}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-green-600">{search.total}</div>
            <div className="text-gray-600">En esta página</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-purple-600">{pagination.perPage}</div>
            <div className="text-gray-600">Por página</div>
          </div>
        </div>

    )
}
