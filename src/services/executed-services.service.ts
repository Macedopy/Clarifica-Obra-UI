import { ServicoItem } from "../components/executed-services/executed-services";

export const ExecutedServices = {
  async getAll(): Promise<ServicoItem[]> {
    // Exemplo de fetch, ajuste a URL conforme sua API
    const response = await fetch("/api/executed-services", {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Erro ao buscar serviços executados");
    return response.json();
  },
};
