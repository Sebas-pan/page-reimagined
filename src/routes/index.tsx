import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Notificación de Nueva Plaga — SIGSVE SENASA" },
      {
        name: "description",
        content:
          "Formulario en línea del SENASA para notificar la ocurrencia de una nueva plaga en cultivos o almacenes del Perú.",
      },
      { property: "og:title", content: "Notificación de Nueva Plaga — SIGSVE SENASA" },
      {
        property: "og:description",
        content:
          "Registre datos del notificante, contacto, ubicación y descripción del problema fitosanitario.",
      },
    ],
  }),
  component: Index,
});

const DEPARTAMENTOS = ["Amazonas", "Áncash", "Arequipa", "Cusco", "Junín", "La Libertad", "Lima", "Piura", "San Martín"];
const TIPO_DOC = ["DNI", "Carné de extranjería", "Pasaporte", "RUC"];
const ORGANOS = ["Hoja", "Tallo", "Raíz", "Fruto", "Flor", "Semilla", "Planta completa"];

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span
      className={`text-[13px] ${required ? "text-field-required" : "text-foreground"}`}
    >
      {children}
    </span>
  );
}

function Index() {
  const [tab, setTab] = useState<1 | 2>(1);
  const [lugar, setLugar] = useState("campo");

  return (
    <main className="min-h-screen bg-background py-6">
      <div className="mx-auto max-w-4xl border border-legacy-border bg-panel shadow-sm">
        {/* Cabecera institucional */}
        <header className="flex items-center gap-4 border-b-2 border-senasa-red px-5 py-4">
          <div className="flex items-center gap-2 border border-legacy-border px-3 py-2">
            <span className="text-[11px] font-bold tracking-tight text-senasa-red">PERÚ</span>
            <span className="border-l border-legacy-border pl-2 text-[9px] leading-tight text-muted-foreground">
              Ministerio
              <br />
              de Desarrollo Agrario
              <br />y Riego
            </span>
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-senasa-blue">
              Ministerio de Agricultura
              <br />
              Servicio Nacional de Sanidad Agraria - SENASA
            </h1>
            <p className="mt-2 text-[14px] font-bold text-senasa-red">
              Sistema Integrado de Gestión de Sanidad Vegetal - SIGSVE
            </p>
          </div>
        </header>

        <div className="px-4 pb-4">
          <div className="mt-3 bg-panel-header px-3 py-1.5 text-[12px] font-bold text-senasa-blue">
            NOTIFICACIÓN DE OCURRENCIA DE NUEVA PLAGA
          </div>

          {/* Pestañas */}
          <div className="mt-2 flex gap-1 border-b border-legacy-border">
            {([1, 2] as const).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setTab(n)}
                className={`-mb-px border border-legacy-border px-3 py-1.5 text-[12px] ${
                  tab === n
                    ? "border-b-tab-active bg-tab-active font-bold text-foreground"
                    : "bg-tab-inactive text-muted-foreground"
                }`}
              >
                Datos generales {n === 1 ? "I" : "II"}
              </button>
            ))}
          </div>

          <form
            className="border border-t-0 border-legacy-border bg-tab-active p-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {tab === 1 ? (
              <div className="space-y-5">
                <p className="text-[12.5px] leading-relaxed">
                  Estimado usuario, usted puede notificar al SENASA sobre cualquier problema
                  fitosanitario nuevo que se presente en su cultivo o almacén. Para ello deberá
                  llenar los siguientes ítems, enviarlos y el SENASA se contactará con usted.
                </p>

                <fieldset className="legacy-fieldset">
                  <legend className="px-1 text-[12px] text-senasa-blue">Datos del notificante</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-right">
                        <Label required>Nombres:</Label>
                      </div>
                      <input className="legacy-input-required flex-1" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-right">
                        <Label required>Tipo Doc.:</Label>
                      </div>
                      <select className="legacy-input flex-1" defaultValue="">
                        <option value="">Seleccione...</option>
                        {TIPO_DOC.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-right">
                        <Label required>Apellidos:</Label>
                      </div>
                      <input className="legacy-input-required flex-1" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-right">
                        <Label required>N° Doc.:</Label>
                      </div>
                      <input className="legacy-input flex-1" />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="legacy-fieldset">
                  <legend className="px-1 text-[12px] text-senasa-blue">
                    Datos de contacto - Llenar al menos un ítem
                  </legend>
                  <div className="flex gap-2">
                    <div className="w-24 pt-1 text-right">
                      <Label>Dirección:</Label>
                    </div>
                    <textarea rows={4} className="legacy-input flex-1 resize-none" />
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-right">
                        <Label>Teléfono:</Label>
                      </div>
                      <input className="legacy-input flex-1" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-28 text-right">
                        <Label>Correo elect.:</Label>
                      </div>
                      <input type="email" className="legacy-input flex-1" />
                    </div>
                  </div>
                  <p className="mt-3 text-[12.5px]">
                    Ingresar correo electrónico para un mejor seguimiento de su notificación.
                  </p>
                </fieldset>

                <fieldset className="legacy-fieldset">
                  <legend className="px-1 text-[12px] text-senasa-blue">
                    Ubicación de la zona de ocurrencia de la plaga
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-right">
                        <Label required>Departamento:</Label>
                      </div>
                      <select className="legacy-input flex-1" defaultValue="">
                        <option value="">Seleccione...</option>
                        {DEPARTAMENTOS.map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-right">
                        <Label required>Distrito:</Label>
                      </div>
                      <select className="legacy-input flex-1" defaultValue="">
                        <option value="">Seleccione...</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-right">
                        <Label required>Provincia:</Label>
                      </div>
                      <select className="legacy-input flex-1" defaultValue="">
                        <option value="">Seleccione...</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-right">
                        <Label>C. poblado:</Label>
                      </div>
                      <input className="legacy-input flex-1" placeholder="Seleccione..." />
                      <button type="button" className="legacy-input px-2" aria-label="Buscar centro poblado">
                        🔍
                      </button>
                      <button type="button" className="legacy-input px-2" aria-label="Limpiar centro poblado">
                        ✕
                      </button>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <div className="w-24 text-right">
                        <Label>Referencia:</Label>
                      </div>
                      <input className="legacy-input flex-1" />
                    </div>
                  </div>
                </fieldset>

                <div className="flex items-center gap-3 pl-6">
                  <Label>Número de archivos adjuntos:</Label>
                  <input readOnly value={0} className="legacy-input w-16 text-center" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-6 pl-4">
                  <Label>Problema fitosanitario observado en:</Label>
                  {["campo", "almacen"].map((v) => (
                    <label key={v} className="flex items-center gap-2 text-[13px]">
                      <input
                        type="radio"
                        name="lugar"
                        checked={lugar === v}
                        onChange={() => setLugar(v)}
                      />
                      {v === "campo" ? "Campo" : "Almacén"}
                    </label>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <div className="w-32 text-right">
                      <Label required>Esp. veg. afectada:</Label>
                    </div>
                    <input className="legacy-input-required flex-1" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 text-right">
                      <Label required>Órgano afectado:</Label>
                    </div>
                    <select className="legacy-input-required flex-1" defaultValue="">
                      <option value="">Seleccione...</option>
                      {ORGANOS.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 text-right">
                      <Label>Área sembrada (ha):</Label>
                    </div>
                    <input className="legacy-input flex-1" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 text-right">
                      <Label>Peso:</Label>
                    </div>
                    <select className="legacy-input w-24" defaultValue="">
                      <option value="">Selecc.</option>
                      <option>kg</option>
                      <option>t</option>
                    </select>
                    <input className="legacy-input flex-1" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 text-right">
                      <Label>Área afectada:</Label>
                    </div>
                    <select className="legacy-input w-28" defaultValue="">
                      <option value="">Seleccione.</option>
                      <option>ha</option>
                      <option>m²</option>
                    </select>
                    <input className="legacy-input w-28" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-32 pt-1 text-right">
                    <Label required>Descripción del problema:</Label>
                  </div>
                  <textarea rows={12} className="legacy-input flex-1 resize-none" />
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-32 text-right">
                    <Label>Fecha notificación:</Label>
                  </div>
                  <input readOnly value="17/07/2025" className="legacy-input w-32" />
                </div>
              </div>
            )}

            {/* Barra de acciones */}
            <div className="mt-6 flex items-center justify-between border-t border-legacy-border pt-2 text-[12.5px]">
              <div className="flex gap-5">
                <button type="button" className="text-senasa-blue hover:underline">
                  📄 Vista previa
                </button>
                <button type="button" className="text-senasa-blue hover:underline">
                  📎 Adjuntar imagen
                </button>
              </div>
              <button type="submit" className="text-senasa-blue hover:underline">
                💾 Enviar
              </button>
            </div>
          </form>
        </div>

        <footer className="border-t border-legacy-border px-4 py-4 text-center text-[11px] text-muted-foreground">
          <p className="font-semibold tracking-widest text-senasa-red">REPÚBLICA DEL PERÚ</p>
          <p className="mt-2">Copyright (c) 2009</p>
          <p>Sede Central A. La Molina N°1915 - Lima 12 - La Molina, Lima-Perú</p>
          <p>Central Telefónica: (51)-(1)-313 3300 Fax: (51)-(1)-340 1486</p>
        </footer>
      </div>
    </main>
  );
}
