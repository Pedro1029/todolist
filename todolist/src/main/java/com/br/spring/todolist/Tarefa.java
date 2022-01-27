package com.br.spring.todolist.tarefa;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tarefas")
public class Tarefa implements Serializable {

    @Id
    @Column
    @SequenceGenerator(name = "seq_tarefa",
            sequenceName = "seq_tarefa",
            allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "seq_tarefa")
    private Long id;
    
    @Column
    private String titulo;
    
    @Column
    private Boolean feita = false;
    
    @Column(name = "id_projeto")
    private Integer projetos;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Boolean getFeita() {
        return feita;
    }

    public void setFeita(Boolean feita) {
        this.feita = feita;
    }

    public Integer getProjeto() {
        return projetos;
    }

    public void setProjeto(Integer projeto) {
        this.projetos = projeto;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 97 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Tarefa other = (Tarefa) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

}
