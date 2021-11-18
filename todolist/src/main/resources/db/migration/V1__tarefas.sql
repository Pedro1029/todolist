create table projetos(
    id integer not null primary key,
    titulo text not null
);
create table tarefas(
    id integer not null primary key,
    titulo text not null,
    feita boolean not null default false,
    id_projeto integer,
    constraint fk_tarefas_projeto foreign key (id_projeto) references projetos (id)
);