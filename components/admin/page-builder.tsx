"use client";

import { useRef, useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import {
  GripVertical,
  Eye,
  EyeOff,
  ChevronDown,
  Save,
  Loader2,
  Check,
  AlertCircle,
  RotateCcw,
  Monitor,
} from "lucide-react";
import { contentSchema, type ContentMap, type ContentSection } from "@/lib/content";
import { HOME_BLOCK_META, type LayoutBlock } from "@/lib/home-blocks";
import { saveHomePage, type SaveHomeState } from "@/lib/actions/layout";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-lg border border-ink/15 bg-cream px-3 py-2 font-body text-sm text-ink outline-none transition-colors focus:border-olive focus:ring-2 focus:ring-olive/15";

const sectionById = new Map<string, ContentSection>(
  contentSchema.map((s) => [s.id, s]),
);

/** Content keys the builder is responsible for (every home block field). */
const HOME_KEYS: string[] = HOME_BLOCK_META.flatMap(
  (b) => sectionById.get(b.schemaId)?.fields.map((f) => f.key) ?? [],
);

export function PageBuilder({
  content,
  initialLayout,
}: {
  content: ContentMap;
  initialLayout: LayoutBlock[];
}) {
  // Order is tracked as a list of block ids; visibility + text are separate
  // maps so dragging never churns the objects Reorder identifies items by.
  const [order, setOrder] = useState<string[]>(() =>
    initialLayout.map((b) => b.blockId),
  );
  const [hidden, setHidden] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(initialLayout.map((b) => [b.blockId, b.hidden])),
  );
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(HOME_KEYS.map((k) => [k, content[k] ?? ""])),
  );
  const [expanded, setExpanded] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState<SaveHomeState | undefined>();
  const [pending, setPending] = useState(false);

  const previewRef = useRef<HTMLIFrameElement>(null);

  const markDirty = () => {
    setDirty(true);
    setSaved(undefined);
  };

  const setValue = (key: string, v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    markDirty();
  };

  const toggleHidden = (id: string) => {
    setHidden((prev) => ({ ...prev, [id]: !prev[id] }));
    markDirty();
  };

  const onReorder = (next: string[]) => {
    setOrder(next);
    markDirty();
  };

  async function handleSave() {
    setPending(true);
    const blocks: LayoutBlock[] = order.map((id) => ({
      blockId: id,
      hidden: Boolean(hidden[id]),
    }));
    const result = await saveHomePage(undefined, { blocks, content: values });
    setSaved(result);
    setPending(false);
    if (result.ok) {
      setDirty(false);
      // Reload the preview so the published change shows.
      if (previewRef.current) {
        // eslint-disable-next-line no-self-assign
        previewRef.current.src = previewRef.current.src;
      }
    }
  }

  return (
    <div>
      {/* Sticky action bar */}
      <div className="sticky top-0 z-10 -mx-6 mb-6 flex items-center justify-between gap-4 border-b border-ink/10 bg-cream/95 px-6 py-4 backdrop-blur md:-mx-10 md:px-10">
        <div className="text-sm">
          {pending ? (
            <span className="inline-flex items-center gap-1.5 text-muted">
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </span>
          ) : saved?.ok ? (
            <span className="inline-flex items-center gap-1.5 text-green-700">
              <Check className="h-4 w-4" /> Published
            </span>
          ) : saved?.error ? (
            <span className="inline-flex items-center gap-1.5 text-red-600">
              <AlertCircle className="h-4 w-4" /> {saved.error}
            </span>
          ) : dirty ? (
            <span className="text-muted">Unsaved changes</span>
          ) : (
            <span className="text-muted">
              Drag to reorder, toggle the eye to hide, expand to edit text.
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={pending || !dirty}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-olive disabled:opacity-50"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Publish changes
        </button>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_minmax(360px,520px)]">
        {/* Block list */}
        <div>
          <Reorder.Group
            axis="y"
            values={order}
            onReorder={onReorder}
            className="space-y-3"
          >
            {order.map((id) => (
              <BlockRow
                key={id}
                id={id}
                hidden={Boolean(hidden[id])}
                expanded={expanded === id}
                section={sectionById.get(
                  HOME_BLOCK_META.find((b) => b.id === id)!.schemaId,
                )}
                values={values}
                onToggleHidden={() => toggleHidden(id)}
                onToggleExpand={() =>
                  setExpanded((cur) => (cur === id ? null : id))
                }
                onChange={setValue}
              />
            ))}
          </Reorder.Group>
        </div>

        {/* Live preview */}
        <div className="xl:sticky xl:top-24 xl:self-start">
          <div className="mb-2 flex items-center justify-between text-xs text-muted">
            <span className="inline-flex items-center gap-1.5 font-medium text-olive">
              <Monitor className="h-3.5 w-3.5" /> Live preview
            </span>
            <button
              type="button"
              onClick={() => {
                if (previewRef.current)
                  // eslint-disable-next-line no-self-assign
                  previewRef.current.src = previewRef.current.src;
              }}
              className="inline-flex items-center gap-1 hover:text-ink"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Refresh
            </button>
          </div>
          <div className="overflow-hidden rounded-2xl border border-ink/15 bg-noir">
            <iframe
              ref={previewRef}
              src="/"
              title="Home page preview"
              className="h-[560px] w-full"
            />
          </div>
          <p className="mt-2 text-xs text-muted">
            The preview shows the published site. It refreshes after you publish.
          </p>
        </div>
      </div>
    </div>
  );
}

