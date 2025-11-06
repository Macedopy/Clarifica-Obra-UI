import React, { useState, useEffect } from 'react';
import { Truck, X, Plus, Edit3, Save, Fuel, Clock, Wrench } from 'lucide-react';

interface MaquinarioItem {
    id: string;
    nome: string;
    categoria: string;
    horasTrabalhadas: number;
    combustivelUsado: number;
    combustivelUnidade: 'litros' | 'horas';
    quantidadeTotal: number;
    emOperacao: number;
    disponivel: number;
    emManutencao: number;
    condicao: 'ótima' | 'boa' | 'ruim' | 'indisponível';
    observacao: string;
}

interface MaquinariosUtilizadosProps {
    isReadOnly?: boolean;
    faseId: string;
}

export const MaquinariosUtilizados: React.FC<MaquinariosUtilizadosProps> = ({
    isReadOnly = false,
    faseId
}) => {
    const STORAGE_KEY = `maquinarios-fase-${faseId}`;
    const [maquinarios, setMaquinarios] = useState<MaquinarioItem[]>([]);
    const [editandoId, setEditandoId] = useState<string | null>(null);
    const [editTemp, setEditTemp] = useState<{
        nome: string;
        categoria: string;
        horasTrabalhadas: number;
        combustivelUsado: number;
        combustivelUnidade: 'litros' | 'horas';
        quantidadeTotal: number;
        emOperacao: number;
        emManutencao: number;
        condicao: 'ótima' | 'boa' | 'ruim' | 'indisponível';
        observacao: string;
    }>({
        nome: '',
        categoria: 'Pesado',
        horasTrabalhadas: 0,
        combustivelUsado: 0,
        combustivelUnidade: 'litros',
        quantidadeTotal: 1,
        emOperacao: 0,
        emManutencao: 0,
        condicao: 'boa',
        observacao: ''
    });

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setMaquinarios(JSON.parse(saved));
    }, [faseId]);

    useEffect(() => {
        if (maquinarios.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(maquinarios));
        }
    }, [maquinarios]);

    const adicionarMaquinario = () => {
        const novo: MaquinarioItem = {
            id: Date.now().toString(),
            nome: 'Nova Máquina',
            categoria: 'Pesado',
            horasTrabalhadas: 0,
            combustivelUsado: 0,
            combustivelUnidade: 'litros',
            quantidadeTotal: 1,
            emOperacao: 0,
            disponivel: 1,
            emManutencao: 0,
            condicao: 'boa',
            observacao: ''
        };
        setMaquinarios(prev => [...prev, novo]);
    };

    const removerMaquinario = (id: string) => {
        setMaquinarios(prev => prev.filter(m => m.id !== id));
        setEditandoId(null);
    };

    const atualizarMaquinario = (id: string, updates: Partial<MaquinarioItem>) => {
        setMaquinarios(prev =>
            prev.map(m =>
                m.id === id
                    ? { ...m, ...updates, disponivel: m.quantidadeTotal - m.emOperacao - m.emManutencao }
                    : m
            )
        );
    };

    const abrirEdicao = (maquinario: MaquinarioItem) => {
        setEditandoId(maquinario.id);
        setEditTemp({
            nome: maquinario.nome,
            categoria: maquinario.categoria,
            horasTrabalhadas: maquinario.horasTrabalhadas,
            combustivelUsado: maquinario.combustivelUsado,
            combustivelUnidade: maquinario.combustivelUnidade,
            quantidadeTotal: maquinario.quantidadeTotal,
            emOperacao: maquinario.emOperacao,
            emManutencao: maquinario.emManutencao,
            condicao: maquinario.condicao,
            observacao: maquinario.observacao
        });
    };

    const salvarEdicao = () => {
        if (!editandoId) return;
        atualizarMaquinario(editandoId, {
            nome: editTemp.nome,
            categoria: editTemp.categoria,
            horasTrabalhadas: editTemp.horasTrabalhadas,
            combustivelUsado: editTemp.combustivelUsado,
            combustivelUnidade: editTemp.combustivelUnidade,
            quantidadeTotal: editTemp.quantidadeTotal,
            emOperacao: editTemp.emOperacao,
            emManutencao: editTemp.emManutencao,
            condicao: editTemp.condicao,
            observacao: editTemp.observacao
        });
        setEditandoId(null);
    };

    const operar = () => {
        if (editTemp.emOperacao >= editTemp.quantidadeTotal - editTemp.emManutencao) return;
        setEditTemp(prev => ({
            ...prev,
            emOperacao: prev.emOperacao + 1,
            horasTrabalhadas: prev.horasTrabalhadas + 1
        }));
    };

    const parar = () => {
        if (editTemp.emOperacao <= 0) return;
        setEditTemp(prev => ({ ...prev, emOperacao: prev.emOperacao - 1 }));
    };

    const enviarManutencao = () => {
        if (editTemp.emManutencao >= editTemp.quantidadeTotal - editTemp.emOperacao) return;
        setEditTemp(prev => ({ ...prev, emManutencao: prev.emManutencao + 1 }));
    };

    const retornarManutencao = () => {
        if (editTemp.emManutencao <= 0) return;
        setEditTemp(prev => ({ ...prev, emManutencao: prev.emManutencao - 1 }));
    };

    const disponivel = editTemp.quantidadeTotal - editTemp.emOperacao - editTemp.emManutencao;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Truck className="text-teal-600" size={28} />
                    <h3 className="text-xl font-bold">Maquinários Utilizados</h3>
                </div>
                {!isReadOnly && (
                    <button
                        onClick={adicionarMaquinario}
                        className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition shadow"
                    >
                        <Plus size={18} />
                        Adicionar Máquina
                    </button>
                )}
            </div>

            {maquinarios.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <Truck size={48} className="mx-auto mb-3 text-gray-300" />
                    <p>Nenhum maquinário adicionado ainda.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {maquinarios.map(maquinario => (
                        <div
                            key={maquinario.id}
                            className={`border rounded-xl p-5 shadow-sm transition-all relative ${editandoId === maquinario.id
                                    ? 'ring-2 ring-teal-500 bg-teal-50'
                                    : 'bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow'
                                }`}
                        >
                            {!isReadOnly && (
                                <div className="absolute top-3 right-3 flex gap-2 z-10">
                                    {editandoId !== maquinario.id ? (
                                        <button
                                            onClick={() => abrirEdicao(maquinario)}
                                            className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow"
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={salvarEdicao}
                                            className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow"
                                        >
                                            <Save size={16} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => removerMaquinario(maquinario.id)}
                                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}

                            {editandoId === maquinario.id ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Nome</label>
                                            <input
                                                type="text"
                                                value={editTemp.nome}
                                                onChange={e => setEditTemp({ ...editTemp, nome: e.target.value })}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500"
                                                placeholder="Ex: Retroescavadeira JCB"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Categoria</label>
                                            <select
                                                value={editTemp.categoria}
                                                onChange={e => setEditTemp({ ...editTemp, categoria: e.target.value })}
                                                className="w-full p-2 border rounded"
                                            >
                                                <option>Pesado</option>
                                                <option>Leve</option>
                                                <option>Elétrico</option>
                                                <option>Compactador</option>
                                                <option>Outros</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Quantidade Total</label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={editTemp.quantidadeTotal}
                                                onChange={e => setEditTemp({ ...editTemp, quantidadeTotal: Number(e.target.value) })}
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Condição</label>
                                            <select
                                                value={editTemp.condicao}
                                                onChange={e =>
                                                    setEditTemp({
                                                        ...editTemp,
                                                        condicao: e.target.value as 'ótima' | 'boa' | 'ruim' | 'indisponível'
                                                    })
                                                }
                                                className="w-full p-2 border rounded"
                                            >
                                                <option value="ótima">Ótima</option>
                                                <option value="boa">Boa</option>
                                                <option value="ruim">Ruim</option>
                                                <option value="indisponível">Indisponível</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t">
                                        <div className="text-center">
                                            <Clock className="mx-auto text-blue-600 mb-1" size={20} />
                                            <p className="text-xs text-gray-600">Horas</p>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.5"
                                                value={editTemp.horasTrabalhadas}
                                                onChange={e => setEditTemp({ ...editTemp, horasTrabalhadas: Number(e.target.value) })}
                                                className="w-full text-center text-2xl font-bold text-blue-600 bg-transparent border-b-2 border-blue-300 focus:border-blue-600 outline-none"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <Fuel className="mx-auto text-orange-600 mb-1" size={20} />
                                            <p className="text-xs text-gray-600">Combustível</p>
                                            <div className="flex items-center justify-center gap-1 mt-1">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.1"
                                                    value={editTemp.combustivelUsado}
                                                    onChange={e => setEditTemp({ ...editTemp, combustivelUsado: Number(e.target.value) })}
                                                    className="w-20 text-center text-xl font-bold text-orange-600 bg-transparent border-b-2 border-orange-300 focus:border-orange-600 outline-none"
                                                />
                                                <select
                                                    value={editTemp.combustivelUnidade}
                                                    onChange={e => setEditTemp({ ...editTemp, combustivelUnidade: e.target.value as 'litros' | 'horas' })}
                                                    className="text-xs p-1 border rounded bg-white"
                                                >
                                                    <option value="litros">Litros</option>
                                                    <option value="horas">Horas</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-gray-600">Em Operação</p>
                                            <p className="text-2xl font-bold text-purple-600">{editTemp.emOperacao}</p>
                                            <div className="flex gap-1 mt-2">
                                                <button
                                                    onClick={operar}
                                                    disabled={editTemp.emOperacao >= editTemp.quantidadeTotal - editTemp.emManutencao}
                                                    className="flex-1 bg-purple-500 text-white text-xs py-1 rounded hover:bg-purple-600 disabled:opacity-50"
                                                >
                                                    Ligar
                                                </button>
                                                <button
                                                    onClick={parar}
                                                    disabled={editTemp.emOperacao <= 0}
                                                    className="flex-1 bg-gray-500 text-white text-xs py-1 rounded hover:bg-gray-600 disabled:opacity-50"
                                                >
                                                    Parar
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-gray-600">Manutenção</p>
                                            <p className="text-2xl font-bold text-orange-600">{editTemp.emManutencao}</p>
                                            <div className="flex gap-1 mt-2">
                                                <button
                                                    onClick={enviarManutencao}
                                                    disabled={editTemp.emManutencao >= editTemp.quantidadeTotal - editTemp.emOperacao}
                                                    className="flex-1 bg-orange-500 text-white text-xs py-1 rounded hover:bg-orange-600 disabled:opacity-50"
                                                >
                                                    Enviar
                                                </button>
                                                <button
                                                    onClick={retornarManutencao}
                                                    disabled={editTemp.emManutencao <= 0}
                                                    className="flex-1 bg-teal-500 text-white text-xs py-1 rounded hover:bg-teal-600 disabled:opacity-50"
                                                >
                                                    Retornar
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 text-center pt-3 border-t">
                                        <div className="bg-green-50 p-2 rounded">
                                            <p className="text-xs text-gray-600">Disponível</p>
                                            <p className="font-bold text-green-700">{disponivel}</p>
                                        </div>
                                        <div className="bg-blue-50 p-2 rounded">
                                            <p className="text-xs text-gray-600">Total</p>
                                            <p className="font-bold text-blue-700">{editTemp.quantidadeTotal}</p>
                                        </div>
                                        <div className="bg-gray-50 p-2 rounded">
                                            <Wrench className="mx-auto text-gray-600 mb-1" size={16} />
                                            <p className="text-xs text-gray-600">Condição</p>
                                            <p className="font-bold text-gray-700">{editTemp.condicao}</p>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <label className="block text-sm font-medium mb-1">Observação</label>
                                        <textarea
                                            value={editTemp.observacao}
                                            onChange={e => setEditTemp({ ...editTemp, observacao: e.target.value })}
                                            className="w-full p-2 border rounded"
                                            rows={2}
                                            placeholder="Ex: Filtro de ar sujo"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <p className="font-bold text-gray-800">{maquinario.nome}</p>
                                            <p className="text-sm text-gray-600">{maquinario.categoria}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-2 justify-end">
                                                <Clock className="text-blue-600" size={16} />
                                                <span className="text-sm font-medium">{maquinario.horasTrabalhadas}h</span>
                                            </div>
                                            <div className="flex items-center gap-2 justify-end mt-1">
                                                <Fuel className="text-orange-600" size={16} />
                                                <span className="text-sm font-medium">
                                                    {maquinario.combustivelUsado} {maquinario.combustivelUnidade === 'litros' ? 'L' : 'h'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2 text-center text-sm">
                                        <div className="bg-purple-50 p-2 rounded">
                                            <p className="text-xs text-gray-600">Operação</p>
                                            <p className="font-bold text-purple-700">{maquinario.emOperacao}</p>
                                        </div>
                                        <div className="bg-green-50 p-2 rounded">
                                            <p className="text-xs text-gray-600">Disponível</p>
                                            <p className="font-bold text-green-700">{maquinario.disponivel}</p>
                                        </div>
                                        <div className="bg-orange-50 p-2 rounded">
                                            <p className="text-xs text-gray-600">Manutenção</p>
                                            <p className="font-bold text-orange-700">{maquinario.emManutencao}</p>
                                        </div>
                                        <div className="bg-gray-50 p-2 rounded">
                                            <p className="text-xs text-gray-600">Total</p>
                                            <p className="font-bold text-gray-700">{maquinario.quantidadeTotal}</p>
                                        </div>
                                    </div>
                                    {maquinario.observacao && (
                                        <p className="text-xs text-gray-500 mt-2 italic">"{maquinario.observacao}"</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
