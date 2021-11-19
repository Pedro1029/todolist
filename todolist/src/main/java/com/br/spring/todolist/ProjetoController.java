package com.br.spring.todolist;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ProjetoController {

    private final Projetos projetos;

    @Autowired
    public ProjetoController(Projetos projetos) {
        this.projetos = projetos;
    }

    @GetMapping(path = "/projetos", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Projeto> findAllProjetos() {
        return projetos.findAll();
    }

}
