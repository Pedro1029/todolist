package com.br.spring.todolist.projeto;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Projetos extends JpaRepository<Projeto, Long>{
    
    List<Projeto> findAll();
    
    
}
