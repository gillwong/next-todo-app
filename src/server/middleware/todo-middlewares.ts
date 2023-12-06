export class InvalidParamsError extends Error {
  constructor(message: string, invalidParams: string | string[]) {
    super(message);
    this.name = "InvalidParamsError";
    this.invalidParams = invalidParams;
  }
  invalidParams: string | string[];
}

export function getIdParam(params: { id: string }) {
  const id = parseInt(params.id);
  if (isNaN(id)) throw new InvalidParamsError(`${id} is not a number`, "id");
  return id;
}
