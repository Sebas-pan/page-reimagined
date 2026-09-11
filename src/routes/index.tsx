import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { DEPARTAMENTOS, getDistritos, getProvincias, CENTROS_POBLADOS } from "@/data/ubigeo";
import {
  consumeSenasaImageFragment,
  parseSenasaImageFragment,
  senasaDataUrlToFile,
} from "@/lib/senasa-prefill";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

type SenasaSearch = {
  nombre?: string | undefined;
  apellido?: string | undefined;
  tipoDoc?: string | undefined;
  nroDoc?: string | undefined;
  direccion?: string | undefined;
  telefono?: string | undefined;
  correo?: string | undefined;
  departamento?: string | undefined;
  provincia?: string | undefined;
  distrito?: string | undefined;
  centroPoblado?: string | undefined;
  referencia?: string | undefined;
  especie?: string | undefined;
  organo?: string | undefined;
  areaSembrada?: string | undefined;
  pesoUnidad?: string | undefined;
  pesoValor?: string | undefined;
  areaUnidad?: string | undefined;
  areaValor?: string | undefined;
  descripcion?: string | undefined;
  lugar?: string | undefined;
  tab?: string | undefined;
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): SenasaSearch => {
    // TanStack Router coerces numeric query values (?nroDoc=12345678) to
    // numbers, while the form state is all strings — coerce back instead of
    // dropping them (the classic int/str schema mismatch).
    const str = (v: unknown) =>
      typeof v === "string" ? v : typeof v === "number" ? String(v) : undefined;
    return {
      nombre: str(search["nombre"]),
      apellido: str(search["apellido"]),
      tipoDoc: str(search["tipoDoc"]),
      nroDoc: str(search["nroDoc"]),
      direccion: str(search["direccion"]),
      telefono: str(search["telefono"]),
      correo: str(search["correo"]),
      departamento: str(search["departamento"]),
      provincia: str(search["provincia"]),
      distrito: str(search["distrito"]),
      centroPoblado: str(search["centroPoblado"]),
      referencia: str(search["referencia"]),
      especie: str(search["especie"]),
      organo: str(search["organo"]),
      areaSembrada: str(search["areaSembrada"]),
      pesoUnidad: str(search["pesoUnidad"]),
      pesoValor: str(search["pesoValor"]),
      areaUnidad: str(search["areaUnidad"]),
      areaValor: str(search["areaValor"]),
      descripcion: str(search["descripcion"]),
      lugar: str(search["lugar"]),
      tab: str(search["tab"]),
    };
  },
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
        content: "Registre datos del notificante, contacto, ubicación y descripción del problema fitosanitario.",
      },
    ],
  }),
  component: Index,
});

const TIPO_DOC = ["DNI", "Carné de extranjería", "Pasaporte", "RUC"];
const ORGANOS = ["Hoja", "Tallo", "Raíz", "Fruto", "Flor", "Semilla", "Planta completa"];

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return <span className={`text-[13px] ${required ? "text-field-required" : "text-foreground"}`}>{children}</span>;
}

