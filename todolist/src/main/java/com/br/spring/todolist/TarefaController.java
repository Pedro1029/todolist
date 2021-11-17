package com.br.spring.todolist;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class TarefaController {

    private final Tarefas tarefas;

    @Autowired
    public TarefaController(Tarefas tarefas) {
        this.tarefas = tarefas;
    }

    @GetMapping(path = "/tarefas/pendente", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Tarefa> findAllPendente() {
        return tarefas.findAllByFeita(false);
    }

    @GetMapping(path = "/tarefas/feita", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Tarefa> findAllFeita() {
        return tarefas.findAllByFeita(true);
    }

    @PatchMapping(path = "tarefa/{id}/marcar-como-feita", produces = MediaType.APPLICATION_JSON_VALUE)
    public Tarefa marcarComoFeita(@PathVariable("id") Long id) {

        var tarefa = tarefas.findById(id).orElseThrow(IllegalArgumentException::new);

        tarefa.setFeita(true);

        return tarefas.save(tarefa);
    }
    
    @PatchMapping(path = "tarefa/{id}/marcar-como-pendente", produces = MediaType.APPLICATION_JSON_VALUE)
    public Tarefa marcarComoPendente(@PathVariable("id") Long id) {

        var tarefa = tarefas.findById(id).orElseThrow(IllegalArgumentException::new);

        tarefa.setFeita(false);

        return tarefas.save(tarefa);
    }

    @PostMapping(path = "/tarefa", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Tarefa salvar(@RequestBody Tarefa tarefa) {
        return tarefas.save(tarefa);

    }
}
