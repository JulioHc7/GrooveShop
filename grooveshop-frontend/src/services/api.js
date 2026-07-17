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