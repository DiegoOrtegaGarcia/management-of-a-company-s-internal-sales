import { Pagination } from '@/core/components/Paginator';
import { ClientCard } from '../components/ClientCard';
import { PaginationStats } from '@/core/components/PaginatorStats';
import { useClientsContainer } from '../hooks/useClientsContainer';
import { ErrorAlert } from '@/core/components/ErrorAlert';
import { router } from '@inertiajs/react';
import { LoadingSpiner } from '@/core/components/LoadingSpin';

export const ClientsContainer = () => {
    const { fetchClients, clients, loading, pagination, error, clearError, setError, errorTitle, setErrorTitle } = useClientsContainer()

    if (loading) {
        return <LoadingSpiner type='clients'/>
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <ErrorAlert error={error} fetchAgain={fetchClients} clearError={clearError} title={errorTitle}/>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
                    </div>

                    <button
                        onClick={() => router.visit("/client/client")}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Client
                    </button>
                </div>
                <div className="mb-6">
                    <PaginationStats pagination={pagination} search={{name:"Clients",total:clients.length}}/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {clients.map(client => (
                        <ClientCard
                            key={client.id}
                            client={client}
                            reFetch={fetchClients}
                            setError={setError}
                            setErrorTitle={setErrorTitle}
                        />
                    ))}
                </div>
                <Pagination pagination={pagination} fetchAgain={fetchClients}/>
            </div>
        </div>
    );
};

export default ClientsContainer;
