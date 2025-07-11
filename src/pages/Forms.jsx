
import React, { useState } from 'react';
import { useForms } from '../hooks/useApi';
import { Plus, Edit, Trash2, Eye, FileText } from 'lucide-react';

const Forms = () => {
  const { forms, loading, error, createForm, updateForm, deleteForm, getFormSubmissions } = useForms();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingForm, setEditingForm] = useState(null);
  const [viewingSubmissions, setViewingSubmissions] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fields: [],
    active: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingForm) {
      await updateForm(editingForm.id, formData);
      setEditingForm(null);
    } else {
      await createForm(formData);
    }
    setFormData({ name: '', description: '', fields: [], active: true });
    setShowCreateModal(false);
  };

  const handleEdit = (form) => {
    setEditingForm(form);
    setFormData({
      name: form.name,
      description: form.description,
      fields: form.fields || [],
      active: form.active
    });
    setShowCreateModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir este formulário?')) {
      await deleteForm(id);
    }
  };

  const handleViewSubmissions = async (form) => {
    setViewingSubmissions(form);
    const result = await getFormSubmissions(form.id);
    if (result.success) {
      setSubmissions(result.data);
    }
  };

  const addField = () => {
    setFormData({
      ...formData,
      fields: [...formData.fields, { name: '', type: 'text', required: false, label: '' }]
    });
  };

  const removeField = (index) => {
    setFormData({
      ...formData,
      fields: formData.fields.filter((_, i) => i !== index)
    });
  };

  const updateField = (index, field) => {
    const newFields = [...formData.fields];
    newFields[index] = field;
    setFormData({ ...formData, fields: newFields });
  };

  if (loading) return <div className="text-white">Carregando formulários...</div>;
  if (error) return <div className="text-red-500">Erro: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Formulários</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Formulário
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form) => (
          <div key={form.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{form.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${
                form.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
              }`}>
                {form.active ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            
            <p className="text-gray-400 text-sm mb-4">{form.description}</p>
            
            <div className="text-sm text-gray-300 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{form.fields?.length || 0} campos</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(form)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleViewSubmissions(form)}
                  className="text-green-400 hover:text-green-300"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(form.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <span className="text-gray-400 text-sm">
                {form.submissionCount || 0} submissões
              </span>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingForm ? 'Editar Formulário' : 'Novo Formulário'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Descrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  rows="3"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Campos
                  </label>
                  <button
                    type="button"
                    onClick={addField}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Adicionar Campo
                  </button>
                </div>
                
                <div className="space-y-2">
                  {formData.fields.map((field, index) => (
                    <div key={index} className="bg-gray-700 p-3 rounded-md">
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Nome do campo"
                          value={field.name}
                          onChange={(e) => updateField(index, { ...field, name: e.target.value })}
                          className="px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Label"
                          value={field.label}
                          onChange={(e) => updateField(index, { ...field, label: e.target.value })}
                          className="px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={field.type}
                          onChange={(e) => updateField(index, { ...field, type: e.target.value })}
                          className="px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                        >
                          <option value="text">Texto</option>
                          <option value="email">Email</option>
                          <option value="number">Número</option>
                          <option value="textarea">Textarea</option>
                        </select>
                        <label className="flex items-center gap-1 text-sm text-gray-300">
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) => updateField(index, { ...field, required: e.target.checked })}
                          />
                          Obrigatório
                        </label>
                        <button
                          type="button"
                          onClick={() => removeField(index)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
                <label className="text-sm text-gray-300">Formulário ativo</label>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
                >
                  {editingForm ? 'Atualizar' : 'Criar'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingForm(null);
                    setFormData({ name: '', description: '', fields: [], active: true });
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingSubmissions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">
              Submissões - {viewingSubmissions.name}
            </h2>
            <div className="space-y-4">
              {submissions.length === 0 ? (
                <p className="text-gray-400">Nenhuma submissão encontrada.</p>
              ) : (
                submissions.map((submission, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-2">
                      {new Date(submission.createdAt).toLocaleString()}
                    </div>
                    <div className="space-y-2">
                      {Object.entries(submission.data).map(([key, value]) => (
                        <div key={key} className="flex">
                          <span className="text-gray-300 font-medium mr-2">{key}:</span>
                          <span className="text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setViewingSubmissions(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forms;
