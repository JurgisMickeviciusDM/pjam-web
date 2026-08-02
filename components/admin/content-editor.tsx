"use client";

import { useActionState } from "react";
import { Loader2, Check, AlertCircle, Save } from "lucide-react";
import { contentSchema, type ContentMap } from "@/lib/content";
import { saveContent, type SaveState } from "@/lib/actions/content";

const inputClass =
  "w-full rounded-lg border border-ink/15 bg-cream px-3 py-2 font-body text-sm text-ink outline-none transition-colors focus:border-olive focus:ring-2 focus:ring-olive/15";

export function ContentEditor({ content }: { content: ContentMap }) {
  const [state, formAction, pending] = useActionState<
    SaveState | undefined,
    FormData
  >(saveContent, undefined);

  return (
    <form action={formAction}>
      {/* Sticky action bar */}
      <div className="sticky top-0 z-10 -mx-6 mb-8 flex items-center justify-between border-b border-ink/10 bg-cream/95 px-6 py-4 backdrop-blur md:-mx-10 md:px-10">
        <div className="text-sm">
          {state?.ok && (
            <span className="inline-flex items-center gap-1.5 text-green-700">
              <Check className="h-4 w-4" /> Saved
            </span>
          )}
          {state?.error && (
            <span className="inline-flex items-center gap-1.5 text-red-600">
              <AlertCircle className="h-4 w-4" /> {state.error}
            </span>
          )}
          {!state && (
            <span className="text-muted">
              Edit any field, then save. Blank changes revert to the default.
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-olive disabled:opacity-60"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save changes
        </button>
      </div>

      <div className="space-y-10">
        {contentSchema.map((section) => (
          <section key={section.id}>
            <h2 className="font-display text-lg font-bold tracking-tight text-ink">
              {section.title}
            </h2>
            <div className="mt-4 grid gap-5 rounded-2xl border border-ink/10 bg-sand p-6 md:grid-cols-2">
              {section.fields.map((field) => (
                <div
                  key={field.key}
                  className={field.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <label
                    htmlFor={field.key}
                    className="mb-1.5 block text-xs font-semibold text-olive"
                  >
                    {field.label}
                    <span className="ml-2 font-normal text-muted/70">
                      {field.key}
                    </span>
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.key}
                      name={field.key}
                      rows={4}
                      defaultValue={content[field.key]}
                      className={`${inputClass} resize-y`}
                    />
                  ) : (
                    <input
                      id={field.key}
                      name={field.key}
                      type="text"
                      defaultValue={content[field.key]}
                      className={inputClass}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </form>
  );
}
