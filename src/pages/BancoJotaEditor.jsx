
import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft, Eye, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBancoJota } from '../hooks/useBancoJota';

const BancoJotaEditor = () => {
  const navigate = useNavigate();
  const { bancoJotaData, loading, error, updateBancoJotaContent, loadBancoJotaContent } = useBancoJota();
  
  const [formData, setFormData] = useState({
    inicio: {
      titulo: 'Realize o Sonho da Casa Própria Sem Juros',
      subtitulo: 'Consórcio imobiliário com atendimento consultivo e humanizado. Parcelas fixas, sem juros e com condições especiais.',
      botaoPrimario: 'Simular Agora',
      botaoSecundario: 'Saiba Mais'
    },
    sobre: {
      titulo: 'Banco Jota: Especialistas em Consórcio Imobiliário',
      descricao: 'Somos especialistas em consórcio imobiliário com anos de experiência no mercado. Oferecemos soluções personalizadas para realizar o sonho da casa própria.',
      beneficios: [
        'Sem juros, apenas taxa de administração',
        'Parcelas fixas durante todo o período',
        'Flexibilidade de pagamento',
        'Atendimento humanizado e consultivo'
      ]
    },
    beneficios: {
      titulo: 'Por que escolher o Banco Jota?',
      lista: [
        {
          icone: '🏠',
          titulo: 'Casa Própria',
          descricao: 'Sem juros, sem entrada obrigatória'
        },
        {
          icone: '💰',
          titulo: 'Parcelas Fixas',
          descricao: 'A partir de R$ 380/mês'
        },
        {
          icone: '⚡',
          titulo: 'Processo Rápido',
          descricao: 'Aprovação em até 48h'
        },
        {
          icone: '🛡️',
          titulo: 'Segurança',
          descricao: 'Regulamentado pelo Banco Central'
        }
      ]
    },
    comoFunciona: {
      titulo: 'Como Funciona o Consórcio',
      passos: [
        {
          numero: '1',
          titulo: 'Escolha seu Plano',
          descricao: 'Selecione o valor da carta de crédito ideal para você'
        },
        {
          numero: '2',
          titulo: 'Faça a Simulação',
          descricao: 'Veja quanto vai pagar por mês e o prazo do consórcio'
        },
        {
          numero: '3',
          titulo: 'Seja Contemplado',
          descricao: 'Por sorteio mensal ou lance, você recebe sua carta'
        },
        {
          numero: '4',
          titulo: 'Compre seu Imóvel',
          descricao: 'Use a carta para comprar o imóvel dos seus sonhos'
        }
      ]
    },
    simulador: {
      titulo: 'Simule seu Consórcio',
      subtitulo: 'Veja quanto você vai pagar por mês',
      valores: [
        { valor: '150000', parcela: '380', prazo: '120' },
        { valor: '200000', parcela: '510', prazo: '120' },
        { valor: '300000', parcela: '760', prazo: '120' },
        { valor: '500000', parcela: '1270', prazo: '120' }
      ]
    },
    contato: {
      titulo: 'Entre em Contato',
      subtitulo: 'Fale com nossos especialistas',
      telefone: '(11) 9 9999-9999',
      whatsapp: '5511999999999',
      email: 'contato@bancojota.com.br',
      endereco: 'Av. Paulista, 1000 - São Paulo/SP'
    },
    seo: {
      titulo: 'Banco Jota - Consórcio Imobiliário Sem Juros',
      descricao: 'Realize o sonho da casa própria com o consórcio imobiliário do Banco Jota. Sem juros, parcelas fixas e atendimento especializado.',
      palavrasChave: 'consórcio imobiliário, casa própria, sem juros, banco jota'
    }
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (bancoJotaData && bancoJotaData.data) {
      // Se a API retornar dados na estrutura correta, usar eles
      if (bancoJotaData.data.inicio) {
        setFormData(bancoJotaData.data);
      }
    }
  }, [bancoJotaData]);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        lista: prev[section].lista.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
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

  if (loading && (!formData || !formData.inicio)) {
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
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Editar Conteúdo - Banco Jota</h2>
              
              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-md mb-6">
                  Erro: {error}
                </div>
              )}

              <div className="space-y-8">
                {/* Seção Início */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">🏠 Seção Início (Hero)</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Título Principal</label>
                      <input
                        type="text"
                        value={formData.inicio?.titulo || ''}
                        onChange={(e) => handleInputChange('inicio', 'titulo', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Subtítulo</label>
                      <textarea
                        value={formData.inicio?.subtitulo || ''}
                        onChange={(e) => handleInputChange('inicio', 'subtitulo', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Botão Primário</label>
                        <input
                          type="text"
                          value={formData.inicio?.botaoPrimario || ''}
                          onChange={(e) => handleInputChange('inicio', 'botaoPrimario', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Botão Secundário</label>
                        <input
                          type="text"
                          value={formData.inicio?.botaoSecundario || ''}
                          onChange={(e) => handleInputChange('inicio', 'botaoSecundario', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seção Sobre */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">ℹ️ Seção Sobre</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
                      <input
                        type="text"
                        value={formData.sobre?.titulo || ''}
                        onChange={(e) => handleInputChange('sobre', 'titulo', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
                      <textarea
                        value={formData.sobre?.descricao || ''}
                        onChange={(e) => handleInputChange('sobre', 'descricao', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Seção Benefícios */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">⭐ Seção Benefícios</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Título da Seção</label>
                      <input
                        type="text"
                        value={formData.beneficios?.titulo || ''}
                        onChange={(e) => handleInputChange('beneficios', 'titulo', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Benefícios</label>
                      {formData.beneficios?.lista?.map((beneficio, index) => (
                        <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                          <input
                            type="text"
                            value={beneficio.icone}
                            onChange={(e) => handleArrayChange('beneficios', index, 'icone', e.target.value)}
                            placeholder="Ícone"
                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          />
                          <input
                            type="text"
                            value={beneficio.titulo}
                            onChange={(e) => handleArrayChange('beneficios', index, 'titulo', e.target.value)}
                            placeholder="Título"
                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          />
                          <input
                            type="text"
                            value={beneficio.descricao}
                            onChange={(e) => handleArrayChange('beneficios', index, 'descricao', e.target.value)}
                            placeholder="Descrição"
                            className="col-span-2 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Seção Como Funciona */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">🔄 Seção Como Funciona</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Título da Seção</label>
                      <input
                        type="text"
                        value={formData.comoFunciona?.titulo || ''}
                        onChange={(e) => handleInputChange('comoFunciona', 'titulo', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Seção Simulador */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">🧮 Seção Simular</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
                      <input
                        type="text"
                        value={formData.simulador?.titulo || ''}
                        onChange={(e) => handleInputChange('simulador', 'titulo', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Subtítulo</label>
                      <input
                        type="text"
                        value={formData.simulador?.subtitulo || ''}
                        onChange={(e) => handleInputChange('simulador', 'subtitulo', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Seção Contato */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">📞 Seção Contato</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
                      <input
                        type="text"
                        value={formData.contato?.telefone || ''}
                        onChange={(e) => handleInputChange('contato', 'telefone', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">WhatsApp</label>
                      <input
                        type="text"
                        value={formData.contato?.whatsapp || ''}
                        onChange={(e) => handleInputChange('contato', 'whatsapp', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.contato?.email || ''}
                        onChange={(e) => handleInputChange('contato', 'email', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Endereço</label>
                      <input
                        type="text"
                        value={formData.contato?.endereco || ''}
                        onChange={(e) => handleInputChange('contato', 'endereco', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                  </div>
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
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12 rounded-lg mb-8">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                      {formData.inicio?.titulo || 'Título Principal'}
                    </h1>
                    <p className="text-xl mb-6">
                      {formData.inicio?.subtitulo || 'Subtítulo'}
                    </p>
                    <div className="space-x-4">
                      <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold">
                        {formData.inicio?.botaoPrimario || 'Botão Primário'}
                      </button>
                      <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold">
                        {formData.inicio?.botaoSecundario || 'Botão Secundário'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sobre Section */}
                <div className="bg-gray-50 p-8 rounded-lg mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {formData.sobre?.titulo || 'Sobre'}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {formData.sobre?.descricao || 'Descrição sobre a empresa'}
                  </p>
                </div>

                {/* Benefícios Section */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {formData.beneficios?.titulo || 'Benefícios'}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {formData.beneficios?.lista?.map((beneficio, index) => (
                      <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl mb-2">{beneficio.icone}</div>
                        <h4 className="font-semibold text-gray-800 mb-2">{beneficio.titulo}</h4>
                        <p className="text-sm text-gray-600">{beneficio.descricao}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulador Section */}
                <div className="bg-blue-50 p-8 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    {formData.simulador?.titulo || 'Simulador'}
                  </h3>
                  <p className="text-center text-gray-600 mb-6">
                    {formData.simulador?.subtitulo || 'Faça sua simulação'}
                  </p>
                  <div className="text-center">
                    <div className="bg-blue-600 text-white p-6 rounded-lg inline-block">
                      <p className="text-sm">Parcelas a partir de</p>
                      <p className="text-3xl font-bold">R$ 380</p>
                      <p className="text-sm">/mês</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BancoJotaEditor;
