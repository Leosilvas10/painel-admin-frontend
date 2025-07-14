import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';

const LandingPageEditor = () => {
  const { id } = useParams(); // id = slug (ex: "jota-solucoes")
  const navigate = useNavigate();

  const [landingPage, setLandingPage] = useState({
    id: id,
    title: '',
    slug: id,
    subtitle: '',
    description: '',
    cta: '',
    status: 'draft',
    views: 0,
    leads: 0,
    seoTitle: '',
    seoDescription: '',
    favicon: '',
    customCSS: '',
    customJS: '',
    createdAt: '',
    updatedAt: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/api/content/landing/${id}`)
        .then(res => res.json())
        .then((data) => {
          if (data && (data.data || data.landingPage)) {
            // .data por causa da estrutura do seu backend!
            const pageData = data.data || data.landingPage || data;
            setLandingPage({
              ...landingPage,
              ...pageData,
              id: id,
              slug: id,
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.error('Erro ao carregar landing:', err);
        });
    }
    // eslint-disable-next-line
  }, [id]);

  const handleChange = (e) => {
    setLandingPage({
      ...landingPage,
      [e.target.name]: e.target.value
    });
  };

  const handleSavePage = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/content/landing/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(landingPage)
        });
      if (res.ok) {
        alert('Landing page salva com sucesso!');
      } else {
        alert('Erro ao salvar landing page');
      }
    } catch (error) {
      console.error('Erro ao salvar landing page:', error);
      alert('Erro ao salvar landing page');
    }
  };

  if (loading) {
    return <div className="text-white text-center py-20">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/landing-pages')}
            className="flex items-center text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Voltar
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">{landingPage.title || 'Editar Landing Page'}</h1>
            <p className="text-sm text-gray-400">/{landingPage.slug}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSavePage}
            className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
          >
            <Save className="h-4 w-4 mr-2" /> Salvar
          </button>
        </div>
      </div>
      <div className="max-w-2xl mx-auto bg-gray-800 mt-10 p-8 rounded-lg shadow-lg">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-1">Título</label>
            <input
              type="text"
              name="title"
              value={landingPage.title}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Subtítulo</label>
            <input
              type="text"
              name="subtitle"
              value={landingPage.subtitle}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Descrição</label>
            <textarea
              name="description"
              value={landingPage.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Chamada para Ação (CTA)</label>
            <input
              type="text"
              name="cta"
              value={landingPage.cta}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-300 mb-1">Status</label>
              <select
                name="status"
                value={landingPage.status}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              >
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-300 mb-1">Slug</label>
              <input
                type="text"
                name="slug"
                value={landingPage.slug}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                disabled
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-300 mb-1">Visualizações</label>
              <input
                type="number"
                name="views"
                value={landingPage.views}
                readOnly
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white opacity-70"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-300 mb-1">Leads</label>
              <input
                type="number"
                name="leads"
                value={landingPage.leads}
                readOnly
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white opacity-70"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-300 mb-1">Criado em</label>
              <input
                type="text"
                name="createdAt"
                value={landingPage.createdAt ? new Date(landingPage.createdAt).toLocaleString('pt-BR') : ''}
                readOnly
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white opacity-70"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-300 mb-1">Atualizado em</label>
              <input
                type="text"
                name="updatedAt"
                value={landingPage.updatedAt ? new Date(landingPage.updatedAt).toLocaleString('pt-BR') : ''}
                readOnly
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white opacity-70"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSavePage}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
          >
            <Save className="inline-block mr-2 w-4 h-4" />Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPageEditor;
