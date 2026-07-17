package com.GrooveShop.grooveshop.entities; // Asegúrate de que coincida con tu estructura de paquetes

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "instrumentos")
@Data // Genera automáticamente getters, setters, toString, equals y hashCode con Lombok
@NoArgsConstructor // Genera el constructor vacío que requiere JPA
@AllArgsConstructor // Genera un constructor con todos los campos
public class Instrumento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String marca;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(nullable = false)
    private BigDecimal precio;

    @Column(nullable = false)
    private Integer stock;

    @Column(name = "imagen_url")
    private String imagenUrl;

    @Column(nullable = false)
    private String categoria;
}