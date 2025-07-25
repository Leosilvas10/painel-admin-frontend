import { useState, useEffect, useCallback } from 'react';
import { jotaSolucoesAPI, healthCheck } from '../utils/api.js';

export const useJotaSolucoes = () => {
  // Estados principais
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [leads, setLeads] = useState([]);
  const [leadsStats, setLeadsStats] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('checking');

  // Verificar conectividade com backend
  const checkConnection = useCallback(async () => {
    try {
      await healthCheck();
      setConnectionStatus('connected');
      return true;
    } catch (error) {
      console.error('❌ Erro de conexão:', error);
      setConnectionStatus('disconnected');
      setError('Não foi possível conectar ao servidor');
      return false;
    }
  }, []);

  // Carregar dados da Jota Soluções
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Verificar conexão primeiro
      const isConnected = await checkConnection();
      if (!isConnected) {
        throw new Error('Servidor não disponível');
      }

      // Carregar dados da landing page
      const response = await jotaSolucoesAPI.get();
      
      if (response.data) {
        setData(response.data);
      } else if (response.landing) {
        setData(response.landing);
      } else {
        setData(response);
      }

      console.log('✅ Dados Jota Soluções carregados:', response);
      
    } catch (error) {
      console.error('❌ Erro ao carregar dados:', error);
      setError(error.message || 'Erro ao carregar dados');
      
      // Dados de fallback para desenvolvimento
      setData({
        title: 'Jota Soluções',
        subtitle: 'Descubra como transformar a saúde financeira da sua empresa!',
        cta: 'Quero meu diagnóstico gratuito',
        description: 'Receba um diagnóstico financeiro gratuito e tenha uma reunião estratégica com o CEO da Jota Soluções.',
        blocos: {
          heroi: {
            destaque: 'Descubra como transformar a saúde financeira da sua empresa!',
            cta: 'Quero meu diagnóstico gratuito'
          },
          dores: {
            itens: [
              'Não sabe se o negócio está dando lucro',
              'Decisões sem base nos números',
              'Falta de clareza no planejamento',
              'Insegurança para crescer'
            ]
          },
          solucoes: {
            itens: [
              'Clareza total dos números',
              'Metas e resultados visíveis',
              'Decisões estratégicas',
              'Apoio especializado'
            ]
          },
          sobre: {
            texto: 'Somos especialistas em BPO Financeiro, ajudando pequenas e médias empresas a organizarem suas finanças e tomarem decisões mais inteligentes baseadas em dados reais.',
            dados: ['500+ Empresas Atendidas', '95% Satisfação', '5+ Anos de Experiência'],
            ceo: {
              nome: 'João Silva',
              cargo: 'CEO & Fundador',
              frase: 'Minha paixão é ajudar empresários a alcançarem seus objetivos através de uma gestão financeira eficiente e estratégica.'
            }
          },
          depoimentos: {
            clientes: [
              {
                nome: 'Maria Santos',
                empresa: 'Boutique Elegance',
                texto: 'Após o diagnóstico da Jota Soluções, consegui ter clareza total dos meus números. Meu faturamento aumentou 40% em 6 meses!'
              },
              {
                nome: 'Carlos Oliveira',
                empresa: 'TechStart Solutions',
                texto: 'O BPO Financeiro transformou minha empresa. Agora tomo decisões baseadas em dados, não no achismo. Recomendo!'
              }
            ]
          },
          footer: {
            empresa: 'Jota Soluções',
            descricao: 'Especialistas em BPO Financeiro',
            email: 'contato@jotasolucoes.com.br',
            telefone: '(11) 99999-9999',
            cidade: 'São Paulo - SP'
          }
        },
        status: 'fallback'
      });
    } finally {
      setLoading(false);
    }
  }, [checkConnection]);

  // Salvar dados
  const saveData = useCallback(async (newData) => {
    try {
      setSaving(true);
      setError(null);

      console.log('💾 Salvando dados Jota Soluções:', newData);

      const response = await jotaSolucoesAPI.update(newData);
      
      setData(newData);
      console.log('✅ Dados salvos com sucesso:', response);
      
      return { success: true, data: response };
      
    } catch (error) {
      console.error('❌ Erro ao salvar dados:', error);
      setError('Erro ao salvar dados: ' + error.message);
      return { success: false, error: error.message };
    } finally {
      setSaving(false);
    }
  }, []);

  // Carregar leads
  const loadLeads = useCallback(async () => {
    try {
      const leadsData = await jotaSolucoesAPI.getLeads();
      setLeads(leadsData.leads || leadsData || []);
      
      const statsData = await jotaSolucoesAPI.getLeadsStats();
      setLeadsStats(statsData.stats || statsData || {});
      
      console.log('📊 Leads carregados:', leadsData);
      console.log('📈 Estatísticas carregadas:', statsData);
      
    } catch (error) {
      console.error('❌ Erro ao carregar leads:', error);
      setLeads([]);
      setLeadsStats({
        total: 0,
        hoje: 0,
        semana: 0,
        mes: 0
      });
    }
  }, []);

  // Exportar leads
  const exportLeads = useCallback(async () => {
    try {
      const response = await jotaSolucoesAPI.exportLeads();
      
      // Criar download do arquivo
      const blob = new Blob([response], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `jota-solucoes-leads-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      console.log('📥 Leads exportados com sucesso');
      return { success: true };
      
    } catch (error) {
      console.error('❌ Erro ao exportar leads:', error);
      return { success: false, error: error.message };
    }
  }, []);

  // Atualizar seção específica
  const updateSection = useCallback(async (sectionName, sectionData) => {
    if (!data) return { success: false, error: 'Dados não carregados' };

    const updatedData = {
      ...data,
      blocos: {
        ...data.blocos,
        [sectionName]: sectionData
      }
    };

    return await saveData(updatedData);
  }, [data, saveData]);

  // Atualizar item específico
  const updateField = useCallback(async (fieldPath, value) => {
    if (!data) return { success: false, error: 'Dados não carregados' };

    const updatedData = { ...data };
    const pathArray = fieldPath.split('.');
    let current = updatedData;

    // Navegar até o campo pai
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!current[pathArray[i]]) {
        current[pathArray[i]] = {};
      }
      current = current[pathArray[i]];
    }

    // Atualizar o campo
    current[pathArray[pathArray.length - 1]] = value;

    return await saveData(updatedData);
  }, [data, saveData]);

  // Efeito para carregar dados iniciais
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Efeito para carregar leads quando dados estiverem prontos
  useEffect(() => {
    if (data && connectionStatus === 'connected') {
      loadLeads();
    }
  }, [data, connectionStatus, loadLeads]);

  // Função para obter valor de campo específico
  const getField = useCallback((fieldPath, fallback = '') => {
    if (!data) return fallback;

    const pathArray = fieldPath.split('.');
    let current = data;

    for (const key of pathArray) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return fallback;
      }
    }

    return current !== undefined ? current : fallback;
  }, [data]);

  // Status da conexão
  const status = {
    isLoading: loading,
    isSaving: saving,
    hasError: !!error,
    isConnected: connectionStatus === 'connected',
    isUsingFallback: data?.status === 'fallback'
  };

  return {
    // Dados
    data,
    leads,
    leadsStats,
    
    // Estados
    loading,
    saving,
    error,
    status,
    connectionStatus,
    
    // Ações
    loadData,
    saveData,
    loadLeads,
    exportLeads,
    updateSection,
    updateField,
    getField,
    checkConnection,
    
    // Utils
    refresh: loadData,
    clearError: () => setError(null)
  };
};

export default useJotaSolucoes;
