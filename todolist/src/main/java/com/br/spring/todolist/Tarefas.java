package com.br.spring.todolist;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface Tarefas extends JpaRepository<Tarefa, Long>{
    
    List<Tarefa> findAllByFeita(@Param("feitas")boolean feita);
    
    
}
