const API_BASE_URL = "http://localhost:8080/api";

export const obtenerInstrumentos = async (categoria = "", buscar = "") => {
    try {
        let url = `${API_BASE_URL}/instrumentos`;
        const params = new URLSearchParams();

        if (categoria) params.append("categoria", categoria);
        if (buscar) params.append("buscar", buscar);
        if (params.toString()) url += `?${params.toString()}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al traer los instrumentos");
        return await response.json();
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