export function salvar(tarefa) {
    const headers = new Headers({
        "Content-Type": "application/json",
    });
    const request = {
        method: 'POST',
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(tarefa)
    };
    return fetch(`http://localhost:8080/tarefa`, request).then(response => response.json());
}

export function findAllPendentes(){
    const headers = new Headers({
        "Content-Type": "application/json",
    });
    const request = {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default',
    };
    return fetch('http://localhost:8080/tarefas/pendente', request).then(response => response.json());
}

export function findAllFeitas() {
    const headers = new Headers({
        "Content-Type": "application/json",
    });
    const request = {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default',
    };
    return fetch('http://localhost:8080/tarefas/feita', request).then(response => response.json());
}

export function marcarComoFeita(tarefa) {
    const headers = new Headers({
        "Content-Type": "application/json",
    });
    const request = {
        method: 'PATCH',
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(tarefa)
    };
    return fetch(`http://localhost:8080/tarefa/${tarefa.id}/marcar-como-feita`, request).then(response => response.json());
}

export function marcarComoPendente(tarefa) {
    const headers = new Headers({
        "Content-Type": "application/json",
    });
    const request = {
        method: 'PATCH',
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(tarefa)
    };
    return fetch(`http://localhost:8080/tarefa/${tarefa.id}/marcar-como-pendente`, request).then(response => response.json());
}