# Sistema de Gerenciamento Hospitalar (HMS) - Simulação

Este projeto é uma **simulação** de um Sistema de Gerenciamento Hospitalar (HMS), desenvolvido com o objetivo de demonstrar a implementação de funcionalidades básicas para gerenciar pacientes, profissionais e agendamentos em um ambiente hospitalar fictício.

## Como Iniciar o Projeto

Siga os passos abaixo para configurar e executar o projeto em sua máquina local:

### Pré-requisitos

Certifique-se de ter o seguinte software instalado em seu ambiente:

*   **Node.js**: Recomenda-se a versão LTS mais recente.
*   **npm** (Node Package Manager): Geralmente vem junto com o Node.js.
*   **MySQL**: Um servidor de banco de dados MySQL para armazenar os dados.

### Configuração do Banco de Dados

1.  **Crie um banco de dados MySQL**: 
    Crie um novo banco de dados no seu servidor MySQL. Você pode chamá-lo de `hms_db` ou qualquer outro nome de sua preferência.

2.  **Execute o script SQL**: 
    O projeto inclui um script de esquema do banco de dados em `src/config/schema.sql`. Execute este script no seu banco de dados recém-criado para configurar as tabelas necessárias:

    ```sql
    -- Conteúdo de src/config/schema.sql
    -- Exemplo:
    -- CREATE TABLE pacientes (
    --     paciente_id INT AUTO_INCREMENT PRIMARY KEY,
    --     nomeCompleto VARCHAR(255) NOT NULL,
    --     ...
    -- );
    -- CREATE TABLE profissionais (
    --     profissional_id INT AUTO_INCREMENT PRIMARY KEY,
    --     nomeCompleto VARCHAR(255) NOT NULL,
    --     ...
    -- );
    -- CREATE TABLE agendamento (
    --     agendamento_id INT AUTO_INCREMENT PRIMARY KEY,
    --     paciente_id INT,
    --     profissional_id INT,
    --     data_agendamento DATE,
    --     hora_agendamento TIME,
    --     tipo_agendamento VARCHAR(255),
    --     observacoes TEXT,
    --     FOREIGN KEY (paciente_id) REFERENCES pacientes(paciente_id),
    --     FOREIGN KEY (profissional_id) REFERENCES profissionais(profissional_id)
    -- );
    ```

3.  **Configure as credenciais do banco de dados**: 
    Edite o arquivo `src/config/DBconfig.js` para adicionar suas credenciais de conexão com o banco de dados MySQL:

    ```javascript
    // Exemplo de src/config/DBconfig.js
    const mysql = require('mysql');

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'seu_usuario_mysql', // Seu usuário do MySQL
        password: 'sua_senha_mysql', // Sua senha do MySQL
        database: 'hms_db' // Nome do banco de dados que você criou
    });

    connection.connect(err => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            return;
        }
        console.log('Conectado ao banco de dados MySQL!');
    });

    module.exports = connection;
    ```

    **Importante**: Substitua `seu_usuario_mysql` e `sua_senha_mysql` pelas suas credenciais reais.

### Instalação das Dependências

No terminal, navegue até o diretório raiz do projeto e execute o comando para instalar as dependências:

```bash
npm install
```

### Execução do Servidor

Após instalar as dependências e configurar o banco de dados, você pode iniciar o servidor. No terminal, a partir do diretório raiz do projeto, execute:

```bash
node server.js
```

O servidor será iniciado e você poderá acessá-lo através do seu navegador, geralmente em `http://localhost:3000` (ou a porta configurada no seu `server.js`).

## Funcionalidades Principais

O sistema permite as seguintes operações (simuladas):

*   **Pacientes**: Adicionar, visualizar, editar e deletar informações de pacientes.
*   **Profissionais**: Adicionar, visualizar, editar e deletar informações de profissionais de saúde.
*   **Agendamentos**: Agendar consultas/procedimentos, visualizar, editar e deletar agendamentos existentes.

**Observação**: Este projeto foca na demonstração das interações entre o frontend e um backend básico, utilizando MySQL para persistência de dados. A interface do usuário é construída com Tailwind CSS para facilitar a prototipagem e estilização. 