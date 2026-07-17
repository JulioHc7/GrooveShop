package com.GrooveShop.grooveshop.controllers;

import com.GrooveShop.grooveshop.entities.Instrumento;
import com.GrooveShop.grooveshop.repositories.InstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instrumentos")
@CrossOrigin(origins = "http://localhost:5173")
public class InstrumentoController {

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    @GetMapping
    public List<Instrumento> obtenerTodos(
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String buscar) {

        if (categoria != null && !categoria.isEmpty()) {
            return instrumentoRepository.findByCategoria(categoria);
        }

        if (buscar != null && !buscar.isEmpty()) {
            return instrumentoRepository.findByNombreContainingIgnoreCase(buscar);
        }

        return instrumentoRepository.findAll();
    }

    @PostMapping
    public Instrumento crear(@RequestBody Instrumento nuevoInstrumento) {
        return instrumentoRepository.save(nuevoInstrumento);
    }
}
