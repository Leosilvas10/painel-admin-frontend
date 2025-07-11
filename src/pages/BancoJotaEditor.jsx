
import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft, Eye, RefreshCw, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBancoJota } from '../hooks/useBancoJota';

const BancoJotaEditor = () => {
  const navigate = useNavigate();
  const { bancoJotaData, loading, error, updateBancoJotaContent, loadBancoJotaContent } = useBancoJota();
  
  const [formData, setFormData] = useState({
    header: {
      logo: '/logo.png',
      navegacao: [
        { texto: 'Início', link: '#inicio' },
        { texto: 'Sobre', link: '#sobre' },
        { texto: 'Benefícios', link: '#beneficios' },
        { texto: 'Como Funciona', link: '#como-funciona' },
        { texto: 'Simular', link: '#simular' }
      ]
    },
    inicio: {
      titulo: 'Realize o Sonho da Casa Própria Sem Juros',
      subtitulo: 'Consórcio imobiliário com atendimento consultivo e humanizado. Parcelas fixas, sem juros e com condições especiais.',
      botaoPrimario: 'Simular Agora',
      botaoSecundario: 'Saiba Mais',
      videoExplicativo: {
        titulo: 'Vídeo Explicativo',
        subtitulo: 'Clique para fazer upload do vídeo',
        botao: 'Escolher Vídeo',
        formatos: 'Formatos: MP4, AVI, MOV',
        arquivo: null
      },
      cardCasaPropria: {
        titulo: 'Casa Própria',
        subtitulo: 'Sem juros, sem entrada obrigatória',
        parcela: 'R$ 380',
        texto: 'Parcelas a partir de',
        periodo: 'mensais'
      }
    },
    vantagens: {
      titulo: 'Vantagens do Consórcio Imobiliário',
      subtitulo: 'Conheça todos os benefícios que fazem do consórcio a melhor opção para conquistar seu imóvel',
      lista: [
        {
          icone: '🏠',
          titulo: 'Sem Juros',
          descricao: 'Parcelas fixas sem juros, apenas taxa de administração'
        },
        {
          icone: '💰',
          titulo: 'Sem Entrada',
          descricao: 'Não é obrigatório dar entrada para participar'
        },
        {
          icone: '📊',
          titulo: 'Parcelas Fixas',
          descricao: 'Valor das parcelas não sofre alteração durante o período'
        },
        {
          icone: '⭐',
          titulo: 'Flexibilidade',
          descricao: 'Escolha o imóvel quando for contemplado'
        },
        {
          icone: '🎯',
          titulo: 'Objetivo Claro',
          descricao: 'Você sabe exatamente quando terá seu imóvel'
        },
        {
          icone: '🛡️',
          titulo: 'Segurança',
          descricao: 'Regulamentado pelo Banco Central'
        },
        {
          icone: '📍',
          titulo: 'Planejamento',
          descricao: 'Organize suas finanças com tranquilidade'
        },
        {
          icone: '💛',
          titulo: 'Suporte',
          descricao: 'Acompanhamento completo do nosso time'
        }
      ]
    },
    comoFunciona: {
      titulo: 'Como Funciona o Consórcio',
      subtitulo: 'Processo simples e transparente para você conquistar sua casa própria',
      passos: [
        {
          numero: '1',
          titulo: 'Simulação',
          descricao: 'Faça uma simulação gratuita e descubra o valor da parcela'
        },
        {
          numero: '2',
          titulo: 'Adesão',
          descricao: 'Assine o contrato e entre no grupo do consórcio'
        },
        {
          numero: '3',
          titulo: 'Pagamento',
          descricao: 'Pague as parcelas mensais fixas sem juros'
        },
        {
          numero: '4',
          titulo: 'Contemplação',
          descricao: 'Seja contemplado por sorteio ou lance'
        },
        {
          numero: '5',
          titulo: 'Casa Própria',
          descricao: 'Escolha e compre seu imóvel com o crédito liberado'
        }
      ]
    },
    depoimentos: {
      titulo: 'Depoimentos de Clientes',
      lista: [
        {
          nome: 'Maria Rita',
          contemplado: 'Contemplada em 2023',
          iniciais: 'MR',
          depoimento: 'Consegui minha casa própria em comprometer o orçamento familiar. O atendimento foi excepcional!',
          estrelas: 5
        },
        {
          nome: 'João Silva',
          contemplado: 'Contemplado em 2023',
          iniciais: 'JS',
          depoimento: 'Processo transparente e sem surpresas. Recomendo para quem quer sair do aluguel!',
          estrelas: 5
        },
        {
          nome: 'Ana Fernandes',
          contemplado: 'Contemplada em 2024',
          iniciais: 'AF',
          depoimento: 'Equipe muito atenciosa e sempre disposta a esclarecer todas as dúvidas. Obrigada!',
          estrelas: 5
        }
      ]
    },
    formularioSimulacao: {
      titulo: 'Simule Seu Consórcio',
      subtitulo: 'Preencha o formulário e receba uma proposta personalizada',
      faleConosco: {
        titulo: 'Fale Conosco',
        email: 'contato@bancojota.com.br',
        telefone: '(11) 9999-9999',
        endereco: 'São Paulo - SP',
        horario: {
          titulo: 'Horário de Atendimento',
          segunda: 'Segunda à Sexta às 19h',
          sabado: 'Sábado às 12h',
          domingo: 'Domingo: Fechado'
        }
      },
      formulario: {
        campos: [
          { nome: 'nomeCompleto', placeholder: 'Seu nome completo', tipo: 'text' },
          { nome: 'email', placeholder: 'Seu melhor e-mail', tipo: 'email' },
          { nome: 'whatsapp', placeholder: 'Seu telefone com WhatsApp', tipo: 'tel' },
          { nome: 'objetivo', placeholder: 'Conte-nos sobre seu objetivo (opcional)', tipo: 'textarea' }
        ],
        checkbox: 'Aceito receber contato via WhatsApp e estou ciente da Política de Privacidade e Termos de Uso.',
        botao: 'Falar com Consultor no WhatsApp'
      }
    },
    faq: {
      titulo: 'Perguntas Frequentes',
      subtitulo: 'Tire suas dúvidas sobre consórcio imobiliário',
      perguntas: [
        {
          pergunta: 'O que é consórcio imobiliário?',
          resposta: 'O consórcio imobiliário é um sistema de poupança programada onde um grupo de pessoas se reúne para adquirir bens imobiliários. Mensalmente, uma ou mais pessoas são contempladas e recebem o crédito para comprar seu imóvel.'
        },
        {
          pergunta: 'Preciso dar entrada?',
          resposta: 'Não é obrigatório dar entrada para participar do consórcio. Você pode optar por dar uma entrada para reduzir o valor das parcelas mensais, mas não é uma exigência.'
        },
        {
          pergunta: 'Como funciona a contemplação?',
          resposta: 'A contemplação acontece mensalmente através de sorteio ou lance. No sorteio, é por pura sorte. No lance, você oferece um valor adicional para ser contemplado mais rapidamente.'
        },
        {
          pergunta: 'Qual a diferença para o financiamento?',
          resposta: 'No consórcio você não paga juros, apenas uma taxa de administração. No financiamento, você paga juros que podem encarecer significativamente o valor final do imóvel.'
        },
        {
          pergunta: 'Posso usar o FGTS?',
          resposta: 'Sim! Você pode usar o FGTS para dar lances, quitar parcelas em atraso ou até mesmo como entrada na compra do imóvel após ser contemplado.'
        },
        {
          pergunta: 'E se eu quiser sair do consórcio?',
          resposta: 'Você pode sair do consórcio a qualquer momento. Os valores pagos são devolvidos ao final do grupo, corrigidos pelos índices contratuais, descontadas as taxas de administração.'
        }
      ]
    },
    footer: {
      logo: '/logo.png',
      descricao: 'Especialistas em consórcio imobiliário com atendimento humanizado e consultivo.',
      linksRapidos: {
        titulo: 'Links Rápidos',
        links: [
          { texto: 'Sobre', url: '#sobre' },
          { texto: 'Benefícios', url: '#beneficios' },
          { texto: 'Como Funciona', url: '#como-funciona' },
          { texto: 'Contato', url: '#contato' }
        ]
      },
      legal: {
        titulo: 'Legal',
        links: [
          { texto: 'Política de Privacidade', url: '/privacidade' },
          { texto: 'Termos de Uso', url: '/termos' },
          { texto: 'LGPD', url: '/lgpd' }
        ]
      },
      contato: {
        titulo: 'Contato',
        telefone: '(11) 9999-9999',
        email: 'contato@bancojota.com.br',
        endereco: 'São Paulo - SP'
      },
      copyright: '© 2024 Banco Jota. Todos os direitos reservados.'
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
      if (bancoJotaData.data.header) {
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

  const handleNestedInputChange = (section, subsection, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
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

  const handleFaqChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      faq: {
        ...prev.faq,
        perguntas: prev.faq.perguntas.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const addFaqItem = () => {
    setFormData(prev => ({
      ...prev,
      faq: {
        ...prev.faq,
        perguntas: [...prev.faq.perguntas, { pergunta: '', resposta: '' }]
      }
    }));
  };

  const removeFaqItem = (index) => {
    setFormData(prev => ({
      ...prev,
      faq: {
        ...prev.faq,
        perguntas: prev.faq.perguntas.filter((_, i) => i !== index)
      }
    }));
  };

  const handleImageUpload = (section, field, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (section === 'header' || section === 'footer') {
          handleInputChange(section, field, e.target.result);
        } else {
          handleNestedInputChange(section, field, 'arquivo', e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
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

  if (loading && (!formData || !formData.header)) {
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
                {/* Header/Navegação */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">🧭 Header e Navegação</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Logo</label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('header', 'logo', e.target.files[0])}
                          className="hidden"
                          id="header-logo"
                        />
                        <label
                          htmlFor="header-logo"
                          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md cursor-pointer"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </label>
                        {formData.header?.logo && (
                          <img src={formData.header.logo} alt="Logo" className="h-10 w-auto" />
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Itens de Navegação</label>
                      {formData.header?.navegacao?.map((item, index) => (
                        <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                          <input
                            type="text"
                            value={item.texto}
                            onChange={(e) => {
                              const newNav = [...formData.header.navegacao];
                              newNav[index].texto = e.target.value;
                              handleInputChange('header', 'navegacao', newNav);
                            }}
                            placeholder="Texto do menu"
                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          />
                          <input
                            type="text"
                            value={item.link}
                            onChange={(e) => {
                              const newNav = [...formData.header.navegacao];
                              newNav[index].link = e.target.value;
                              handleInputChange('header', 'navegacao', newNav);
                            }}
                            placeholder="Link (#secao)"
                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Seção Hero/Início */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">🏠 Seção Hero/Início</h3>
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
                    
                    {/* Vídeo Explicativo */}
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="text-md font-medium text-white mb-3">Vídeo Explicativo</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={formData.inicio?.videoExplicativo?.titulo || ''}
                          onChange={(e) => handleNestedInputChange('inicio', 'videoExplicativo', 'titulo', e.target.value)}
                          placeholder="Título do vídeo"
                          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                        <input
                          type="text"
                          value={formData.inicio?.videoExplicativo?.subtitulo || ''}
                          onChange={(e) => handleNestedInputChange('inicio', 'videoExplicativo', 'subtitulo', e.target.value)}
                          placeholder="Subtítulo do vídeo"
                          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleImageUpload('inicio', 'videoExplicativo', e.target.files[0])}
                          className="hidden"
                          id="video-upload"
                        />
                        <label
                          htmlFor="video-upload"
                          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md cursor-pointer"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Vídeo
                        </label>
                      </div>
                    </div>

                    {/* Card Casa Própria */}
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="text-md font-medium text-white mb-3">Card Casa Própria</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={formData.inicio?.cardCasaPropria?.titulo || ''}
                          onChange={(e) => handleNestedInputChange('inicio', 'cardCasaPropria', 'titulo', e.target.value)}
                          placeholder="Título do card"
                          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                        <input
                          type="text"
                          value={formData.inicio?.cardCasaPropria?.subtitulo || ''}
                          onChange={(e) => handleNestedInputChange('inicio', 'cardCasaPropria', 'subtitulo', e.target.value)}
                          placeholder="Subtítulo do card"
                          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                        <input
                          type="text"
                          value={formData.inicio?.cardCasaPropria?.parcela || ''}
                          onChange={(e) => handleNestedInputChange('inicio', 'cardCasaPropria', 'parcela', e.target.value)}
                          placeholder="Valor da parcela"
                          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                        <input
                          type="text"
                          value={formData.inicio?.cardCasaPropria?.texto || ''}
                          onChange={(e) => handleNestedInputChange('inicio', 'cardCasaPropria', 'texto', e.target.value)}
                          placeholder="Texto acima do valor"
                          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vantagens */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">⭐ Seção Vantagens</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Título da Seção</label>
                      <input
                        type="text"
                        value={formData.vantagens?.titulo || ''}
                        onChange={(e) => handleInputChange('vantagens', 'titulo', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Subtítulo</label>
                      <textarea
                        value={formData.vantagens?.subtitulo || ''}
                        onChange={(e) => handleInputChange('vantagens', 'subtitulo', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Vantagens (8 itens)</label>
                      {formData.vantagens?.lista?.map((vantagem, index) => (
                        <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                          <input
                            type="text"
                            value={vantagem.icone}
                            onChange={(e) => handleArrayChange('vantagens', index, 'icone', e.target.value)}
                            placeholder="Emoji"
                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          />
                          <input
                            type="text"
                            value={vantagem.titulo}
                            onChange={(e) => handleArrayChange('vantagens', index, 'titulo', e.target.value)}
                            placeholder="Título"
                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          />
                          <input
                            type="text"
                            value={vantagem.descricao}
                            onChange={(e) => handleArrayChange('vantagens', index, 'descricao', e.target.value)}
                            placeholder="Descrição"
                            className="col-span-2 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Como Funciona */}
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
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Subtítulo</label>
                      <input
                        type="text"
                        value={formData.comoFunciona?.subtitulo || ''}
                        onChange={(e) => handleInputChange('comoFunciona', 'subtitulo', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Passos (5 itens)</label>
                      {formData.comoFunciona?.passos?.map((passo, index) => (
                        <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                          <input
                            type="text"
                            value={passo.numero}
                            onChange={(e) => {
                              const novosPassos = [...formData.comoFunciona.passos];
                              novosPassos[index].numero = e.target.value;
                              handleInputChange('comoFunciona', 'passos', novosPassos);
                            }}
                            placeholder="Nº"
                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          />
                          <input
                            type="text"
                            value={passo.titulo}
                            onChange={(e) => {
                              const novosPassos = [...formData.comoFunciona.passos];
                              novosPassos[index].titulo = e.target.value;
                              handleInputChange('comoFunciona', 'passos', novosPassos);
                            }}
                            placeholder="Título do passo"
                            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          />
                          <input
                            type="text"
                            value={passo.descricao}
                            onChange={(e) => {
                              const novosPassos = [...formData.comoFunciona.passos];
                              novosPassos[index].descricao = e.target.value;
                              handleInputChange('comoFunciona', 'passos', novosPassos);
                            }}
                            placeholder="Descrição do passo"
                            className="col-span-2 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Depoimentos */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">💬 Seção Depoimentos</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Título da Seção</label>
                      <input
                        type="text"
                        value={formData.depoimentos?.titulo || ''}
                        onChange={(e) => handleInputChange('depoimentos', 'titulo', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Depoimentos</label>
                      {formData.depoimentos?.lista?.map((depoimento, index) => (
                        <div key={index} className="border border-gray-600 p-4 rounded-md mb-4">
                          <div className="grid grid-cols-3 gap-2 mb-2">
                            <input
                              type="text"
                              value={depoimento.nome}
                              onChange={(e) => handleArrayChange('depoimentos', index, 'nome', e.target.value)}
                              placeholder="Nome do cliente"
                              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                            />
                            <input
                              type="text"
                              value={depoimento.contemplado}
                              onChange={(e) => handleArrayChange('depoimentos', index, 'contemplado', e.target.value)}
                              placeholder="Ex: Contemplado em 2023"
                              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                            />
                            <input
                              type="text"
                              value={depoimento.iniciais}
                              onChange={(e) => handleArrayChange('depoimentos', index, 'iniciais', e.target.value)}
                              placeholder="Iniciais (ex: MR)"
                              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                            />
                          </div>
                          <textarea
                            value={depoimento.depoimento}
                            onChange={(e) => handleArrayChange('depoimentos', index, 'depoimento', e.target.value)}
                            placeholder="Depoimento do cliente"
                            rows={3}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Formulário de Simulação */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">📝 Seção Formulário/Simulação</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
                        <input
                          type="text"
                          value={formData.formularioSimulacao?.titulo || ''}
                          onChange={(e) => handleInputChange('formularioSimulacao', 'titulo', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Subtítulo</label>
                        <input
                          type="text"
                          value={formData.formularioSimulacao?.subtitulo || ''}
                          onChange={(e) => handleInputChange('formularioSimulacao', 'subtitulo', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                      </div>
                    </div>
                    
                    {/* Informações de Contato */}
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="text-md font-medium text-white mb-3">Fale Conosco</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={formData.formularioSimulacao?.faleConosco?.email || ''}
                          onChange={(e) => handleNestedInputChange('formularioSimulacao', 'faleConosco', 'email', e.target.value)}
                          placeholder="E-mail de contato"
                          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                        <input
                          type="text"
                          value={formData.formularioSimulacao?.faleConosco?.telefone || ''}
                          onChange={(e) => handleNestedInputChange('formularioSimulacao', 'faleConosco', 'telefone', e.target.value)}
                          placeholder="Telefone"
                          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                        <input
                          type="text"
                          value={formData.formularioSimulacao?.faleConosco?.endereco || ''}
                          onChange={(e) => handleNestedInputChange('formularioSimulacao', 'faleConosco', 'endereco', e.target.value)}
                          placeholder="Endereço"
                          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                        <input
                          type="text"
                          value={formData.formularioSimulacao?.formulario?.botao || ''}
                          onChange={(e) => handleNestedInputChange('formularioSimulacao', 'formulario', 'botao', e.target.value)}
                          placeholder="Texto do botão"
                          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">❓ Seção FAQ</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
                        <input
                          type="text"
                          value={formData.faq?.titulo || ''}
                          onChange={(e) => handleInputChange('faq', 'titulo', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Subtítulo</label>
                        <input
                          type="text"
                          value={formData.faq?.subtitulo || ''}
                          onChange={(e) => handleInputChange('faq', 'subtitulo', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="block text-sm font-medium text-gray-300">Perguntas e Respostas</label>
                        <button
                          onClick={addFaqItem}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                        >
                          + Adicionar
                        </button>
                      </div>
                      {formData.faq?.perguntas?.map((faq, index) => (
                        <div key={index} className="border border-gray-600 p-4 rounded-md mb-3">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 space-y-2">
                              <input
                                type="text"
                                value={faq.pergunta}
                                onChange={(e) => handleFaqChange(index, 'pergunta', e.target.value)}
                                placeholder="Pergunta"
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              />
                              <textarea
                                value={faq.resposta}
                                onChange={(e) => handleFaqChange(index, 'resposta', e.target.value)}
                                placeholder="Resposta"
                                rows={3}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                              />
                            </div>
                            <button
                              onClick={() => removeFaqItem(index)}
                              className="ml-2 p-2 text-red-400 hover:text-red-300"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">🦶 Footer</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Logo do Footer</label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('footer', 'logo', e.target.files[0])}
                          className="hidden"
                          id="footer-logo"
                        />
                        <label
                          htmlFor="footer-logo"
                          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md cursor-pointer"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </label>
                        {formData.footer?.logo && (
                          <img src={formData.footer.logo} alt="Logo Footer" className="h-10 w-auto" />
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Descrição da Empresa</label>
                      <textarea
                        value={formData.footer?.descricao || ''}
                        onChange={(e) => handleInputChange('footer', 'descricao', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
                        <input
                          type="text"
                          value={formData.footer?.contato?.telefone || ''}
                          onChange={(e) => handleNestedInputChange('footer', 'contato', 'telefone', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.footer?.contato?.email || ''}
                          onChange={(e) => handleNestedInputChange('footer', 'contato', 'email', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Endereço</label>
                        <input
                          type="text"
                          value={formData.footer?.contato?.endereco || ''}
                          onChange={(e) => handleNestedInputChange('footer', 'contato', 'endereco', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Copyright</label>
                      <input
                        type="text"
                        value={formData.footer?.copyright || ''}
                        onChange={(e) => handleInputChange('footer', 'copyright', e.target.value)}
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
                
                {/* Header Preview */}
                <div className="bg-gray-800 text-white p-4 rounded-lg mb-8">
                  <div className="flex justify-between items-center">
                    <img src={formData.header?.logo} alt="Logo" className="h-8" />
                    <nav className="flex space-x-6">
                      {formData.header?.navegacao?.map((item, index) => (
                        <a key={index} href={item.link} className="hover:text-blue-300">
                          {item.texto}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Hero Section Preview */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12 rounded-lg mb-8">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">{formData.inicio?.titulo}</h1>
                    <p className="text-xl mb-6">{formData.inicio?.subtitulo}</p>
                    <div className="space-x-4">
                      <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold">
                        {formData.inicio?.botaoPrimario}
                      </button>
                      <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold">
                        {formData.inicio?.botaoSecundario}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Vantagens Preview */}
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                    {formData.vantagens?.titulo}
                  </h3>
                  <p className="text-center text-gray-600 mb-8">{formData.vantagens?.subtitulo}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {formData.vantagens?.lista?.map((vantagem, index) => (
                      <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl mb-2">{vantagem.icone}</div>
                        <h4 className="font-semibold text-gray-800 mb-2">{vantagem.titulo}</h4>
                        <p className="text-sm text-gray-600">{vantagem.descricao}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Como Funciona Preview */}
                <div className="mb-8 bg-gray-900 text-white p-8 rounded-lg">
                  <h3 className="text-3xl font-bold mb-4 text-center">{formData.comoFunciona?.titulo}</h3>
                  <p className="text-center mb-8">{formData.comoFunciona?.subtitulo}</p>
                  <div className="flex justify-center space-x-8">
                    {formData.comoFunciona?.passos?.map((passo, index) => (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-3 mx-auto">
                          {passo.numero}
                        </div>
                        <h4 className="font-semibold mb-2">{passo.titulo}</h4>
                        <p className="text-sm text-gray-300">{passo.descricao}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Depoimentos Preview */}
                <div className="mb-8 bg-gray-900 text-white p-8 rounded-lg">
                  <h3 className="text-3xl font-bold mb-8 text-center">{formData.depoimentos?.titulo}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {formData.depoimentos?.lista?.map((depoimento, index) => (
                      <div key={index} className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            {depoimento.iniciais}
                          </div>
                          <div>
                            <h4 className="font-semibold">{depoimento.nome}</h4>
                            <p className="text-sm text-gray-400">{depoimento.contemplado}</p>
                          </div>
                        </div>
                        <p className="text-gray-300 italic">"{depoimento.depoimento}"</p>
                        <div className="flex mt-3">
                          {[...Array(depoimento.estrelas)].map((_, i) => (
                            <span key={i} className="text-yellow-400">⭐</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Formulário Preview */}
                <div className="bg-blue-600 text-white p-8 rounded-lg mb-8">
                  <h3 className="text-3xl font-bold mb-4 text-center">{formData.formularioSimulacao?.titulo}</h3>
                  <p className="text-center mb-8">{formData.formularioSimulacao?.subtitulo}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-4">{formData.formularioSimulacao?.faleConosco?.titulo}</h4>
                      <p>📧 {formData.formularioSimulacao?.faleConosco?.email}</p>
                      <p>📞 {formData.formularioSimulacao?.faleConosco?.telefone}</p>
                      <p>📍 {formData.formularioSimulacao?.faleConosco?.endereco}</p>
                    </div>
                    <div className="space-y-4">
                      <input type="text" placeholder="Seu nome completo" className="w-full p-3 rounded text-gray-800" />
                      <input type="email" placeholder="Seu melhor e-mail" className="w-full p-3 rounded text-gray-800" />
                      <button className="w-full bg-white text-blue-600 p-3 rounded font-semibold">
                        {formData.formularioSimulacao?.formulario?.botao}
                      </button>
                    </div>
                  </div>
                </div>

                {/* FAQ Preview */}
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">{formData.faq?.titulo}</h3>
                  <p className="text-center text-gray-600 mb-8">{formData.faq?.subtitulo}</p>
                  <div className="space-y-4">
                    {formData.faq?.perguntas?.map((faq, index) => (
                      <div key={index} className="border border-gray-300 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">{faq.pergunta}</h4>
                        <p className="text-gray-600">{faq.resposta}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Preview */}
                <div className="bg-gray-800 text-white p-8 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                      <img src={formData.footer?.logo} alt="Logo" className="h-8 mb-4" />
                      <p className="text-gray-300">{formData.footer?.descricao}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Contato</h4>
                      <p>{formData.footer?.contato?.telefone}</p>
                      <p>{formData.footer?.contato?.email}</p>
                      <p>{formData.footer?.contato?.endereco}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                    <p className="text-gray-400">{formData.footer?.copyright}</p>
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
