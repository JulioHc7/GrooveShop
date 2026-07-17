package com.GrooveShop.grooveshop.repositories;

import com.GrooveShop.grooveshop.entities.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

public interface InstrumentoRepository extends JpaRepository<Instrumento, Long> {
    List<Instrumento> findByCategoria(String categoria);
    List<Instrumento> findByNombreContainingIgnoreCase(String nombre);
}
