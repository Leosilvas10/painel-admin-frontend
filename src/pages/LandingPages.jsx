
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Globe, MoreVertical } from 'lucide-react';

const LandingPages = () => {
  const [pages, setPages] = useState([
    {
      id: 1,
      title: 'Produto Revolucionário',
      slug: 'produto-revolucionario',
      status: 'published',
      views: 1250,
      leads: 45,
      lastModified: '2024-01-15',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      title: 'Curso Premium Marketing',
      slug: 'curso-marketing',
      status: 'draft',
      views: 850,
      leads: 32,
      lastModified: '2024-01-14',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      title: 'Consultoria Especializada',
      slug: 'consultoria',
      status: 'published',
      views: 2100,
      leads: 78,
      lastModified: '2024-01-13',
      thumbnail: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar páginas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPages.map((page) => (
          <div key={page.id} className="bg-gray-800 rounded-lg overflow-hidden card-hover">
            <div className="relative">
              <img
                src={page.thumbnail}
                alt={page.title}
                className="w-full h-48 object-cover"
              />
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
                  <div className="text-2xl font-bold text-white">{page.views}</div>
                  <div className="text-xs text-gray-400">Visualizações</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{page.leads}</div>
                  <div className="text-xs text-gray-400">Leads</div>
                </div>
              </div>
              
              <div className="text-xs text-gray-400 mb-4">
                Modificado em {new Date(page.lastModified).toLocaleDateString('pt-BR')}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200">
                    <Edit className="h-4 w-4" />
                  </button>
                  {page.status === 'published' && (
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200">
                      <Globe className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors duration-200">
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-gray-400 text-sm">Total de Páginas</div>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Globe className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">4,200</div>
              <div className="text-gray-400 text-sm">Total de Leads</div>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-green-400 text-xl">👥</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">18.5%</div>
              <div className="text-gray-400 text-sm">Taxa de Conversão</div>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-blue-400 text-xl">📈</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">8</div>
              <div className="text-gray-400 text-sm">Páginas Ativas</div>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <span className="text-orange-400 text-xl">🚀</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPages;
