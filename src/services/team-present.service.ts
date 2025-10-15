import { EquipeItem } from "../components/team-present/team-present";

export const TeamPresentService = {
    async getAll(): Promise<EquipeItem[]> {
        // Exemplo de fetch, ajuste a URL conforme sua API
        const response = await fetch("/api/team-present", {
            credentials: "include",
        });
        if (!response.ok) throw new Error("Erro ao buscar equipe presente");
        return response.json();
    },
};
