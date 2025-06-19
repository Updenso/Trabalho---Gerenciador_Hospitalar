import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'gestHospitalar'
});

connection.connect(error => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error.stack);
    return;
  }
  console.log('Conexão com o banco de dados MySQL estabelecida com sucesso! ID da conexão:', connection.threadId);
});

export default connection; 