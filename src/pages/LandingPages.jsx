import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Globe, MoreVertical } from 'lucide-react';
import { useLandingPages } from '../hooks/useLandingPages';

const LandingPages = () => {
  const { landingPages, loading, error, deleteLandingPage } = useLandingPages();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Filtro para busca
  const filteredPages = landingPages.filter(page =>
    page.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeletePage = async (page) => {
    const identifier = page.slug || page.id;
    const result = await deleteLandingPage(identifier);
    if (result.success) {
      alert(result.message || 'Landing page deletada com sucesso!');
    } else {
      alert('Erro ao deletar landing page: ' + (result.error || 'Erro desconhecido'));
    }
    setDeleteConfirm(null);
  };

  // Loading state
  if (loading && landingPages.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Carregando landing pages...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-400">Erro ao carregar landing pages: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Landing Pages</h1>
          <p className="text-gray-400">Gerencie suas páginas de conversão</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
          <Plus className="h-5 w-5" />
          <span>Nova Página</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between relative z-10">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar páginas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 relative z-0"
          />
        </div>
        <div className="flex items-center space-x-4">
          <select className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2">
            <option value="">Todos os Status</option>
            <option value="published">Publicado</option>
            <option value="draft">Rascunho</option>
            <option value="archived">Arquivado</option>
          </select>
          <select className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2">
            <option value="">Ordenar por</option>
            <option value="date">Data</option>
            <option value="views">Visualizações</option>
            <option value="leads">Leads</option>
          </select>
        </div>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPages.map((page) => (
          <div key={page.id || page.slug} className="bg-gray-800 rounded-lg overflow-hidden card-hover">
            <div className="relative">
              {page.thumbnail && (
                <img
                  src={page.thumbnail}
                  alt={page.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  page.status === 'published' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {page.status === 'published' ? 'Publicado' : 'Rascunho'}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">{page.title}</h3>
              <p className="text-gray-400 text-sm mb-4">/{page.slug}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{page.views ?? 0}</div>
                  <div className="text-xs text-gray-400">Visualizações</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{page.leads ?? 0}</div>
                  <div className="text-xs text-gray-400">Leads</div>
                </div>
              </div>

              <div className="text-xs text-gray-400 mb-4">
                Modificado em {page.updatedAt ? new Date(page.updatedAt).toLocaleDateString('pt-BR') : '--'}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => {
                      window.open(`/editor/${page.slug || page.id}`);
                    }}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    title="Editar Landing Page"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  {page.status === 'published' && (
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200">
                      <Globe className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setDeleteConfirm(page)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    title="Deletar Landing Page"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-white mb-4">Confirmar Exclusão</h3>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja deletar a landing page "{deleteConfirm.title}"? 
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-gray-400 hover:text-white border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeletePage(deleteConfirm)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-white">Carregando...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPages;
