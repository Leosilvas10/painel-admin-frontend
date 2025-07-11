
import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft, Eye, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBancoJota } from '../hooks/useBancoJota';

const BancoJotaEditor = () => {
  const navigate = useNavigate();
  const { bancoJotaData, loading, error, updateBancoJotaContent, loadBancoJotaContent } = useBancoJota();
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    cta: '',
    description: '',
    message: ''
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    console.log('bancoJotaData mudou:', bancoJotaData);
    if (bancoJotaData && bancoJotaData.data) {
      console.log('Atualizando formData com:', bancoJotaData.data);
      setFormData(bancoJotaData.data);
    }
  }, [bancoJotaData]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await updateBancoJotaContent({
        slug: 'banco-jota',
        data: formData
      });
      
      if (result.success) {
        alert('Conteúdo salvo com sucesso!');
      } else {
        alert('Erro ao salvar: ' + (result.error?.message || 'Erro desconhecido'));
      }
    } catch (err) {
      alert('Erro ao salvar: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleRefresh = async () => {
    await loadBancoJotaContent();
  };

  if (loading && (!formData || !formData.title)) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Carregando dados do Banco Jota...</div>
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
              <h1 className="text-xl font-bold text-white">Editor - Banco Jota</h1>
              <p className="text-sm text-gray-400">/banco-jota</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </button>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
            >
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? 'Editor' : 'Preview'}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {!previewMode ? (
          // Editor Mode
          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Editar Conteúdo - Banco Jota</h2>
              
              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-md mb-6">
                  Erro: {error}
                </div>
              )}

              <div className="space-y-6">
                {/* Título */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Título Principal
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Ex: Banco Jota - Soluções Financeiras"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
                  />
                </div>

                {/* Subtítulo */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subtítulo
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle || ''}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    placeholder="Ex: Seu parceiro financeiro de confiança"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
                  />
                </div>

                {/* Call to Action */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Call to Action (CTA)
                  </label>
                  <input
                    type="text"
                    value={formData.cta || ''}
                    onChange={(e) => handleInputChange('cta', e.target.value)}
                    placeholder="Ex: Abra sua conta agora"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
                  />
                </div>

                {/* Descrição */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descrição detalhada dos serviços e benefícios..."
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
                  />
                </div>

                {/* Mensagem */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mensagem Especial
                  </label>
                  <textarea
                    value={formData.message || ''}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Mensagem adicional ou promocional..."
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Preview Mode
          <div className="flex-1 bg-white overflow-y-auto">
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Preview - Banco Jota</h2>
                
                {/* Hero Section Preview */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-12 rounded-lg mb-8">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                      {formData.title || 'Título Principal'}
                    </h1>
                    <p className="text-xl mb-6">
                      {formData.subtitle || 'Subtítulo'}
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      {formData.cta || 'Call to Action'}
                    </button>
                  </div>
                </div>

                {/* Description Section */}
                {formData.description && (
                  <div className="bg-gray-50 p-8 rounded-lg mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Sobre o Banco Jota</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {formData.description}
                    </p>
                  </div>
                )}

                {/* Message Section */}
                {formData.message && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-2">Mensagem Especial</h4>
                    <p className="text-yellow-700">
                      {formData.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BancoJotaEditor;
