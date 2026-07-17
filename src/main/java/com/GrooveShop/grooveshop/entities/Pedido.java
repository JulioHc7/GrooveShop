package com.GrooveShop.grooveshop.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "nombre_cliente", nullable = false)
    private String nombreCliente;

    @Column(name = "correo_cliente", nullable = false)
    private String correoCliente;

    @Column(nullable = false)
    private BigDecimal total;

    private String estado;
}