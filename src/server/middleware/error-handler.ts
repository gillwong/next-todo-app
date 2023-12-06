import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

import { isPostgrestError } from "@/utils/utils";

import { InvalidParamsError } from "./todo-middlewares";

const errorPrefix = "[SERVER]";

export default function todoErrorHandler(error: unknown) {
  let msg: string = `Unknown error: ${(error as Error).message}`;

  if (isPostgrestError(error as Error)) {
    msg = "Failed to operate on database";
  } else if (error instanceof ZodError) {
    const validationError = fromZodError(error);
    msg = `Data from database has invalid shape. ${validationError}`;
  } else if (error instanceof InvalidParamsError) {
    msg = `${error.invalidParams}: ${error.message}`;
  } else if (error instanceof Error) {
    if (error.message === "data not found") {
      msg = "Data not found in database";
    } else if (error.message === "expected 1 data, but got 2") {
      msg = "Multiple data with the same id found in database";
    }
  }

  return NextResponse.json({ error: `${errorPrefix} ${msg}` }, { status: 500 });
}