function BlockRow({
  id,
  hidden,
  expanded,
  section,
  values,
  onToggleHidden,
  onToggleExpand,
  onChange,
}: {
  id: string;
  hidden: boolean;
  expanded: boolean;
  section?: ContentSection;
  values: Record<string, string>;
  onToggleHidden: () => void;
  onToggleExpand: () => void;
  onChange: (key: string, value: string) => void;
}) {
  const controls = useDragControls();
  const meta = HOME_BLOCK_META.find((b) => b.id === id)!;

  return (
    <Reorder.Item
      value={id}
      dragListener={false}
      dragControls={controls}
      className={cn(
        "rounded-2xl border border-ink/10 bg-sand",
        hidden && "opacity-60",
      )}
    >
      <div className="flex items-center gap-3 p-4">
        <button
          type="button"
          aria-label="Drag to reorder"
          onPointerDown={(e) => controls.start(e)}
          className="cursor-grab touch-none text-muted/70 transition-colors hover:text-ink active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={onToggleExpand}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
        >
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-bold tracking-tight text-ink">
              {meta.title}
              {hidden && (
                <span className="ml-2 align-middle text-[0.65rem] font-semibold uppercase tracking-wide text-muted">
                  Hidden
                </span>
              )}
            </span>
            <span className="block truncate text-xs text-muted">
              {meta.hint}
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={onToggleHidden}
          aria-label={hidden ? "Show block" : "Hide block"}
          title={hidden ? "Show on site" : "Hide from site"}
          className="rounded-lg p-2 text-olive/70 transition-colors hover:bg-ink/5 hover:text-ink"
        >
          {hidden ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>

        <button
          type="button"
          onClick={onToggleExpand}
          aria-label="Edit text"
          className="rounded-lg p-2 text-olive/70 transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              expanded && "rotate-180",
            )}
          />
        </button>
      </div>

      {expanded && section && (
        <div className="grid gap-4 border-t border-ink/10 p-5 md:grid-cols-2">
          {section.fields.map((field) => (
            <div
              key={field.key}
              className={field.type === "textarea" ? "md:col-span-2" : ""}
            >
              <label
                htmlFor={`pb-${field.key}`}
                className="mb-1.5 block text-xs font-semibold text-olive"
              >
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={`pb-${field.key}`}
                  rows={4}
                  value={values[field.key] ?? ""}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  className={`${inputClass} resize-y`}
                />
              ) : (
                <input
                  id={`pb-${field.key}`}
                  type="text"
                  value={values[field.key] ?? ""}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  className={inputClass}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </Reorder.Item>
  );
}
