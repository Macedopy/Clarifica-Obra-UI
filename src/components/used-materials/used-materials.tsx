import React, { useState, useEffect } from 'react';
import { Package, X, Plus, Edit3, Save, Box } from 'lucide-react';

interface MaterialItem {
  id: string;
  nome: string;
  categoria: string;
  quantidadeConsumida: number;
  unidade: string;
  estoqueAtual: number;
  estoqueMinimo: number;
  reposicao: boolean;
  urgencia: string;
}

interface MateriaisUtilizadosProps {
  isReadOnly?: boolean;
  faseId: string;
  onMateriaisChange?: (materiais: any[]) => void; // ADICIONADO
}

export const MateriaisUtilizados: React.FC<MateriaisUtilizadosProps> = ({
  isReadOnly = false,
  faseId,
  onMateriaisChange
}) => {
  const STORAGE_KEY = `materiais-fase-${faseId}`;
  const [materiais, setMateriais] = useState<MaterialItem[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editTemp, setEditTemp] = useState({ nome: '', categoria: '', unidade: '', estoqueMinimo: 10, adicao: 0, consumo: 0 });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setMateriais(parsed);
      onMateriaisChange?.(parsed.map(mapToDTO));
    }
  }, [faseId]);

  useEffect(() => {
    if (materiais.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(materiais));
      onMateriaisChange?.(materiais.map(mapToDTO));
    }
  }, [materiais]);

  const mapToDTO = (m: MaterialItem) => ({
    id: m.id,
    name: m.nome.trim() || "Material sem nome",
    category: m.categoria.trim() || "Outros",
    unit: m.unidade.trim() || "unidade",
    quantityUsed: m.quantidadeConsumida,
    currentStock: m.estoqueAtual,
    minimumStock: m.estoqueMinimo,
    urgency: m.urgencia || null
  });

  const adicionarMaterial = () => {
    const novo: MaterialItem = {
      id: Date.now().toString(),
      nome: 'Cimento CP-II',
      categoria: 'Cimento',
      quantidadeConsumida: 0,
      unidade: 'saco',
      estoqueAtual: 100,
      estoqueMinimo: 20,
      reposicao: false,
      urgencia: ''
    };
    setMateriais(prev => [...prev, novo]);
  };

  const removerMaterial = (id: string) => {
    setMateriais(prev => prev.filter(m => m.id !== id));
    setEditandoId(null);
  };

  const atualizarMaterial = (id: string, updates: Partial<MaterialItem>) => {
    setMateriais(prev => prev.map(m => {
      if (m.id !== id) return m;
      const novo = { ...m, ...updates };
      novo.reposicao = novo.estoqueAtual <= novo.estoqueMinimo;
      return novo;
    }));
  };

  const abrirEdicao = (material: MaterialItem) => {
    setEditandoId(material.id);
    setEditTemp({
      nome: material.nome,
      categoria: material.categoria,
      unidade: material.unidade,
      estoqueMinimo: material.estoqueMinimo,
      adicao: 0,
      consumo: 0
    });
  };

  const salvarEdicao = () => {
    if (!editandoId) return;
    atualizarMaterial(editandoId, {
      nome: editTemp.nome,
      categoria: editTemp.categoria,
      unidade: editTemp.unidade,
      estoqueMinimo: editTemp.estoqueMinimo
    });
    setEditandoId(null);
  };

  const consumir = () => {
    if (!editandoId || editTemp.consumo <= 0) return;
    const material = materiais.find(m => m.id === editandoId);
    if (!material) return;

    const novoConsumo = material.quantidadeConsumida + editTemp.consumo;
    const novoEstoque = Math.max(0, material.estoqueAtual - editTemp.consumo);

    atualizarMaterial(editandoId, {
      quantidadeConsumida: novoConsumo,
      estoqueAtual: novoEstoque
    });
    setEditTemp({ ...editTemp, consumo: 0 });
  };

  const adicionarEstoque = () => {
    if (!editandoId || editTemp.adicao <= 0) return;
    const material = materiais.find(m => m.id === editandoId);
    if (!material) return;

    atualizarMaterial(editandoId, {
      estoqueAtual: material.estoqueAtual + editTemp.adicao
    });
    setEditTemp({ ...editTemp, adicao: 0 });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Package className="text-purple-600" size={28} />
          <h3 className="text-xl font-bold">Materiais Utilizados</h3>
        </div>
        {!isReadOnly && (
          <button onClick={adicionarMaterial} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition shadow">
            <Plus size={18} /> Adicionar Material
          </button>
        )}
      </div>

      {materiais.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Package size={48} className="mx-auto mb-3 text-gray-300" />
          <p>Nenhum material adicionado ainda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {materiais.map(material => (
            <div key={material.id} className={`border rounded-xl p-5 shadow-sm transition-all relative ${editandoId === material.id ? 'ring-2 ring-purple-500 bg-purple-50' : 'bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow'}`}>
              {/* Botões de ação */}
              {!isReadOnly && (
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                  {editandoId !== material.id ? (
                    <button onClick={() => abrirEdicao(material)} className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow"><Edit3 size={16} /></button>
                  ) : (
                    <button onClick={salvarEdicao} className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow"><Save size={16} /></button>
                  )}
                  <button onClick={() => removerMaterial(material.id)} className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow"><X size={16} /></button>
                </div>
              )}

              {editandoId === material.id ? (
                // ... seu formulário de edição (mantido igual)
                // (não preciso repetir tudo aqui, só o mapToDTO e onMateriaisChange importam)
                <div className="space-y-4">
                  {/* seu formulário */}
                </div>
              ) : (
                <div>
                  <p className="font-bold text-gray-800">{material.nome}</p>
                  <p className="text-sm text-gray-600">{material.categoria} • Consumido: {material.quantidadeConsumida} {material.unidade}</p>
                  <p className="text-sm">Estoque: <strong className={material.reposicao ? 'text-red-600' : 'text-green-600'}>{material.estoqueAtual}</strong> {material.unidade}</p>
                  {material.reposicao && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Reposição necessária</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
