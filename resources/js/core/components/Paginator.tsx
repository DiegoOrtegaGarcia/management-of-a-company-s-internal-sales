import { usePaginator } from "../hooks/usePaginator";
import { PaginationProps } from "../types/types";

export const Pagination = ({pagination,fetchAgain}:PaginationProps) => {

    const{handlePageChange} = usePaginator({pagination,fetchAgain})

    return(
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <div className="text-sm text-gray-600">
            Mostrando {((pagination.currentPage - 1) * pagination.perPage) + 1} -{' '}
            {Math.min(pagination.currentPage * pagination.perPage, pagination.total)} de{' '}
            {pagination.total}
        </div>

        <div className="flex items-center gap-2">
            <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
            >
            Anterior
            </button>

            <div className="flex items-center gap-1">
            {Array.from({ length: pagination.lastPage }, (_, i) => i + 1).map(page => (
                <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg transition-colors ${
                    page === pagination.currentPage
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
                >
                {page}
                </button>
            ))}
            </div>

            <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.lastPage}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
            >
            Siguiente
            </button>
        </div>
        </div>
    )
};
