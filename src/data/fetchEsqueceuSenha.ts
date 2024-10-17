import { FormEsqueceuSenhaField } from "../common/validations/formEsqueceuSenhaValidationSchema";

export async function postEsqueceuSenha(data: FormEsqueceuSenhaField) {
  try {
    await fetch(`${import.meta.env.VITE_BASE_URL}/auth/esqueceu-senha`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return {
      result: true,
      message: "E-mail enviado com sucesso!\n Acesse sua caixa de e-mail para mais informações.",
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Failed to fetch") {
        return {
          result: false,
          message:
            "Não foi possível conectar ao servidor. Verifique sua conexão com a internet ou tente novamente mais tarde.",
        };
      }

      return {
        result: false,
        message: error.message,
      };
    }

    return {
      result: false,
      message:
        "Tivemos um problema para completar sua solicitação, estamos verificando a situação!",
    };
  }
}
