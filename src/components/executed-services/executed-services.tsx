import React, { useState, useEffect } from 'react';
import { Wrench, X, Plus, Edit3, Save, Clock, Play, Pause, CheckCircle } from 'lucide-react';

interface Servico {
  id: string;
  nome: string;
  equipe: string;
  horasPlanejadas: number;
  horasExecutadas: number;
  status: 'PLANEJADO' | 'INICIADO' | 'EM_ANDAMENTO' | 'CONCLUIDO';
  progresso: number;
  observacao: string;
}

interface ServicosExecutadosProps {
  isReadOnly?: boolean;
  faseId: string;
  onServicosChange?: (servicos: any[]) => void;
}

export const ServicosExecutados: React.FC<ServicosExecutadosProps> = ({
  isReadOnly = false,
  faseId,
  onServicosChange
}) => {
  const STORAGE_KEY = `servicos-fase-${faseId}`;
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editTemp, setEditTemp] = useState<Servico>({
    id: '',
    nome: '',
    equipe: '',
    horasPlanejadas: 8,
    horasExecutadas: 0,
    status: 'PLANEJADO',
    progresso: 0,
    observacao: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setServicos(parsed);
      onServicosChange?.(parsed.map(mapToDTO));
    }
  }, [faseId]);

  useEffect(() => {
    if (servicos.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(servicos));
      onServicosChange?.(servicos.map(mapToDTO));
    }
  }, [servicos]);

  const mapToDTO = (s: Servico) => ({
    name: s.nome.trim() || "Serviço sem nome",
    team: s.equipe.trim() || "Equipe Principal",
    plannedHours: s.horasPlanejadas > 0 ? s.horasPlanejadas : 8,
    executedHours: s.horasExecutadas >= 0 ? s.horasExecutadas : 0,
    status: s.status,
    notes: s.observacao.trim() || null
  });

  const adicionarServico = () => {
    const novo: Servico = {
      id: Date.now().toString(),
      nome: 'Concretagem',
      equipe: 'Equipe de Fundação',
      horasPlanejadas: 24,
      horasExecutadas: 0,
      status: 'PLANEJADO',
      progresso: 0,
      observacao: ''
    };
    setServicos(prev => [...prev, novo]);
  };

  const removerServico = (id: string) => {
    setServicos(prev => prev.filter(s => s.id !== id));
    setEditandoId(null);
  };

  const atualizarServico = (id: string, updates: Partial<Servico>) => {
    setServicos(prev => prev.map(s => {
      if (s.id !== id) return s;
      const novo = { ...s, ...updates };
      const exec = updates.horasExecutadas ?? s.horasExecutadas;
      novo.progresso = novo.horasPlanejadas > 0 
        ? Math.min(100, Math.round((exec / novo.horasPlanejadas) * 100))
        : 0;

      if (novo.progresso >= 100) novo.status = 'CONCLUIDO';
      else if (exec > 0 && exec < novo.horasPlanejadas) novo.status = 'EM_ANDAMENTO';
      else if (exec > 0) novo.status = 'INICIADO';
      else novo.status = 'PLANEJADO';

      return novo;
    }));
  };

  const abrirEdicao = (servico: Servico) => {
    setEditandoId(servico.id);
    setEditTemp({ ...servico });
  };

  const salvarEdicao = () => {
    if (!editandoId) return;
    atualizarServico(editandoId, editTemp);
    setEditandoId(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PLANEJADO': return <Play className="text-gray-500" size={16} />;
      case 'INICIADO': return <Play className="text-blue-600" size={16} />;
      case 'EM_ANDAMENTO': return <Pause className="text-yellow-600" size={16} />;
      case 'CONCLUIDO': return <CheckCircle className="text-green-600" size={16} />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PLANEJADO': return 'bg-gray-100 text-gray-700';
      case 'INICIADO': return 'bg-blue-100 text-blue-700';
      case 'EM_ANDAMENTO': return 'bg-yellow-100 text-yellow-700';
      case 'CONCLUIDO': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Wrench className="text-orange-600" size={28} />
          <h3 className="text-xl font-bold">Serviços Executados</h3>
        </div>
        {!isReadOnly && (
          <button onClick={adicionarServico} className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition shadow">
            <Plus size={18} /> Adicionar Serviço
          </button>
        )}
      </div>

      {servicos.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Wrench size={48} className="mx-auto mb-3 text-gray-300" />
          <p>Nenhum serviço adicionado ainda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {servicos.map(servico => (
            <div key={servico.id} className={`border rounded-xl p-5 shadow-sm transition-all relative ${editandoId === servico.id ? 'ring-2 ring-orange-500 bg-orange-50' : 'bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow'}`}>
              {!isReadOnly && (
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                  {editandoId !== servico.id ? (
                    <button onClick={() => abrirEdicao(servico)} className="p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 shadow"><Edit3 size={16} /></button>
                  ) : (
                    <button onClick={salvarEdicao} className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow"><Save size={16} /></button>
                  )}
                  <button onClick={() => removerServico(servico.id)} className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow"><X size={16} /></button>
                </div>
              )}

              {editandoId === servico.id ? (
                <div className="space-y-4">
                  <input type="text" value={editTemp.nome} onChange={e => setEditTemp({ ...editTemp, nome: e.target.value })} className="w-full p-2 border rounded font-bold text-lg" placeholder="Nome do serviço" />
                  <input type="text" value={editTemp.equipe} onChange={e => setEditTemp({ ...editTemp, equipe: e.target.value })} className="w-full p-2 border rounded" placeholder="Equipe responsável" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Horas Planejadas</label>
                      <input type="number" min="1" step="0.5" value={editTemp.horasPlanejadas} onChange={e => setEditTemp({ ...editTemp, horasPlanejadas: Number(e.target.value) || 8 })} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Horas Executadas</label>
                      <input type="number" min="0" step="0.5" value={editTemp.horasExecutadas} onChange={e => setEditTemp({ ...editTemp, horasExecutadas: Number(e.target.value) || 0 })} className="w-full p-2 border rounded" />
                    </div>
                  </div>
                  <select value={editTemp.status} onChange={e => setEditTemp({ ...editTemp, status: e.target.value as any })} className="w-full p-2 border rounded">
                    <option value="PLANEJADO">Planejado</option>
                    <option value="INICIADO">Iniciado</option>
                    <option value="EM_ANDAMENTO">Em Andamento</option>
                    <option value="CONCLUIDO">Concluído</option>
                  </select>
                  <textarea value={editTemp.observacao} onChange={e => setEditTemp({ ...editTemp, observacao: e.target.value })} className="w-full p-2 border rounded text-sm" rows={2} placeholder="Observações" />
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{servico.nome}</p>
                      <p className="text-sm text-gray-600">{servico.equipe}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(servico.status)} flex items-center gap-1`}>
                      {getStatusIcon(servico.status)}
                      {servico.status === 'EM_ANDAMENTO' ? 'Em Andamento' : servico.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {servico.horasExecutadas}h de {servico.horasPlanejadas}h ({servico.progresso}%)
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-orange-600 h-3 rounded-full transition-all" style={{ width: `${servico.progresso}%` }} />
                  </div>
                  {servico.observacao && <p className="text-xs text-gray-500 mt-2 italic">"{servico.observacao}"</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
