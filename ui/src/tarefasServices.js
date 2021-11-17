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