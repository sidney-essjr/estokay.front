export async function responseHandler(res: Response, message?: string) {
  if (res.ok) {
    return { result: true, message: message ?? "" };
  } else {
    const errorData = await res.json();
    return {
      result: false,
      message:
        errorData.message ||
        "Tivemos um problema para completar sua solicitação, estamos verificando a situação!",
    };
  }
}
