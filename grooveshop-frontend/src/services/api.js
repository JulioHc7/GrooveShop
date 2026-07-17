const API_BASE_URL = "http://localhost:8080/api";

export const obtenerInstrumentos = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/instrumentos`);
        if (!response.ok) {
            throw new Error("Error al traer los instrumentos");
        }
        return await response.json(); // Devolvemos la lista de instrumentos en formato JS
    } catch (error) {
        console.error("Error en la petición API:", error);
        return [];
    }
};

export const crearPedido = async (pedidoData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/pedidos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedidoData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Error al procesar el pedido");
        }

        return await response.json();
    } catch (error) {
        console.error("Error al enviar el pedido:", error);
        throw error;
    }
};