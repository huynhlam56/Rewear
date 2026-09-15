"use server";

import { redirect } from "next/navigation";
import { triggerLocalTestRun } from "@/lib/services/test-runs";

export async function triggerTestRunAction(formData: FormData) {
  const selectedTestIds = formData.getAll("tests").map(String);
  if (selectedTestIds.length === 0) {
    redirect(`/admin?error=${encodeURIComponent("Select at least one test to run.")}`);
  }

  const run = await triggerLocalTestRun(selectedTestIds);
  redirect(`/admin/runs/${run.id}`);
}
