import Auth from "../services/auth.js";
import config from "../services/config.js";

const todosService = {
    async getAll() {
        const response = await fetch(`${config.BASE_URL}/todo`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Ошибка, задачи не загрузились:', data);
            throw new Error(data.message || 'Ошибка, задачи не загрузились');
        }

        return data.data;
    },

    async create(description) {
        const response = await fetch(`${config.BASE_URL}/todo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.token}`,
            },
            body: JSON.stringify({ description }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Ошибка, задачи не создались:', data);
            throw new Error(data.message || 'Ошибка, задачи не создались');
        }

        return data;
    },

    async updateStatus(todoId, completed) {
        const response = await fetch(`${config.BASE_URL}/todo/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.token}`,
            },
            body: JSON.stringify({ completed }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`Ошибка, статус не обновился ${todoId}:`, data);
            throw new Error(data.message || 'Ошибка, статус не обновился');
        }

        return data;
    },

    async delete(todoId) {
        const response = await fetch(`${config.BASE_URL}/todo/${todoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`Ошибка, не удалились задачи ${todoId}:`, data);
            throw new Error(data.message || 'Ошибка, не удалились задачи');
        }

        return data;
    }
};

export default todosService;
