import React, { useState, useEffect } from 'react';
import { TeamPresentService } from '../../services/team-present.service';
import { Users, X } from 'lucide-react';

export interface EquipeItem {
    id: string;
    funcao: string;
    quantidade: number;
    horasTrabalhadas: number;
    horasExtras: number;
    faltas: number;
    nomesFaltosos: string;
}

interface EquipePresenteProps {
    isReadOnly?: boolean;
}

export const EquipePresente: React.FC<EquipePresenteProps> = ({ isReadOnly }) => {
    const [equipe, setEquipe] = useState<EquipeItem[]>([
        {
            id: '1',
            funcao: '',
            quantidade: 0,
            horasTrabalhadas: 0,
            horasExtras: 0,
            faltas: 0,
            nomesFaltosos: ''
        }
    ]);

    isReadOnly ?? TeamPresentService.getAll()
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                setEquipe(data);
            }
        })
        .catch(() => {
            // Em caso de erro, mantém o estado padrão
        });

    const adicionarFuncao = () => {
        const novoId = Date.now().toString();
        setEquipe([
            ...equipe,
            {
                id: novoId,
                funcao: '',
                quantidade: 0,
                horasTrabalhadas: 0,
                horasExtras: 0,
                faltas: 0,
                nomesFaltosos: ''
            }
        ]);
    };

    const removerFuncao = (id: string) => {
        setEquipe(equipe.filter(item => item.id !== id));
    };

    const atualizarEquipe = (id: string, campo: keyof EquipeItem, valor: string | number) => {
        setEquipe(equipe.map(item =>
            item.id === id ? { ...item, [campo]: valor } : item
        ));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <Users className="mr-2 text-green-600" />
                    <h2 className="text-2xl font-bold">Equipe Presente</h2>
                </div>
                {!isReadOnly && (
                    <button
                        onClick={adicionarFuncao}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        + Adicionar Função
                    </button>
                )}
            </div>

            {equipe.map((item) => (
                <div key={item.id} className="border p-4 rounded mb-4 bg-gray-50 relative">
                    {!isReadOnly && equipe.length > 1 && (
                        <button
                            onClick={() => removerFuncao(item.id)}
                            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                        >
                            <X size={20} />
                        </button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Função */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Função</label>
                            {isReadOnly ? (
                                <div className="p-2 bg-gray-100 rounded border text-gray-700 min-h-[40px]">
                                    {item.funcao || <span className="text-gray-400">Não informado</span>}
                                </div>
                            ) : (
                                <select
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                                    value={item.funcao}
                                    onChange={(e) => atualizarEquipe(item.id, 'funcao', e.target.value)}
                                >
                                    <option value="">Selecione</option>
                                    <option value="pedreiro">Pedreiro</option>
                                    <option value="servente">Servente</option>
                                    <option value="armador">Armador</option>
                                    <option value="carpinteiro">Carpinteiro</option>
                                    <option value="eletricista">Eletricista</option>
                                    <option value="encanador">Encanador</option>
                                    <option value="pintor">Pintor</option>
                                    <option value="azulejista">Azulejista</option>
                                    <option value="mestre">Mestre de Obras</option>
                                    <option value="outro">Outro</option>
                                </select>
                            )}
                        </div>

                        {/* Quantidade */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Quantidade</label>
                            {isReadOnly ? (
                                <div className="p-2 bg-gray-100 rounded border text-gray-700 min-h-[40px]">
                                    {item.quantidade || <span className="text-gray-400">Não informado</span>}
                                </div>
                            ) : (
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                                    placeholder="Ex: 5"
                                    value={item.quantidade || ''}
                                    onChange={(e) => atualizarEquipe(item.id, 'quantidade', parseInt(e.target.value) || 0)}
                                />
                            )}
                        </div>

                        {/* Horas Trabalhadas */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Horas Trabalhadas</label>
                            {isReadOnly ? (
                                <div className="p-2 bg-gray-100 rounded border text-gray-700 min-h-[40px]">
                                    {item.horasTrabalhadas || <span className="text-gray-400">Não informado</span>}
                                </div>
                            ) : (
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                                    placeholder="Ex: 8"
                                    value={item.horasTrabalhadas || ''}
                                    onChange={(e) => atualizarEquipe(item.id, 'horasTrabalhadas', parseInt(e.target.value) || 0)}
                                />
                            )}
                        </div>

                        {/* Horas Extras */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Horas Extras</label>
                            {isReadOnly ? (
                                <div className="p-2 bg-gray-100 rounded border text-gray-700 min-h-[40px]">
                                    {item.horasExtras || <span className="text-gray-400">Não informado</span>}
                                </div>
                            ) : (
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                                    placeholder="Ex: 2"
                                    value={item.horasExtras || ''}
                                    onChange={(e) => atualizarEquipe(item.id, 'horasExtras', parseInt(e.target.value) || 0)}
                                />
                            )}
                        </div>

                        {/* Faltas */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Faltas</label>
                            {isReadOnly ? (
                                <div className="p-2 bg-gray-100 rounded border text-gray-700 min-h-[40px]">
                                    {item.faltas || <span className="text-gray-400">Não informado</span>}
                                </div>
                            ) : (
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                                    placeholder="Ex: 1"
                                    value={item.faltas || ''}
                                    onChange={(e) => atualizarEquipe(item.id, 'faltas', parseInt(e.target.value) || 0)}
                                />
                            )}
                        </div>

                        {/* Nomes dos Faltosos */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Nomes dos Faltosos</label>
                            {isReadOnly ? (
                                <div className="p-2 bg-gray-100 rounded border text-gray-700 min-h-[40px]">
                                    {item.nomesFaltosos || <span className="text-gray-400">Não informado</span>}
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                                    placeholder="Opcional"
                                    value={item.nomesFaltosos}
                                    onChange={(e) => atualizarEquipe(item.id, 'nomesFaltosos', e.target.value)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};