create table usuarios(
    id integer not null primary key,
    nome text not null,
    email text,
    cep integer,
    endereco text,
    numero text,
    bairro text,
    cidade text,
    estado text
);

create table projetos(
    id integer not null primary key,
    titulo text not null,
    id_usuario integer not null,
    constraint fk_projetos_usuarios foreign key (id_usuario) references usuarios (id)
);

create table tarefas(
    id integer not null primary key,
    titulo text not null,
    feita boolean not null default false,
    id_projeto integer,
    id_usuario integer not null,
    constraint fk_tarefas_usuarios foreign key (id_usuario) references usuarios (id),
    constraint fk_tarefas_projetos foreign key (id_projeto) references projetos (id)
);

