
export interface UserTypeResponse {
    type: string;
}



export async function getUserType(): Promise<UserTypeResponse> {
    const response = await fetch('/api/user/type', {
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('Erro ao buscar tipo do usuário');
    }
    //return response.json();
    return {type: "cliente"};
}
