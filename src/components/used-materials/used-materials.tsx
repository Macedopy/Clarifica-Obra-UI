import React, { useState } from 'react';
import { Package, X } from 'lucide-react';

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

export const MateriaisUtilizados: React.FC = () => {
    const [materiais, setMateriais] = useState<MaterialItem[]>([
        {
            id: '1',
            nome: '',
            categoria: '',
            quantidadeConsumida: 0,
            unidade: '',
            estoqueAtual: 0,
            estoqueMinimo: 0,
            reposicao: false,
            urgencia: ''
        }
    ]);

    const adicionarMaterial = () => {
        const novoId = Date.now().toString();
        setMateriais([
            ...materiais,
            {
                id: novoId,
                nome: '',
                categoria: '',
                quantidadeConsumida: 0,
                unidade: '',
                estoqueAtual: 0,
                estoqueMinimo: 0,
                reposicao: false,
                urgencia: ''
            }
        ]);
    };

    const removerMaterial = (id: string) => {
        setMateriais(materiais.filter(item => item.id !== id));
    };

    const atualizarMaterial = (id: string, campo: keyof MaterialItem, valor: string | number | boolean) => {
        setMateriais(materiais.map(item =>
            item.id === id ? { ...item, [campo]: valor } : item
        ));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <Package className="mr-2 text-purple-600" />
                    <h2 className="text-2xl font-bold">Materiais Utilizados</h2>
                </div>
                <button
                    onClick={adicionarMaterial}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                    + Adicionar Material
                </button>
            </div>

            {materiais.map((material) => (
                <div key={material.id} className="border p-4 rounded mb-4 bg-gray-50 relative">
                    {materiais.length > 1 && (
                        <button
                            onClick={() => removerMaterial(material.id)}
                            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                        >
                            <X size={20} />
                        </button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Categoria</label>
                            <select
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
                                value={material.categoria}
                                onChange={(e) => atualizarMaterial(material.id, 'categoria', e.target.value)}
                            >
                                <option value="">Selecione</option>
                                <option value="cimento">Cimento e agregados</option>
                                <option value="blocos">Blocos e tijolos</option>
                                <option value="areia">Areia e brita</option>
                                <option value="ferro">Ferro e aço</option>
                                <option value="madeira">Madeira</option>
                                <option value="hidraulica">Hidráulica</option>
                                <option value="eletrica">Elétrica</option>
                                <option value="revestimentos">Revestimentos</option>
                                <option value="tintas">Tintas</option>
                                <option value="outros">Outros</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Nome do Material</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
                                placeholder="Ex: Cimento CP-II 50kg"
                                value={material.nome}
                                onChange={(e) => atualizarMaterial(material.id, 'nome', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Quantidade Consumida</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
                                placeholder="Ex: 20"
                                value={material.quantidadeConsumida || ''}
                                onChange={(e) => atualizarMaterial(material.id, 'quantidadeConsumida', parseFloat(e.target.value) || 0)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Unidade</label>
                            <select
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
                                value={material.unidade}
                                onChange={(e) => atualizarMaterial(material.id, 'unidade', e.target.value)}
                            >
                                <option value="">Selecione</option>
                                <option value="kg">kg</option>
                                <option value="saco">Saco</option>
                                <option value="m3">m³</option>
                                <option value="unidade">Unidade</option>
                                <option value="litro">Litro</option>
                                <option value="barra">Barra</option>
                                <option value="rolo">Rolo</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Estoque Atual</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
                                placeholder="Ex: 50"
                                value={material.estoqueAtual || ''}
                                onChange={(e) => atualizarMaterial(material.id, 'estoqueAtual', parseFloat(e.target.value) || 0)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Estoque Mínimo</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
                                placeholder="Ex: 30"
                                value={material.estoqueMinimo || ''}
                                onChange={(e) => atualizarMaterial(material.id, 'estoqueMinimo', parseFloat(e.target.value) || 0)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Urgência</label>
                            <select
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
                                value={material.urgencia}
                                onChange={(e) => atualizarMaterial(material.id, 'urgencia', e.target.value)}
                            >
                                <option value="">Selecione</option>
                                <option value="normal">Normal</option>
                                <option value="urgente">Urgente</option>
                                <option value="critico">Crítico</option>
                            </select>
                        </div>

                        <div className="flex items-center md:col-span-2">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={material.reposicao}
                                onChange={(e) => atualizarMaterial(material.id, 'reposicao', e.target.checked)}
                            />
                            <label className="text-sm font-medium">Solicitar reposição</label>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};