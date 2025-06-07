// Script para adicionar pacientes à tabela

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-paciente');
  const listaPacientes = document.getElementById('lista-pacientes');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const nascimento = document.getElementById('nascimento').value;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="py-2 px-4">${nome}</td>
      <td class="py-2 px-4">${cpf}</td>
      <td class="py-2 px-4">${nascimento}</td>
    `;
    listaPacientes.appendChild(tr);

    form.reset();
  });
}); 