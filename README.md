# Personagens

Projeto simples para aprender a integrar `Flask`, `React` e banco de dados.

## Como executar

Para executar essa brincadeira é pouco um complicado, mas vamos lá. Primeiro, é preciso ter o Python e o NodeJS instalados.

> [!NOTE]
> O projeto, por mais que use React, usa um único servidor, o do Flask.

1. Instale todas as dependências

    - `client/`

        ```powershell
        npm install
        ```

    - `server/`

        ```powershell
        python -m venv .venv # Ambiente virtual
        .\.venv\Scripts\activate
        pip install -r requirements.txt
        ```

2. Dentro de `client/` é preciso gerar o `build`

    ```powershell
    npm run build
    ```

3. Na raiz do projeto, execute o *script*

    ```powershell
    python server/app.py
    ```

> [!IMPORTANT]
> A execução do [*script*](#como-executar) deve ser realizada na raiz do projeto, assim o diretório `instance/`, onde é armazenado o arquivo do banco de dados, é criado na raiz do projeto, não em outros lugar.

Se tudo ocorrer bem, a aplicação está rodando em [`http://localhost:5000`](http://localhost:5000)
