import React from 'react';

export default function InstrumentCard({ instrumento, alAgregarAlCarrito }) {
    return (
        <div className="card-instrumento" style={styles.card}>
            <img
                src={instrumento.imagenUrl || "https://images.unsplash.com/photo-1550985616-10810253b84d"}
                alt={instrumento.nombre}
                style={styles.imagen}
            />
            <div style={styles.contenido}>
                <span style={styles.categoria}>{instrumento.categoria}</span>
                <h3 style={styles.nombre}>{instrumento.nombre}</h3>
                <p style={styles.marca}>Marca: {instrumento.marca}</p>
                <p style={styles.descripcion}>{instrumento.descripcion}</p>

                <div style={styles.filaPrecio}>
                    <span style={styles.precio}>${instrumento.precio.toFixed(2)}</span>
                    <span style={styles.stock}>Disponibles: {instrumento.stock}</span>
                </div>

                <button
                    onClick={() => alAgregarAlCarrito(instrumento)}
                    style={styles.boton}
                    disabled={instrumento.stock === 0}
                >
                    {instrumento.stock > 0 ? "Añadir al Carrito 🛒" : "Agotado 🚫"}
                </button>
            </div>
        </div>
    );
}

// Estilos
const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        maxWidth: '300px'
    },
    imagen: {
        width: '100%',
        height: '200px',
        objectFit: 'cover'
    },
    contenido: {
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    categoria: {
        fontSize: '12px',
        color: '#888',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    nombre: {
        fontSize: '18px',
        margin: '0',
        color: '#333'
    },
    marca: {
        fontSize: '14px',
        color: '#666',
        margin: '0'
    },
    descripcion: {
        fontSize: '13px',
        color: '#777',
        margin: '0',
        height: '40px',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    filaPrecio: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '8px'
    },
    precio: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#2ecc71'
    },
    stock: {
        fontSize: '12px',
        color: '#e74c3c'
    },
    boton: {
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '12px',
        transition: 'background-color 0.2s'
    }
};