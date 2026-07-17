package com.GrooveShop.grooveshop.config;

import com.GrooveShop.grooveshop.entities.Instrumento;
import com.GrooveShop.grooveshop.repositories.InstrumentoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(InstrumentoRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new Instrumento(
                        null,
                        "Guitarra Eléctrica Fender Stratocaster",
                        "Fender",
                        "La guitarra eléctrica más icónica de la historia.",
                        new BigDecimal("1200.00"),
                        10,
                        "https://audiomusicacl.vtexassets.com/arquivos/ids/191413-800-800?v=638525238674170000&width=800&height=800&aspect=true",
                        "Cuerdas"
                ));

                repository.save(new Instrumento(
                        null,
                        "Batería Acústica Stage Custom",
                        "Yamaha",
                        "Batería de madera de abedul de alta calidad.",
                        new BigDecimal("950.00"),
                        5,
                        "https://www.musicanarias.com/11683-thickbox_default/bateria-yamaha-stage-custom-birch-sbp0f5-classic-wh.jpg",
                        "Percusión"
                ));
                repository.save(new Instrumento(
                        null, "Teclado Sintetizador MODX7", "Yamaha",
                        "Sintetizador compacto y ligero con motor de sonido avanzado.",
                        new java.math.BigDecimal("1450.00"), 7,
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB-LxBJ5mJawQc40iVlrazNpiDFhxHFEKh7_UEWLxfRI0QvELg_lHButp2&s=10", "Teclados"
                ));

                repository.save(new Instrumento(
                        null, "Saxofón Alto Profesional YAS-280", "Yamaha",
                        "Saxofón ideal para estudiantes avanzados y profesionales.",
                        new java.math.BigDecimal("1100.00"), 4,
                        "https://es.yamaha.com/es/files/yas-280_tcm121-1696630.jpg?impolicy=resize&imwid=735&imhei=735", "Vientos"
                ));

                repository.save(new Instrumento(
                        null, "Guitarra Acústica Taylor 114e", "Taylor",
                        "Guitarra acústica con un tono brillante y gran proyección.",
                        new java.math.BigDecimal("899.00"), 6,
                        "https://r2.gear4music.com/media/109/1093087/600/preview.jpg", "Cuerdas"
                ));
                repository.save(new Instrumento(
                        null, "Guitarra Eléctrica ", "Gibson Sg",
                        "Guitarra eléctrica con un tono grueso y gran proyección.",
                        new java.math.BigDecimal("1350.00"), 6,
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTFfk4YbbYFwkFQ5VytOFYOFmpAHzBUI7mfBIVruAp8kVqM6mtRM8_4iw-&s=10", "Cuerdas"
                ));
                repository.save(new Instrumento(
                        null, "Violín ", "Stentor Student",
                        "Sonido brillante claro y directo.",
                        new java.math.BigDecimal("200.00"), 6,
                        "https://m.media-amazon.com/images/I/6174okFc7tL._AC_SL1200_.jpg", "Cuerdas"
                ));

            }
        };
    }
}
