
import React, { useState } from 'react';
import { Upload, Search, Grid, List, Download, Trash2, Eye } from 'lucide-react';

const Media = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  
  const mediaItems = [
    {
      id: 1,
      name: 'hero-background.jpg',
      type: 'image',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      name: 'product-demo.mp4',
      type: 'video',
      size: '15.2 MB',
      uploadDate: '2024-01-14',
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      name: 'testimonial-photo.jpg',
      type: 'image',
      size: '1.8 MB',
      uploadDate: '2024-01-13',
      url: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Biblioteca de Mídia</h1>
          <p className="text-gray-400">Gerencie imagens, vídeos e outros arquivos</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
          <Upload className="h-5 w-5" />
          <span>Upload</span>
        </button>
      </div>

      {/* Search and Controls */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar arquivos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2">
              <option value="">Todos os tipos</option>
              <option value="image">Imagens</option>
              <option value="video">Vídeos</option>
              <option value="document">Documentos</option>
            </select>
            <div className="flex items-center bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-gray-800 rounded-lg p-8 border-2 border-dashed border-gray-600 hover:border-purple-500 transition-colors duration-200">
        <div className="text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Solte arquivos aqui ou clique para selecionar</h3>
          <p className="text-gray-400">Suporte para imagens, vídeos e documentos até 50MB</p>
          <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
            Selecionar Arquivos
          </button>
        </div>
      </div>

      {/* Media Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaItems.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden card-hover">
              <div className="relative aspect-square">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-4xl">🎥</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="flex space-x-2">
                    <button className="p-2 bg-white/20 rounded-lg text-white hover:bg-white/30">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-white/20 rounded-lg text-white hover:bg-white/30">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-white/20 rounded-lg text-white hover:bg-white/30">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium truncate">{item.name}</h3>
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>{item.size}</span>
                  <span>{new Date(item.uploadDate).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tamanho</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {mediaItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center mr-3">
                        {item.type === 'image' ? '🖼️' : '🎥'}
                      </div>
                      <span className="text-white">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{item.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{item.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {new Date(item.uploadDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-white">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-white">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Storage Stats */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Uso do Armazenamento</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Usado</span>
              <span className="text-white">2.4 GB de 10 GB</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '24%' }}></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">245</div>
            <div className="text-gray-400 text-sm">Total de Arquivos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">32</div>
            <div className="text-gray-400 text-sm">Adicionados este mês</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media;