function Index() {
  const todayStr = useMemo(() => new Date().toLocaleDateString("es-PE"), []);

  const [tab, setTab] = useState<1 | 2>(1);
  const [lugar, setLugar] = useState("campo");

  // Form fields
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [tipoDoc, setTipoDoc] = useState("");
  const [nroDoc, setNroDoc] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");
  const [centroPoblado, setCentroPoblado] = useState("");
  const [referencia, setReferencia] = useState("");
  const [especie, setEspecie] = useState("");
  const [organo, setOrgano] = useState("");
  const [areaSembrada, setAreaSembrada] = useState("");
  const [pesoUnidad, setPesoUnidad] = useState("");
  const [pesoValor, setPesoValor] = useState("");
  const [areaUnidad, setAreaUnidad] = useState("");
  const [areaValor, setAreaValor] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Prefill from SENASA redirect query params (server is a pure text-URL
  // formatter: nombre, especie, descripcion, ...). Runs once on mount.
  const search = Route.useSearch();
  useEffect(() => {
    if (search.nombre) setNombres(search.nombre);
    if (search.apellido) setApellidos(search.apellido);
    // Selects only accept known options: ignore unknown values instead of
    // leaving the select in a blank state the cascading effects would wipe.
    if (search.tipoDoc && (TIPO_DOC as readonly string[]).includes(search.tipoDoc)) {
      setTipoDoc(search.tipoDoc);
    }
    if (search.nroDoc) setNroDoc(search.nroDoc);
    if (search.direccion) setDireccion(search.direccion);
    if (search.telefono) setTelefono(search.telefono);
    if (search.correo) setCorreo(search.correo);
    const dep = search.departamento;
    if (dep && (DEPARTAMENTOS as readonly string[]).includes(dep)) {
      setDepartamento(dep);
      const prov = search.provincia;
      if (prov && getProvincias(dep).includes(prov)) {
        setProvincia(prov);
        const dist = search.distrito;
        if (dist && getDistritos(prov).includes(dist)) {
          setDistrito(dist);
        }
      }
    }
    if (search.centroPoblado) setCentroPoblado(search.centroPoblado);
    if (search.referencia) setReferencia(search.referencia);
    if (search.especie) {
      setEspecie(search.especie);
      setTab(2);
    }
    if (search.organo) setOrgano(search.organo);
    if (search.areaSembrada) setAreaSembrada(search.areaSembrada);
    if (search.pesoUnidad) setPesoUnidad(search.pesoUnidad);
    if (search.pesoValor) setPesoValor(search.pesoValor);
    if (search.areaUnidad) setAreaUnidad(search.areaUnidad);
    if (search.areaValor) setAreaValor(search.areaValor);
    if (search.descripcion) setDescripcion(search.descripcion);
    if (search.lugar === "campo" || search.lugar === "almacen") setLugar(search.lugar);
    if (search.tab === "1" || search.tab === "2") setTab(Number(search.tab) as 1 | 2);
    // Mount-once prefill: re-running would clobber user input.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // PoC image handoff: the Flutter app appends the detected photo as a data
  // URL inside the location fragment (#imagen=...). Fragments never touch the
  // server, so there is nothing to fetch and no storage involved. The image
  // is pre-attached as an editable entry (same as "Adjuntar imagen").
  useEffect(() => {
    const dataUrl = parseSenasaImageFragment(window.location.hash);
    if (!dataUrl) return;
    let cancelled = false;
    senasaDataUrlToFile(dataUrl).then((file) => {
      if (cancelled || !file) {
        if (!cancelled && dataUrl) toast.error("No se pudo cargar la imagen del avistamiento");
        return;
      }
      setFiles((prev) => [...prev, file]);
      setPreviews((prev) => [...prev, URL.createObjectURL(file)]);
      toast.success("Imagen del avistamiento pre-adjuntada");
      consumeSenasaImageFragment();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Cascading ubigeo
  const provinciasList = useMemo(() => (departamento ? getProvincias(departamento) : []), [departamento]);
  const distritosList = useMemo(() => (provincia ? getDistritos(provincia) : []), [provincia]);

  // Reset provincia/distrito when parent changes
  useEffect(() => {
    if (departamento && provinciasList.length && !provinciasList.includes(provincia)) {
      if (provincia !== "") setProvincia("");
    }
    if (!departamento && provincia) setProvincia("");
  }, [departamento, provinciasList, provincia]);

  useEffect(() => {
    if (provincia && distritosList.length && !distritosList.includes(distrito)) {
      if (distrito !== "") setDistrito("");
    }
    if (!provincia && distrito) setDistrito("");
  }, [provincia, distritosList, distrito]);

  // File handling
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [adjustIndex, setAdjustIndex] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (!selected.length) return;
    const valid: File[] = [];
    for (const f of selected) {
      if (!f.type.startsWith("image/")) {
        toast.error(`"${f.name}" no es una imagen`);
        continue;
      }
      if (f.size > 8 * 1024 * 1024) {
        toast.error(`"${f.name}" excede 8 MB`);
        continue;
      }
      valid.push(f);
    }
    if (!valid.length) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setFiles((prev) => [...prev, ...valid]);
    valid.forEach((f) => setPreviews((prev) => [...prev, URL.createObjectURL(f)]));
    toast.success(`${valid.length} imagen(es) adjuntada(s)`);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => {
      const url = prev[idx];
      if (url) URL.revokeObjectURL(url);
      return prev.filter((_, i) => i !== idx);
    });
    toast.info("Imagen eliminada");
  };

  useEffect(() => {
    return () => previews.forEach((u) => URL.revokeObjectURL(u));
  }, [previews]);

  const openAdjust = (idx: number) => {
    setAdjustIndex(idx);
    setZoom(100);
    setRotation(0);
    setImageDialogOpen(true);
  };

  const handleSearchCentro = () => {
    if (!centroPoblado.trim()) {
      const opts = distritosList.length ? getDistritos(provincia) : [];
      toast.info(
        opts.length ? `Distritos disponibles: ${opts.slice(0, 5).join(", ")}` : "Ingrese un centro poblado o seleccione distrito",
      );
      return;
    }
    const suggestions = CENTROS_POBLADOS[distrito] ?? CENTROS_POBLADOS[provincia] ?? [];
    if (suggestions.length) toast.success(`Sugerencias: ${suggestions.join(", ")}`);
    else toast.info(`Buscando "${centroPoblado}"... (demo sin backend)`);
  };

  const handleClearCentro = () => {
    setCentroPoblado("");
    toast.info("Centro poblado limpiado");
  };

  const handleEnviar = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];
    if (!nombres.trim()) errors.push("Nombres");
    if (!apellidos.trim()) errors.push("Apellidos");
    if (!tipoDoc) errors.push("Tipo Doc.");
    if (!nroDoc.trim()) errors.push("N° Doc.");
    if (!direccion.trim() && !telefono.trim() && !correo.trim()) errors.push("Al menos un dato de contacto (dirección/teléfono/correo)");
    if (!departamento) errors.push("Departamento");
    if (!provincia) errors.push("Provincia");
    if (!distrito) errors.push("Distrito");
    if (!especie.trim()) errors.push("Especie vegetal afectada");
    if (!organo) errors.push("Órgano afectado");
    if (!descripcion.trim()) errors.push("Descripción del problema");

    if (errors.length) {
      toast.error(`Complete los campos requeridos: ${errors.join(", ")}`);
      if (errors.some((er) => ["Especie vegetal afectada", "Órgano afectado", "Descripción del problema"].includes(er))) setTab(2);
      else setTab(1);
      return;
    }
    // Include file info in toast
    toast.success(`Notificación enviada correctamente (${files.length} adjunto(s)). El SENASA se contactará con usted.`);
    console.log("payload", {
      nombres,
      apellidos,
      tipoDoc,
      nroDoc,
      direccion,
      telefono,
      correo,
      departamento,
      provincia,
      distrito,
      centroPoblado,
      referencia,
      lugar,
      especie,
      organo,
      areaSembrada,
      pesoUnidad,
      pesoValor,
      areaUnidad,
      areaValor,
      descripcion,
      files: files.map((f) => f.name),
    });
  };

  const handleVistaPrevia = () => {
    setPreviewOpen(true);
  };

  const centrosSugeridos = useMemo(() => {
    if (CENTROS_POBLADOS[distrito]) return CENTROS_POBLADOS[distrito];
    if (CENTROS_POBLADOS[provincia]) return CENTROS_POBLADOS[provincia];
    return [];
  }, [distrito, provincia]);

  return (
    <main className="min-h-screen bg-background px-2 py-3 sm:px-0 sm:py-6">
      <div className="mx-auto max-w-4xl border border-legacy-border bg-panel shadow-sm">
        {/* Cabecera institucional */}
        <header className="flex flex-col gap-3 border-b-2 border-senasa-red px-3 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-5 sm:py-4">
          <div className="flex items-center gap-2 self-start border border-legacy-border px-3 py-2">
            <span className="text-[11px] font-bold tracking-tight text-senasa-red">PERÚ</span>
            <span className="border-l border-legacy-border pl-2 text-[9px] leading-tight text-muted-foreground">
              Ministerio
              <br />
              de Desarrollo Agrario
              <br />y Riego
            </span>
          </div>
          <div>
            <h1 className="text-[13px] font-bold text-senasa-blue sm:text-[15px]">
              Ministerio de Agricultura
              <br />
              Servicio Nacional de Sanidad Agraria - SENASA
            </h1>
            <p className="mt-1 text-[12px] font-bold text-senasa-red sm:mt-2 sm:text-[14px]">
              Sistema Integrado de Gestión de Sanidad Vegetal - SIGSVE
            </p>
          </div>
        </header>

        <div className="px-3 pb-4 sm:px-4">
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
                  tab === n ? "border-b-tab-active bg-tab-active font-bold text-foreground" : "bg-tab-inactive text-muted-foreground"
                }`}
              >
                Datos generales {n === 1 ? "I" : "II"}
              </button>
            ))}
          </div>

          <form className="border border-t-0 border-legacy-border bg-tab-active p-3 sm:p-5" onSubmit={handleEnviar}>
            {tab === 1 ? (
              <div className="space-y-5">
                <p className="text-[12.5px] leading-relaxed">
                  Estimado usuario, usted puede notificar al SENASA sobre cualquier problema fitosanitario nuevo que se presente en su
                  cultivo o almacén. Para ello deberá llenar los siguientes ítems, enviarlos y el SENASA se contactará con usted.
                </p>

                <fieldset className="legacy-fieldset">
                  <legend className="px-1 text-[12px] text-senasa-blue">Datos del notificante</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                      <div className="w-full shrink-0 text-left sm:w-24 sm:text-right">
                        <Label required>Nombres:</Label>
                      </div>
                      <input className="legacy-input-required w-full min-w-0 flex-1" value={nombres} onChange={(e) => setNombres(e.target.value)} placeholder="Ej. Juan" />
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                      <div className="w-full shrink-0 text-left sm:w-24 sm:text-right">
                        <Label required>Tipo Doc.:</Label>
                      </div>
                      <select className="legacy-input w-full min-w-0 flex-1" value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)}>
                        <option value="">Seleccione...</option>
                        {TIPO_DOC.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                      <div className="w-full shrink-0 text-left sm:w-24 sm:text-right">
                        <Label required>Apellidos:</Label>
                      </div>
                      <input className="legacy-input-required w-full min-w-0 flex-1" value={apellidos} onChange={(e) => setApellidos(e.target.value)} placeholder="Ej. Perez" />
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                      <div className="w-full shrink-0 text-left sm:w-24 sm:text-right">
                        <Label required>N° Doc.:</Label>
                      </div>
                      <input className="legacy-input w-full min-w-0 flex-1" value={nroDoc} onChange={(e) => setNroDoc(e.target.value)} placeholder="12345678" />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="legacy-fieldset">
                  <legend className="px-1 text-[12px] text-senasa-blue">Datos de contacto - Llenar al menos un ítem</legend>
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                    <div className="w-full shrink-0 pt-0 text-left sm:w-24 sm:pt-1 sm:text-right">
                      <Label>Dirección:</Label>
                    </div>
                    <textarea rows={4} className="legacy-input w-full min-w-0 flex-1 resize-none" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                      <div className="w-full shrink-0 text-left sm:w-24 sm:text-right">
                        <Label>Teléfono:</Label>
                      </div>
                      <input className="legacy-input w-full min-w-0 flex-1" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="999 999 999" />
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                      <div className="w-full shrink-0 text-left sm:w-28 sm:text-right">
                        <Label>Correo elect.:</Label>
                      </div>
                      <input type="email" className="legacy-input w-full min-w-0 flex-1" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="correo@ejemplo.com" />
                    </div>
                  </div>
                  <p className="mt-3 text-[12.5px]">Ingresar correo electrónico para un mejor seguimiento de su notificación.</p>
                </fieldset>

                <fieldset className="legacy-fieldset">
                  <legend className="px-1 text-[12px] text-senasa-blue">Ubicación de la zona de ocurrencia de la plaga</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                      <div className="w-full shrink-0 text-left sm:w-24 sm:text-right">
                        <Label required>Departamento:</Label>
                      </div>
                      <select
                        className="legacy-input w-full min-w-0 flex-1"
                        value={departamento}
                        onChange={(e) => {
                          setDepartamento(e.target.value);
                          setProvincia("");
                          setDistrito("");
                        }}
                      >
                        <option value="">Seleccione...</option>
                        {DEPARTAMENTOS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                      <div className="w-full shrink-0 text-left sm:w-24 sm:text-right">
                        <Label required>Provincia:</Label>
                      </div>
                      <select
                        className="legacy-input w-full min-w-0 flex-1"
                        value={provincia}
                        onChange={(e) => {
                          setProvincia(e.target.value);
                          setDistrito("");
                        }}
                        disabled={!departamento}
                      >
                        <option value="">{departamento ? "Seleccione..." : "Seleccione departamento primero"}</option>
                        {provinciasList.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                      <div className="w-full shrink-0 text-left sm:w-24 sm:text-right">
                        <Label required>Distrito:</Label>
                      </div>
                      <select className="legacy-input w-full min-w-0 flex-1" value={distrito} onChange={(e) => setDistrito(e.target.value)} disabled={!provincia}>
                        <option value="">{provincia ? "Seleccione..." : "Seleccione provincia primero"}</option>
                        {distritosList.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                      <div className="w-full shrink-0 text-left sm:w-24 sm:text-right">
                        <Label>C. poblado:</Label>
                      </div>
                      <div className="flex w-full min-w-0 flex-1 gap-1">
                        <input
                          className="legacy-input w-full min-w-0 flex-1"
                          placeholder="Seleccione..."
                          value={centroPoblado}
                          onChange={(e) => setCentroPoblado(e.target.value)}
                          list="centros-list"
                        />
                        <datalist id="centros-list">
                          {centrosSugeridos.map((c) => (
                            <option key={c} value={c} />
                          ))}
                        </datalist>
                        <button type="button" className="legacy-input shrink-0 px-2" aria-label="Buscar centro poblado" onClick={handleSearchCentro}>
                          🔍
                        </button>
                        <button type="button" className="legacy-input shrink-0 px-2" aria-label="Limpiar centro poblado" onClick={handleClearCentro}>
                          ✕
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 sm:col-span-2 sm:flex-row sm:items-center sm:gap-2">
                      <div className="w-full shrink-0 text-left sm:w-24 sm:text-right">
                        <Label>Referencia:</Label>
                      </div>
                      <input className="legacy-input w-full min-w-0 flex-1" value={referencia} onChange={(e) => setReferencia(e.target.value)} />
                    </div>
                  </div>
                </fieldset>

                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:pl-6">
                  <Label>Número de archivos adjuntos:</Label>
                  <input readOnly value={files.length} className="legacy-input w-16 text-center" />
                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {files.map((f, i) => (
                        <span key={i} className="break-all rounded border border-legacy-border bg-white px-2 py-1 text-[11px]">
                          {f.name}{" "}
                          <button type="button" onClick={() => removeFile(i)} className="ml-1 text-senasa-red hover:underline">
                            ✕
                          </button>{" "}
                          <button type="button" onClick={() => openAdjust(i)} className="ml-1 text-senasa-blue hover:underline">
                            Ajustar
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {previews.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 sm:pl-6">
                    {previews.map((src, i) => (
                      <button key={i} type="button" onClick={() => openAdjust(i)} className="overflow-hidden border border-legacy-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={`Adjunto ${i + 1}`} className="h-24 w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col gap-2 pl-0 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 sm:pl-4">
                  <Label>Problema fitosanitario observado en:</Label>
                  <div className="flex gap-4">
                    {["campo", "almacen"].map((v) => (
                      <label key={v} className="flex items-center gap-2 text-[13px]">
                        <input type="radio" name="lugar" checked={lugar === v} onChange={() => setLugar(v as never)} />
                        {v === "campo" ? "Campo" : "Almacén"}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                    <div className="w-full shrink-0 text-left sm:w-32 sm:text-right">
                      <Label required>Esp. veg. afectada:</Label>
                    </div>
                    <input className="legacy-input-required w-full min-w-0 flex-1" value={especie} onChange={(e) => setEspecie(e.target.value)} placeholder="Ej. Papa, Maíz" />
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                    <div className="w-full shrink-0 text-left sm:w-32 sm:text-right">
                      <Label required>Órgano afectado:</Label>
                    </div>
                    <select className="legacy-input-required w-full min-w-0 flex-1" value={organo} onChange={(e) => setOrgano(e.target.value)}>
                      <option value="">Seleccione...</option>
                      {ORGANOS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                    <div className="w-full shrink-0 text-left sm:w-32 sm:text-right">
                      <Label>Área sembrada (ha):</Label>
                    </div>
                    <input className="legacy-input w-full min-w-0 flex-1" value={areaSembrada} onChange={(e) => setAreaSembrada(e.target.value)} placeholder="0.00" />
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                    <div className="w-full shrink-0 text-left sm:w-32 sm:text-right">
                      <Label>Peso:</Label>
                    </div>
                    <div className="flex w-full min-w-0 flex-1 gap-2">
                      <select className="legacy-input w-24 shrink-0 sm:w-24" value={pesoUnidad} onChange={(e) => setPesoUnidad(e.target.value)}>
                        <option value="">Selecc.</option>
                        <option value="kg">kg</option>
                        <option value="t">t</option>
                      </select>
                      <input className="legacy-input w-full min-w-0 flex-1" value={pesoValor} onChange={(e) => setPesoValor(e.target.value)} placeholder="0" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                    <div className="w-full shrink-0 text-left sm:w-32 sm:text-right">
                      <Label>Área afectada:</Label>
                    </div>
                    <div className="flex w-full min-w-0 flex-1 gap-2">
                      <select className="legacy-input w-28 shrink-0" value={areaUnidad} onChange={(e) => setAreaUnidad(e.target.value)}>
                        <option value="">Seleccione.</option>
                        <option value="ha">ha</option>
                        <option value="m²">m²</option>
                      </select>
                      <input className="legacy-input w-28 min-w-0 flex-1 sm:w-28" value={areaValor} onChange={(e) => setAreaValor(e.target.value)} placeholder="0" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                  <div className="w-full shrink-0 pt-0 text-left sm:w-32 sm:pt-1 sm:text-right">
                    <Label required>Descripción del problema:</Label>
                  </div>
                  <textarea rows={8} className="legacy-input w-full min-w-0 flex-1 resize-none sm:rows-[12]" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Describa síntomas, incidencia, fecha de aparición..." />
                </div>

                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                  <div className="w-full shrink-0 text-left sm:w-32 sm:text-right">
                    <Label>Fecha notificación:</Label>
                  </div>
                  <input readOnly value={todayStr} className="legacy-input w-full sm:w-32" />
                </div>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFilesSelected} />

            {/* Barra de acciones */}
            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-legacy-border pt-3 text-[12.5px] sm:flex-row sm:items-center sm:justify-between sm:pt-2">
              <div className="flex flex-wrap gap-3 sm:gap-5">
                <button type="button" className="text-senasa-blue hover:underline" onClick={handleVistaPrevia}>
                  📄 Vista previa
                </button>
                <button type="button" className="text-senasa-blue hover:underline" onClick={() => fileInputRef.current?.click()}>
                  📎 Adjuntar imagen
                </button>
                {files.length > 0 && (
                  <button type="button" className="text-senasa-blue hover:underline" onClick={() => openAdjust(0)}>
                    🖼️ Ajustar imagen
                  </button>
                )}
              </div>
              <button type="submit" className="w-full bg-senasa-blue px-4 py-2 font-bold text-white hover:opacity-90 sm:w-auto sm:bg-transparent sm:px-0 sm:py-0 sm:text-senasa-blue sm:hover:bg-transparent sm:hover:underline">
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

      {/* Dialog Vista Previa */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Vista previa — Notificación SENASA</DialogTitle>
            <DialogDescription>Revise los datos antes de enviar. Los campos con * son obligatorios.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-[12.5px]">
            <div className="grid gap-2 sm:grid-cols-2">
              <div><strong>Nombres*:</strong> {nombres || <span className="text-destructive">— faltante —</span>}</div>
              <div><strong>Apellidos*:</strong> {apellidos || <span className="text-destructive">— faltante —</span>}</div>
              <div><strong>Tipo Doc*:</strong> {tipoDoc || <span className="text-destructive">—</span>}</div>
              <div><strong>N° Doc*:</strong> {nroDoc || <span className="text-destructive">—</span>}</div>
              <div className="sm:col-span-2"><strong>Dirección:</strong> {direccion || "—"}</div>
              <div><strong>Teléfono:</strong> {telefono || "—"}</div>
              <div><strong>Correo:</strong> {correo || "—"}</div>
              <div><strong>Departamento*:</strong> {departamento || <span className="text-destructive">—</span>}</div>
              <div><strong>Provincia*:</strong> {provincia || <span className="text-destructive">—</span>}</div>
              <div><strong>Distrito*:</strong> {distrito || <span className="text-destructive">—</span>}</div>
              <div><strong>C. Poblado:</strong> {centroPoblado || "—"}</div>
              <div><strong>Referencia:</strong> {referencia || "—"}</div>
              <div><strong>Lugar:</strong> {lugar}</div>
              <div><strong>Especie*:</strong> {especie || <span className="text-destructive">—</span>}</div>
              <div><strong>Órgano*:</strong> {organo || <span className="text-destructive">—</span>}</div>
              <div><strong>Área sembrada:</strong> {areaSembrada || "—"} ha</div>
              <div><strong>Peso:</strong> {pesoValor || "—"} {pesoUnidad}</div>
              <div><strong>Área afectada:</strong> {areaValor || "—"} {areaUnidad}</div>
              <div className="sm:col-span-2"><strong>Descripción*:</strong><br />{descripcion || <span className="text-destructive">— faltante —</span>}</div>
              <div><strong>Fecha:</strong> {todayStr}</div>
              <div><strong>Adjuntos:</strong> {files.length} {files.length ? `(${files.map((f) => f.name).join(", ")})` : ""}</div>
            </div>
            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {previews.map((src, i) => (
                  <img key={i} src={src} alt={`preview ${i}`} className="h-24 w-full object-cover border" />
                ))}
              </div>
            )}
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setPreviewOpen(false)} className="legacy-input px-4 py-1">Cerrar</button>
              <button type="button" onClick={(e) => { setPreviewOpen(false); handleEnviar(e as unknown as React.FormEvent); }} className="bg-senasa-red px-4 py-1 text-white hover:opacity-90">Enviar desde vista previa</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Ajustar imagen */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Ajustar imagen</DialogTitle>
            <DialogDescription>Zoom y rotación (vista previa local, no modifica archivo original).</DialogDescription>
          </DialogHeader>
          {previews[adjustIndex] ? (
            <div className="space-y-4">
              <div className="overflow-hidden border bg-muted flex items-center justify-center" style={{ height: 260 }}>
                <img
                  src={previews[adjustIndex]}
                  alt="ajustar"
                  style={{ transform: `scale(${zoom / 100}) rotate(${rotation}deg)`, transition: "transform 0.15s" }}
                  className="max-h-[260px] max-w-full object-contain"
                />
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs">Zoom: {zoom}%</label>
                  <Slider value={[zoom]} min={50} max={200} step={5} onValueChange={([v]) => { if (v !== undefined) setZoom(v); }} />
                </div>
                <div>
                  <label className="text-xs">Rotación: {rotation}°</label>
                  <Slider value={[rotation]} min={0} max={360} step={15} onValueChange={([v]) => { if (v !== undefined) setRotation(v); }} />
                </div>
                <div className="flex justify-between text-xs">
                  <span>{files[adjustIndex]?.name}</span>
                  <span>{files[adjustIndex] ? (files[adjustIndex].size / 1024).toFixed(1) + " KB" : ""}</span>
                </div>
                {previews.length > 1 && (
                  <div className="flex gap-2">
                    <button type="button" disabled={adjustIndex === 0} onClick={() => setAdjustIndex((i) => Math.max(0, i - 1))} className="legacy-input px-3 py-1 disabled:opacity-50">← Anterior</button>
                    <button type="button" disabled={adjustIndex === previews.length - 1} onClick={() => setAdjustIndex((i) => Math.min(previews.length - 1, i + 1))} className="legacy-input px-3 py-1 disabled:opacity-50">Siguiente →</button>
                    <button type="button" onClick={() => { removeFile(adjustIndex); if (previews.length <= 1) setImageDialogOpen(false); else setAdjustIndex(0); }} className="ml-auto text-[12px] text-destructive hover:underline">Eliminar</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No hay imágenes. Use “Adjuntar imagen”.</p>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
