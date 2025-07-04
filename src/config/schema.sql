CREATE TABLE paciente (
    paciente_id INT PRIMARY KEY AUTO_INCREMENT,
    nome_completo VARCHAR(255) NOT NULL,
    data_nascimento DATE,
    genero VARCHAR(50),
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(255),
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    historico_medico TEXT
);

CREATE TABLE profissional (
    profissional_id INT PRIMARY KEY AUTO_INCREMENT,
    nome_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    data_nascimento DATE,
    data_admissao DATE,
    telefone VARCHAR(20),
    genero VARCHAR(50),
    especialidade VARCHAR(100),
    endereco VARCHAR(255),
    biografia TEXT
);

CREATE TABLE agendamento (
    agendamento_id INT PRIMARY KEY AUTO_INCREMENT,
	paciente_id INT NOT NULL,
    profissional_id INT NOT NULL,
    data_agendamento DATE NOT NULL,
    hora_agendamento TIME NOT NULL,
    tipo_agendamento ENUM('Consulta', 'Exame', 'Cirurgia', 'Retorno', 'Outro') NOT NULL,
    observacoes TEXT,
    FOREIGN KEY (paciente_id) REFERENCES paciente(paciente_id),
    FOREIGN KEY (profissional_id) REFERENCES profissional(profissional_id)
); 