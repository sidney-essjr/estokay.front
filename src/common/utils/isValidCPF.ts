export default function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, ""); // Remove qualquer caractere não numérico

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false; // Verifica se o CPF tem 11 dígitos e se não é uma sequência de números repetidos
  }

  let sum;
  let remainder;

  // Valida o primeiro dígito verificador
  sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  // Valida o segundo dígito verificador
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}
