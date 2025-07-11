
import { useState, useEffect } from 'react';
import apiService from '../services/api';

export const useBancoJota = () => {
  const [bancoJotaData, setBancoJotaData] = useState({
    slug: 'banco-jota',
    data: {
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
      // Se a API retornar dados, usar eles, senão manter os dados padrão
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
