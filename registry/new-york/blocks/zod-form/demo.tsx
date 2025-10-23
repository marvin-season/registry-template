"use client";

import { ZodForm } from "@/registry/new-york/blocks/zod-form/zod-form";
import {
  ZodFormFooter,
  ZodFormReset,
  ZodFormSubmit,
} from "./default-components";
import { z } from "zod";

export const App = () => {
  return (
    <div>
      <ZodForm
        schema={z.object({
          name: z.string().min(1),
          email: z.email(),
          message: z.string().min(1),
        })}
        onSubmit={console.log}
      >
        <ZodFormFooter>
          <ZodFormSubmit>Submit</ZodFormSubmit>
          <ZodFormReset variant={"destructive"}>Reset</ZodFormReset>
        </ZodFormFooter>
      </ZodForm>
    </div>
  );
};
