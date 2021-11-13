create table tarefas(
    id integer not null primary key,
    titulo text not null,
    feito boolean not null default false
);