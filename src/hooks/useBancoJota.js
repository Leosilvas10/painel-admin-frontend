
import { useState, useEffect } from 'react';
import apiService from '../services/api';

export const useBancoJota = () => {
  const [bancoJotaData, setBancoJotaData] = useState({
    slug: 'banco-jota',
    data: {
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
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeApi = async (apiCall) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall();
      setLoading(false);
      return { success: true, data: result };
    } catch (err) {
      setError(err.response?.data?.message || 'Erro na requisição');
      setLoading(false);
      return { success: false, error: err };
    }
  };

  const loadBancoJotaContent = async () => {
    const result = await executeApi(() => apiService.getBancoJotaContent());
    if (result.success && result.data) {
      console.log('Dados recebidos da API:', result.data);
      if (result.data.data && typeof result.data.data === 'object') {
        setBancoJotaData(result.data);
      }
    }
    return result;
  };

  const updateBancoJotaContent = async (data) => {
    const result = await executeApi(() => apiService.updateBancoJotaContent(data));
    if (result.success && result.data) {
      console.log('Dados atualizados:', result.data);
      setBancoJotaData(result.data);
    }
    return result;
  };

  useEffect(() => {
    loadBancoJotaContent();
  }, []);

  return {
    bancoJotaData,
    loading,
    error,
    loadBancoJotaContent,
    updateBancoJotaContent
  };
};

export default useBancoJota;
