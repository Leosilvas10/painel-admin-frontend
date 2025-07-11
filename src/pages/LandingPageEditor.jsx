
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Eye, Settings, Plus, Trash2, Edit } from 'lucide-react';
import { useBlocks, useSettings, useImages } from '../hooks/useApi';

const LandingPageEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blocks, loading, createBlock, updateBlock, deleteBlock, reorderBlocks } = useBlocks();
  const { settings, updateSettings } = useSettings();
  const { images, uploadImage } = useImages();
  
  const [landingPage, setLandingPage] = useState({
    id: id,
    title: '',
    slug: '',
    status: 'draft',
    seoTitle: '',
    seoDescription: '',
    favicon: '',
    customCSS: '',
    customJS: ''
  });

  const [selectedBlock, setSelectedBlock] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Simulated landing page data - replace with API call
  useEffect(() => {
    if (id) {
      // This would normally be an API call to get the specific landing page
      const mockLandingPage = {
        id: id,
        title: id === '1' ? 'Produto Revolucionário' : id === '2' ? 'Curso Premium Marketing' : 'Consultoria Especializada',
        slug: id === '1' ? 'produto-revolucionario' : id === '2' ? 'curso-marketing' : 'consultoria',
        status: 'published',
        seoTitle: 'Landing Page - Produto Revolucionário',
        seoDescription: 'Descrição SEO da landing page',
        favicon: '',
        customCSS: '',
        customJS: ''
      };
      setLandingPage(mockLandingPage);
    }
  }, [id]);

  const blockTypes = [
    { type: 'hero', name: 'Hero Section', icon: '🎯' },
    { type: 'features', name: 'Features', icon: '⭐' },
    { type: 'testimonials', name: 'Testimonials', icon: '💬' },
    { type: 'pricing', name: 'Pricing', icon: '💰' },
    { type: 'cta', name: 'Call to Action', icon: '🚀' },
    { type: 'contact', name: 'Contact Form', icon: '📧' },
    { type: 'text', name: 'Text Block', icon: '📝' },
    { type: 'image', name: 'Image Block', icon: '🖼️' },
    { type: 'video', name: 'Video Block', icon: '🎥' }
  ];

  const handleSavePage = async () => {
    try {
      // API call to save landing page
      console.log('Saving landing page:', landingPage);
      alert('Landing page salva com sucesso!');
    } catch (error) {
      console.error('Error saving landing page:', error);
      alert('Erro ao salvar landing page');
    }
  };

  const handleAddBlock = async (blockType) => {
    const newBlock = {
      type: blockType,
      content: getDefaultBlockContent(blockType),
      order: blocks.length,
      settings: {}
    };
    
    const result = await createBlock(newBlock);
    if (result.success) {
      setSelectedBlock(result.data);
    }
  };

  const getDefaultBlockContent = (type) => {
    const defaults = {
      hero: {
        title: 'Título Principal',
        subtitle: 'Subtítulo ou descrição',
        buttonText: 'Call to Action',
        buttonLink: '#',
        backgroundImage: '',
        textAlign: 'center'
      },
      features: {
        title: 'Nossas Features',
        items: [
          { title: 'Feature 1', description: 'Descrição da feature 1', icon: '✅' },
          { title: 'Feature 2', description: 'Descrição da feature 2', icon: '✅' },
          { title: 'Feature 3', description: 'Descrição da feature 3', icon: '✅' }
        ]
      },
      text: {
        content: '<p>Seu conteúdo de texto aqui...</p>',
        alignment: 'left'
      },
      image: {
        src: '',
        alt: 'Descrição da imagem',
        width: '100%',
        alignment: 'center'
      },
      cta: {
        title: 'Pronto para começar?',
        subtitle: 'Junte-se a milhares de pessoas satisfeitas',
        buttonText: 'Começar Agora',
        buttonLink: '#',
        backgroundColor: '#6366f1'
      }
    };
    return defaults[type] || {};
  };

  const BlockEditor = ({ block, onUpdate }) => {
    const [content, setContent] = useState(block.content);

    const handleUpdate = () => {
      onUpdate(block.id, { ...block, content });
    };

    if (block.type === 'hero') {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Editar Hero Section</h3>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
            <input
              type="text"
              value={content.title || ''}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Subtítulo</label>
            <textarea
              value={content.subtitle || ''}
              onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Texto do Botão</label>
            <input
              type="text"
              value={content.buttonText || ''}
              onChange={(e) => setContent({ ...content, buttonText: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Link do Botão</label>
            <input
              type="text"
              value={content.buttonLink || ''}
              onChange={(e) => setContent({ ...content, buttonLink: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            Atualizar Bloco
          </button>
        </div>
      );
    }

    if (block.type === 'text') {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Editar Bloco de Texto</h3>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Conteúdo</label>
            <textarea
              value={content.content || ''}
              onChange={(e) => setContent({ ...content, content: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white font-mono text-sm"
              placeholder="Digite seu conteúdo aqui..."
            />
          </div>
          <button
            onClick={handleUpdate}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            Atualizar Bloco
          </button>
        </div>
      );
    }

    return (
      <div className="text-white">
        <p>Editor para tipo "{block.type}" ainda não implementado.</p>
        <button
          onClick={handleUpdate}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md mt-4"
        >
          Atualizar Bloco
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Carregando editor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/landing-pages')}
              className="flex items-center text-gray-400 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">{landingPage.title}</h1>
              <p className="text-sm text-gray-400">/{landingPage.slug}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
            >
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? 'Editor' : 'Preview'}
            </button>
            <select
              value={landingPage.status}
              onChange={(e) => setLandingPage({ ...landingPage, status: e.target.value })}
              className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2"
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
            </select>
            <button
              onClick={handleSavePage}
              className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar - Block Library */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-white mb-4">Blocos Disponíveis</h2>
            <div className="space-y-2">
              {blockTypes.map((blockType) => (
                <button
                  key={blockType.type}
                  onClick={() => handleAddBlock(blockType.type)}
                  className="w-full flex items-center p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-left"
                >
                  <span className="text-xl mr-3">{blockType.icon}</span>
                  <span>{blockType.name}</span>
                  <Plus className="h-4 w-4 ml-auto" />
                </button>
              ))}
            </div>
          </div>

          {/* Current Blocks */}
          <div className="p-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Blocos na Página</h3>
            <div className="space-y-2">
              {blocks.map((block, index) => (
                <div
                  key={block.id}
                  className={`p-3 rounded-lg cursor-pointer flex items-center justify-between ${
                    selectedBlock?.id === block.id ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => setSelectedBlock(block)}
                >
                  <div className="text-white">
                    <div className="font-medium">{blockTypes.find(t => t.type === block.type)?.name}</div>
                    <div className="text-sm text-gray-400">Posição {index + 1}</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBlock(block);
                      }}
                      className="p-1 text-gray-400 hover:text-white"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBlock(block.id);
                      }}
                      className="p-1 text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Canvas/Preview */}
          <div className="flex-1 bg-white overflow-y-auto">
            {previewMode ? (
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Preview da Landing Page</h2>
                {blocks.map((block) => (
                  <div key={block.id} className="mb-8 border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-2">
                      {blockTypes.find(t => t.type === block.type)?.name}
                    </div>
                    {/* Render block preview based on type */}
                    {block.type === 'hero' && (
                      <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg">
                        <h1 className="text-4xl font-bold mb-4">{block.content?.title}</h1>
                        <p className="text-xl mb-6">{block.content?.subtitle}</p>
                        <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold">
                          {block.content?.buttonText}
                        </button>
                      </div>
                    )}
                    {block.type === 'text' && (
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: block.content?.content }} />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Editor Visual</h2>
                <div className="space-y-4">
                  {blocks.map((block, index) => (
                    <div
                      key={block.id}
                      className={`border-2 border-dashed p-4 rounded-lg cursor-pointer ${
                        selectedBlock?.id === block.id 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedBlock(block)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          {blockTypes.find(t => t.type === block.type)?.icon} {blockTypes.find(t => t.type === block.type)?.name}
                        </span>
                        <span className="text-xs text-gray-400">Bloco {index + 1}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Clique para editar este bloco
                      </div>
                    </div>
                  ))}
                  
                  {blocks.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <p className="text-lg mb-4">Sua landing page está vazia</p>
                      <p>Adicione blocos usando a barra lateral esquerda</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Properties Panel */}
          {selectedBlock && (
            <div className="w-80 bg-gray-800 border-l border-gray-700 overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Propriedades</h3>
                  <button
                    onClick={() => setSelectedBlock(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>
                <BlockEditor 
                  block={selectedBlock} 
                  onUpdate={(id, updatedBlock) => updateBlock(id, updatedBlock)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPageEditor;
