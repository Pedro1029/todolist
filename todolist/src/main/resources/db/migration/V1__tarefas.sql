create table tarefas(
    id integer not null primary key,
    titulo text not null,
    feita boolean not null default false
);