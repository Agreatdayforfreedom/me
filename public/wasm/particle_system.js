let wasm;
function isLikeNone(e) {
  return null == e;
}
function addToExternrefTable0(e) {
  const n = wasm.__externref_table_alloc();
  return wasm.__wbindgen_export_1.set(n, e), n;
}
const cachedTextDecoder =
  "undefined" != typeof TextDecoder
    ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 })
    : {
        decode: () => {
          throw Error("TextDecoder not available");
        },
      };
"undefined" != typeof TextDecoder && cachedTextDecoder.decode();
let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  return (
    (null !== cachedUint8ArrayMemory0 && 0 !== cachedUint8ArrayMemory0.byteLength) || (cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer)),
    cachedUint8ArrayMemory0
  );
}
function getStringFromWasm0(e, n) {
  return (e >>>= 0), cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(e, e + n));
}
function handleError(e, n) {
  try {
    return e.apply(this, n);
  } catch (e) {
    const n = addToExternrefTable0(e);
    wasm.__wbindgen_exn_store(n);
  }
}
let WASM_VECTOR_LEN = 0;
const cachedTextEncoder =
    "undefined" != typeof TextEncoder
      ? new TextEncoder("utf-8")
      : {
          encode: () => {
            throw Error("TextEncoder not available");
          },
        },
  encodeString =
    "function" == typeof cachedTextEncoder.encodeInto
      ? function (e, n) {
          return cachedTextEncoder.encodeInto(e, n);
        }
      : function (e, n) {
          const r = cachedTextEncoder.encode(e);
          return n.set(r), { read: e.length, written: r.length };
        };
function passStringToWasm0(e, n, r) {
  if (void 0 === r) {
    const r = cachedTextEncoder.encode(e),
      t = n(r.length, 1) >>> 0;
    return (
      getUint8ArrayMemory0()
        .subarray(t, t + r.length)
        .set(r),
      (WASM_VECTOR_LEN = r.length),
      t
    );
  }
  let t = e.length,
    _ = n(t, 1) >>> 0;
  const a = getUint8ArrayMemory0();
  let b = 0;
  for (; b < t; b++) {
    const n = e.charCodeAt(b);
    if (n > 127) break;
    a[_ + b] = n;
  }
  if (b !== t) {
    0 !== b && (e = e.slice(b)), (_ = r(_, t, (t = b + 3 * e.length), 1) >>> 0);
    const n = getUint8ArrayMemory0().subarray(_ + b, _ + t);
    (b += encodeString(e, n).written), (_ = r(_, t, b, 1) >>> 0);
  }
  return (WASM_VECTOR_LEN = b), _;
}
let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
  return (
    (null === cachedDataViewMemory0 ||
      !0 === cachedDataViewMemory0.buffer.detached ||
      (void 0 === cachedDataViewMemory0.buffer.detached && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) &&
      (cachedDataViewMemory0 = new DataView(wasm.memory.buffer)),
    cachedDataViewMemory0
  );
}
let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
  return (
    (null !== cachedFloat32ArrayMemory0 && 0 !== cachedFloat32ArrayMemory0.byteLength) ||
      (cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer)),
    cachedFloat32ArrayMemory0
  );
}
function getArrayF32FromWasm0(e, n) {
  return (e >>>= 0), getFloat32ArrayMemory0().subarray(e / 4, e / 4 + n);
}
let cachedInt32ArrayMemory0 = null;
function getInt32ArrayMemory0() {
  return (
    (null !== cachedInt32ArrayMemory0 && 0 !== cachedInt32ArrayMemory0.byteLength) || (cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer)),
    cachedInt32ArrayMemory0
  );
}
function getArrayI32FromWasm0(e, n) {
  return (e >>>= 0), getInt32ArrayMemory0().subarray(e / 4, e / 4 + n);
}
let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
  return (
    (null !== cachedUint32ArrayMemory0 && 0 !== cachedUint32ArrayMemory0.byteLength) ||
      (cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer)),
    cachedUint32ArrayMemory0
  );
}
function getArrayU32FromWasm0(e, n) {
  return (e >>>= 0), getUint32ArrayMemory0().subarray(e / 4, e / 4 + n);
}
const CLOSURE_DTORS =
  "undefined" == typeof FinalizationRegistry
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((e) => {
        wasm.__wbindgen_export_6.get(e.dtor)(e.a, e.b);
      });
function makeMutClosure(e, n, r, t) {
  const _ = { a: e, b: n, cnt: 1, dtor: r },
    a = (...e) => {
      _.cnt++;
      const n = _.a;
      _.a = 0;
      try {
        return t(n, _.b, ...e);
      } finally {
        0 == --_.cnt ? (wasm.__wbindgen_export_6.get(_.dtor)(n, _.b), CLOSURE_DTORS.unregister(_)) : (_.a = n);
      }
    };
  return (a.original = _), CLOSURE_DTORS.register(a, _, _), a;
}
function debugString(e) {
  const n = typeof e;
  if ("number" == n || "boolean" == n || null == e) return `${e}`;
  if ("string" == n) return `"${e}"`;
  if ("symbol" == n) {
    const n = e.description;
    return null == n ? "Symbol" : `Symbol(${n})`;
  }
  if ("function" == n) {
    const n = e.name;
    return "string" == typeof n && n.length > 0 ? `Function(${n})` : "Function";
  }
  if (Array.isArray(e)) {
    const n = e.length;
    let r = "[";
    n > 0 && (r += debugString(e[0]));
    for (let t = 1; t < n; t++) r += ", " + debugString(e[t]);
    return (r += "]"), r;
  }
  const r = /\[object ([^\]]+)\]/.exec(toString.call(e));
  let t;
  if (!(r && r.length > 1)) return toString.call(e);
  if (((t = r[1]), "Object" == t))
    try {
      return "Object(" + JSON.stringify(e) + ")";
    } catch (e) {
      return "Object";
    }
  return e instanceof Error ? `${e.name}: ${e.message}\n${e.stack}` : t;
}
export function run() {
  wasm.run();
}
function __wbg_adapter_36(e, n, r) {
  wasm.closure212_externref_shim(e, n, r);
}
function __wbg_adapter_39(e, n, r) {
  wasm.closure1981_externref_shim(e, n, r);
}
function __wbg_adapter_42(e, n) {
  wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h6bcea03df7002bf1(e, n);
}
function __wbg_adapter_47(e, n, r, t) {
  wasm.closure1983_externref_shim(e, n, r, t);
}
function __wbg_adapter_60(e, n, r) {
  wasm.closure2149_externref_shim(e, n, r);
}
const __wbindgen_enum_GpuCompilationMessageType = ["error", "warning", "info"],
  __wbindgen_enum_GpuDeviceLostReason = ["unknown", "destroyed"],
  __wbindgen_enum_GpuErrorFilter = ["validation", "out-of-memory", "internal"],
  __wbindgen_enum_GpuIndexFormat = ["uint16", "uint32"],
  __wbindgen_enum_GpuTextureFormat = [
    "r8unorm",
    "r8snorm",
    "r8uint",
    "r8sint",
    "r16uint",
    "r16sint",
    "r16float",
    "rg8unorm",
    "rg8snorm",
    "rg8uint",
    "rg8sint",
    "r32uint",
    "r32sint",
    "r32float",
    "rg16uint",
    "rg16sint",
    "rg16float",
    "rgba8unorm",
    "rgba8unorm-srgb",
    "rgba8snorm",
    "rgba8uint",
    "rgba8sint",
    "bgra8unorm",
    "bgra8unorm-srgb",
    "rgb9e5ufloat",
    "rgb10a2uint",
    "rgb10a2unorm",
    "rg11b10ufloat",
    "rg32uint",
    "rg32sint",
    "rg32float",
    "rgba16uint",
    "rgba16sint",
    "rgba16float",
    "rgba32uint",
    "rgba32sint",
    "rgba32float",
    "stencil8",
    "depth16unorm",
    "depth24plus",
    "depth24plus-stencil8",
    "depth32float",
    "depth32float-stencil8",
    "bc1-rgba-unorm",
    "bc1-rgba-unorm-srgb",
    "bc2-rgba-unorm",
    "bc2-rgba-unorm-srgb",
    "bc3-rgba-unorm",
    "bc3-rgba-unorm-srgb",
    "bc4-r-unorm",
    "bc4-r-snorm",
    "bc5-rg-unorm",
    "bc5-rg-snorm",
    "bc6h-rgb-ufloat",
    "bc6h-rgb-float",
    "bc7-rgba-unorm",
    "bc7-rgba-unorm-srgb",
    "etc2-rgb8unorm",
    "etc2-rgb8unorm-srgb",
    "etc2-rgb8a1unorm",
    "etc2-rgb8a1unorm-srgb",
    "etc2-rgba8unorm",
    "etc2-rgba8unorm-srgb",
    "eac-r11unorm",
    "eac-r11snorm",
    "eac-rg11unorm",
    "eac-rg11snorm",
    "astc-4x4-unorm",
    "astc-4x4-unorm-srgb",
    "astc-5x4-unorm",
    "astc-5x4-unorm-srgb",
    "astc-5x5-unorm",
    "astc-5x5-unorm-srgb",
    "astc-6x5-unorm",
    "astc-6x5-unorm-srgb",
    "astc-6x6-unorm",
    "astc-6x6-unorm-srgb",
    "astc-8x5-unorm",
    "astc-8x5-unorm-srgb",
    "astc-8x6-unorm",
    "astc-8x6-unorm-srgb",
    "astc-8x8-unorm",
    "astc-8x8-unorm-srgb",
    "astc-10x5-unorm",
    "astc-10x5-unorm-srgb",
    "astc-10x6-unorm",
    "astc-10x6-unorm-srgb",
    "astc-10x8-unorm",
    "astc-10x8-unorm-srgb",
    "astc-10x10-unorm",
    "astc-10x10-unorm-srgb",
    "astc-12x10-unorm",
    "astc-12x10-unorm-srgb",
    "astc-12x12-unorm",
    "astc-12x12-unorm-srgb",
  ],
  __wbindgen_enum_ResizeObserverBoxOptions = ["border-box", "content-box", "device-pixel-content-box"],
  __wbindgen_enum_VisibilityState = ["hidden", "visible"];
async function __wbg_load(e, n) {
  if ("function" == typeof Response && e instanceof Response) {
    if ("function" == typeof WebAssembly.instantiateStreaming)
      try {
        return await WebAssembly.instantiateStreaming(e, n);
      } catch (n) {
        if ("application/wasm" == e.headers.get("Content-Type")) throw n;
        console.warn(
          "`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
          n
        );
      }
    const r = await e.arrayBuffer();
    return await WebAssembly.instantiate(r, n);
  }
  {
    const r = await WebAssembly.instantiate(e, n);
    return r instanceof WebAssembly.Instance ? { instance: r, module: e } : r;
  }
}
function __wbg_get_imports() {
  const e = { wbg: {} };
  return (
    (e.wbg.__wbg_Window_96e58b3552ce6bb1 = function (e) {
      return e.Window;
    }),
    (e.wbg.__wbg_Window_cf5b693340a7c469 = function (e) {
      return e.Window;
    }),
    (e.wbg.__wbg_WorkerGlobalScope_354364d1b0bd06e5 = function (e) {
      return e.WorkerGlobalScope;
    }),
    (e.wbg.__wbg_abort_19de2f828ee0874a = function (e) {
      e.abort();
    }),
    (e.wbg.__wbg_activeElement_d1a1f2b334adf636 = function (e) {
      const n = e.activeElement;
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_activeTexture_24b42b03041f3428 = function (e, n) {
      e.activeTexture(n >>> 0);
    }),
    (e.wbg.__wbg_activeTexture_47928613532be667 = function (e, n) {
      e.activeTexture(n >>> 0);
    }),
    (e.wbg.__wbg_addEventListener_e27053e488770e58 = function () {
      return handleError(function (e, n, r, t) {
        e.addEventListener(getStringFromWasm0(n, r), t);
      }, arguments);
    }),
    (e.wbg.__wbg_addListener_dca1ccc036e24997 = function () {
      return handleError(function (e, n) {
        e.addListener(n);
      }, arguments);
    }),
    (e.wbg.__wbg_altKey_56dd0987e7ccbbf2 = function (e) {
      return e.altKey;
    }),
    (e.wbg.__wbg_altKey_583c79ba3f4fce1e = function (e) {
      return e.altKey;
    }),
    (e.wbg.__wbg_animate_310f1b8e5b1fdb56 = function (e, n, r) {
      return e.animate(n, r);
    }),
    (e.wbg.__wbg_appendChild_805222aed73feea9 = function () {
      return handleError(function (e, n) {
        return e.appendChild(n);
      }, arguments);
    }),
    (e.wbg.__wbg_attachShader_81000b0c4da5b206 = function (e, n, r) {
      e.attachShader(n, r);
    }),
    (e.wbg.__wbg_attachShader_ccc35921e866b2bf = function (e, n, r) {
      e.attachShader(n, r);
    }),
    (e.wbg.__wbg_beginComputePass_90d5303e604970cb = function (e, n) {
      return e.beginComputePass(n);
    }),
    (e.wbg.__wbg_beginQuery_4e54bbe77706fb3c = function (e, n, r) {
      e.beginQuery(n >>> 0, r);
    }),
    (e.wbg.__wbg_beginRenderPass_9739520c601001c3 = function (e, n) {
      return e.beginRenderPass(n);
    }),
    (e.wbg.__wbg_bindAttribLocation_a08ae4fdf9b16e7d = function (e, n, r, t, _) {
      e.bindAttribLocation(n, r >>> 0, getStringFromWasm0(t, _));
    }),
    (e.wbg.__wbg_bindAttribLocation_b53db53e1b134420 = function (e, n, r, t, _) {
      e.bindAttribLocation(n, r >>> 0, getStringFromWasm0(t, _));
    }),
    (e.wbg.__wbg_bindBufferRange_ce5a2827ed937112 = function (e, n, r, t, _, a) {
      e.bindBufferRange(n >>> 0, r >>> 0, t, _, a);
    }),
    (e.wbg.__wbg_bindBuffer_0fedb16582ffeee6 = function (e, n, r) {
      e.bindBuffer(n >>> 0, r);
    }),
    (e.wbg.__wbg_bindBuffer_c6e5f29d60e90c01 = function (e, n, r) {
      e.bindBuffer(n >>> 0, r);
    }),
    (e.wbg.__wbg_bindFramebuffer_87e15614ca3e9537 = function (e, n, r) {
      e.bindFramebuffer(n >>> 0, r);
    }),
    (e.wbg.__wbg_bindFramebuffer_a0d602bd474dcbfb = function (e, n, r) {
      e.bindFramebuffer(n >>> 0, r);
    }),
    (e.wbg.__wbg_bindRenderbuffer_3100396894cc2d72 = function (e, n, r) {
      e.bindRenderbuffer(n >>> 0, r);
    }),
    (e.wbg.__wbg_bindRenderbuffer_fd3e47dad76906ea = function (e, n, r) {
      e.bindRenderbuffer(n >>> 0, r);
    }),
    (e.wbg.__wbg_bindSampler_7614054a94f8e3d1 = function (e, n, r) {
      e.bindSampler(n >>> 0, r);
    }),
    (e.wbg.__wbg_bindTexture_6478edbb238b9c73 = function (e, n, r) {
      e.bindTexture(n >>> 0, r);
    }),
    (e.wbg.__wbg_bindTexture_9b177c97248ed4d9 = function (e, n, r) {
      e.bindTexture(n >>> 0, r);
    }),
    (e.wbg.__wbg_bindVertexArrayOES_e81fca007d08d0db = function (e, n) {
      e.bindVertexArrayOES(n);
    }),
    (e.wbg.__wbg_bindVertexArray_d9082254ff3bcc13 = function (e, n) {
      e.bindVertexArray(n);
    }),
    (e.wbg.__wbg_blendColor_075aa544f1fe84c5 = function (e, n, r, t, _) {
      e.blendColor(n, r, t, _);
    }),
    (e.wbg.__wbg_blendColor_ed292080d5966f2c = function (e, n, r, t, _) {
      e.blendColor(n, r, t, _);
    }),
    (e.wbg.__wbg_blendEquationSeparate_3dbbe20b0a9fa818 = function (e, n, r) {
      e.blendEquationSeparate(n >>> 0, r >>> 0);
    }),
    (e.wbg.__wbg_blendEquationSeparate_d360393d3b1557cd = function (e, n, r) {
      e.blendEquationSeparate(n >>> 0, r >>> 0);
    }),
    (e.wbg.__wbg_blendEquation_41f4ed79f5ddd25c = function (e, n) {
      e.blendEquation(n >>> 0);
    }),
    (e.wbg.__wbg_blendEquation_8804e10c9ced3fc4 = function (e, n) {
      e.blendEquation(n >>> 0);
    }),
    (e.wbg.__wbg_blendFuncSeparate_2cc7ac2397290a15 = function (e, n, r, t, _) {
      e.blendFuncSeparate(n >>> 0, r >>> 0, t >>> 0, _ >>> 0);
    }),
    (e.wbg.__wbg_blendFuncSeparate_c6c035b0094bd58f = function (e, n, r, t, _) {
      e.blendFuncSeparate(n >>> 0, r >>> 0, t >>> 0, _ >>> 0);
    }),
    (e.wbg.__wbg_blendFunc_63aca14ff3252b59 = function (e, n, r) {
      e.blendFunc(n >>> 0, r >>> 0);
    }),
    (e.wbg.__wbg_blendFunc_8e1cfba50a4eea89 = function (e, n, r) {
      e.blendFunc(n >>> 0, r >>> 0);
    }),
    (e.wbg.__wbg_blitFramebuffer_171b9355e4e730c9 = function (e, n, r, t, _, a, b, o, c, f, i) {
      e.blitFramebuffer(n, r, t, _, a, b, o, c, f >>> 0, i >>> 0);
    }),
    (e.wbg.__wbg_blockSize_e0006fb003814895 = function (e) {
      return e.blockSize;
    }),
    (e.wbg.__wbg_body_83d4bc4961a422aa = function (e) {
      const n = e.body;
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_brand_67e4f3d950154d0a = function (e, n) {
      const r = passStringToWasm0(n.brand, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
        t = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(e + 4, t, !0), getDataViewMemory0().setInt32(e + 0, r, !0);
    }),
    (e.wbg.__wbg_brands_1ec54d613da9db02 = function (e) {
      return e.brands;
    }),
    (e.wbg.__wbg_bufferData_2a747a2c2c3b23b5 = function (e, n, r, t) {
      e.bufferData(n >>> 0, r, t >>> 0);
    }),
    (e.wbg.__wbg_bufferData_5b85d77150f6520a = function (e, n, r, t) {
      e.bufferData(n >>> 0, r, t >>> 0);
    }),
    (e.wbg.__wbg_bufferData_b03654fb80052afe = function (e, n, r, t) {
      e.bufferData(n >>> 0, r, t >>> 0);
    }),
    (e.wbg.__wbg_bufferData_c2eb7dbb2ea2ab3f = function (e, n, r, t) {
      e.bufferData(n >>> 0, r, t >>> 0);
    }),
    (e.wbg.__wbg_bufferSubData_8a7d35c05111a120 = function (e, n, r, t) {
      e.bufferSubData(n >>> 0, r, t);
    }),
    (e.wbg.__wbg_bufferSubData_c4b11388b9eb4175 = function (e, n, r, t) {
      e.bufferSubData(n >>> 0, r, t);
    }),
    (e.wbg.__wbg_buffer_6e1d53ff183194fc = function (e) {
      return e.buffer;
    }),
    (e.wbg.__wbg_buffer_ffdeb2ee67420f9e = function (e) {
      return e.buffer;
    }),
    (e.wbg.__wbg_button_db48f93638c59f95 = function (e) {
      return e.button;
    }),
    (e.wbg.__wbg_buttons_b962d6dc116cd1a5 = function (e) {
      return e.buttons;
    }),
    (e.wbg.__wbg_call_0411c0c3c424db9a = function () {
      return handleError(function (e, n, r) {
        return e.call(n, r);
      }, arguments);
    }),
    (e.wbg.__wbg_call_3114932863209ca6 = function () {
      return handleError(function (e, n) {
        return e.call(n);
      }, arguments);
    }),
    (e.wbg.__wbg_cancelAnimationFrame_f1ad512e269ea165 = function () {
      return handleError(function (e, n) {
        e.cancelAnimationFrame(n);
      }, arguments);
    }),
    (e.wbg.__wbg_cancelIdleCallback_bcc2dc9be9de0744 = function (e, n) {
      e.cancelIdleCallback(n >>> 0);
    }),
    (e.wbg.__wbg_cancel_3b69067dcdf7ffb7 = function (e) {
      e.cancel();
    }),
    (e.wbg.__wbg_catch_9da7d002aa356f1d = function (e, n) {
      return e.catch(n);
    }),
    (e.wbg.__wbg_clearBuffer_6164fc25d22b25cc = function (e, n, r, t) {
      e.clearBuffer(n, r, t);
    }),
    (e.wbg.__wbg_clearBuffer_cfcaaf1fb2baa885 = function (e, n, r) {
      e.clearBuffer(n, r);
    }),
    (e.wbg.__wbg_clearBufferfv_2cf04e18ef87ed90 = function (e, n, r, t, _) {
      e.clearBufferfv(n >>> 0, r, getArrayF32FromWasm0(t, _));
    }),
    (e.wbg.__wbg_clearBufferiv_b45be02e57957dad = function (e, n, r, t, _) {
      e.clearBufferiv(n >>> 0, r, getArrayI32FromWasm0(t, _));
    }),
    (e.wbg.__wbg_clearBufferuiv_deca83038abb23d2 = function (e, n, r, t, _) {
      e.clearBufferuiv(n >>> 0, r, getArrayU32FromWasm0(t, _));
    }),
    (e.wbg.__wbg_clearDepth_14d34daa30215440 = function (e, n) {
      e.clearDepth(n);
    }),
    (e.wbg.__wbg_clearDepth_1cdcb08d8a5afa49 = function (e, n) {
      e.clearDepth(n);
    }),
    (e.wbg.__wbg_clearStencil_e2c8b1892d5e033d = function (e, n) {
      e.clearStencil(n);
    }),
    (e.wbg.__wbg_clearStencil_f3138d2e338d1436 = function (e, n) {
      e.clearStencil(n);
    }),
    (e.wbg.__wbg_clearTimeout_da4408c46e51bc7a = function (e, n) {
      e.clearTimeout(n);
    }),
    (e.wbg.__wbg_clear_4e68091e616c29ad = function (e, n) {
      e.clear(n >>> 0);
    }),
    (e.wbg.__wbg_clear_af7641961d766f51 = function (e, n) {
      e.clear(n >>> 0);
    }),
    (e.wbg.__wbg_clientWaitSync_2c4c0bd3a8d3536b = function (e, n, r, t) {
      return e.clientWaitSync(n, r >>> 0, t >>> 0);
    }),
    (e.wbg.__wbg_close_35d643897b189a00 = function (e) {
      e.close();
    }),
    (e.wbg.__wbg_code_d8226b2133366406 = function (e, n) {
      const r = passStringToWasm0(n.code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
        t = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(e + 4, t, !0), getDataViewMemory0().setInt32(e + 0, r, !0);
    }),
    (e.wbg.__wbg_colorMask_22d850d91e89df9f = function (e, n, r, t, _) {
      e.colorMask(0 !== n, 0 !== r, 0 !== t, 0 !== _);
    }),
    (e.wbg.__wbg_colorMask_a6068fae89c17ceb = function (e, n, r, t, _) {
      e.colorMask(0 !== n, 0 !== r, 0 !== t, 0 !== _);
    }),
    (e.wbg.__wbg_compileShader_5e41ecd397194c21 = function (e, n) {
      e.compileShader(n);
    }),
    (e.wbg.__wbg_compileShader_6868fa6a842f0911 = function (e, n) {
      e.compileShader(n);
    }),
    (e.wbg.__wbg_compressedTexSubImage2D_216f6eec167da8d7 = function (e, n, r, t, _, a, b, o, c) {
      e.compressedTexSubImage2D(n >>> 0, r, t, _, a, b, o >>> 0, c);
    }),
    (e.wbg.__wbg_compressedTexSubImage2D_4b50d2a94bf4ea60 = function (e, n, r, t, _, a, b, o, c, f) {
      e.compressedTexSubImage2D(n >>> 0, r, t, _, a, b, o >>> 0, c, f);
    }),
    (e.wbg.__wbg_compressedTexSubImage2D_9b0c2c785026006a = function (e, n, r, t, _, a, b, o, c) {
      e.compressedTexSubImage2D(n >>> 0, r, t, _, a, b, o >>> 0, c);
    }),
    (e.wbg.__wbg_compressedTexSubImage3D_8102ea4403fef5ce = function (e, n, r, t, _, a, b, o, c, f, i) {
      e.compressedTexSubImage3D(n >>> 0, r, t, _, a, b, o, c, f >>> 0, i);
    }),
    (e.wbg.__wbg_compressedTexSubImage3D_bf2bdb940e26bc8c = function (e, n, r, t, _, a, b, o, c, f, i, g) {
      e.compressedTexSubImage3D(n >>> 0, r, t, _, a, b, o, c, f >>> 0, i, g);
    }),
    (e.wbg.__wbg_configure_2414aed971d368cd = function (e, n) {
      e.configure(n);
    }),
    (e.wbg.__wbg_contains_6947e163e2a3c092 = function (e, n) {
      return e.contains(n);
    }),
    (e.wbg.__wbg_contentRect_7aaa87e16fd2882d = function (e) {
      return e.contentRect;
    }),
    (e.wbg.__wbg_copyBufferSubData_ff213d67aa3b1f82 = function (e, n, r, t, _, a) {
      e.copyBufferSubData(n >>> 0, r >>> 0, t, _, a);
    }),
    (e.wbg.__wbg_copyBufferToBuffer_1ba67191114656a1 = function (e, n, r, t, _, a) {
      e.copyBufferToBuffer(n, r, t, _, a);
    }),
    (e.wbg.__wbg_copyBufferToTexture_878d31d479e48f28 = function (e, n, r, t) {
      e.copyBufferToTexture(n, r, t);
    }),
    (e.wbg.__wbg_copyExternalImageToTexture_7878d196c0b60d39 = function (e, n, r, t) {
      e.copyExternalImageToTexture(n, r, t);
    }),
    (e.wbg.__wbg_copyTexSubImage2D_4b37e79c31b798b1 = function (e, n, r, t, _, a, b, o, c) {
      e.copyTexSubImage2D(n >>> 0, r, t, _, a, b, o, c);
    }),
    (e.wbg.__wbg_copyTexSubImage2D_a29106dfb31dd17c = function (e, n, r, t, _, a, b, o, c) {
      e.copyTexSubImage2D(n >>> 0, r, t, _, a, b, o, c);
    }),
    (e.wbg.__wbg_copyTexSubImage3D_f8350e268c143688 = function (e, n, r, t, _, a, b, o, c, f) {
      e.copyTexSubImage3D(n >>> 0, r, t, _, a, b, o, c, f);
    }),
    (e.wbg.__wbg_copyTextureToBuffer_6a8fe0e90f0a663d = function (e, n, r, t) {
      e.copyTextureToBuffer(n, r, t);
    }),
    (e.wbg.__wbg_copyTextureToTexture_0a06a393d6726b4a = function (e, n, r, t) {
      e.copyTextureToTexture(n, r, t);
    }),
    (e.wbg.__wbg_createBindGroupLayout_1d93b6d41c87ba9d = function (e, n) {
      return e.createBindGroupLayout(n);
    }),
    (e.wbg.__wbg_createBindGroup_61cd07ec9d423432 = function (e, n) {
      return e.createBindGroup(n);
    }),
    (e.wbg.__wbg_createBuffer_1e646d14cebbb438 = function (e) {
      const n = e.createBuffer();
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_createBuffer_2a696fb8c0d07970 = function (e) {
      const n = e.createBuffer();
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_createBuffer_963aa00d5fe859e4 = function (e, n) {
      return e.createBuffer(n);
    }),
    (e.wbg.__wbg_createCommandEncoder_f0e1613e9a2dc1eb = function (e, n) {
      return e.createCommandEncoder(n);
    }),
    (e.wbg.__wbg_createComputePipeline_b9616b9fe2f4eb2f = function (e, n) {
      return e.createComputePipeline(n);
    }),
    (e.wbg.__wbg_createElement_22b48bfb31a0c20e = function () {
      return handleError(function (e, n, r) {
        return e.createElement(getStringFromWasm0(n, r));
      }, arguments);
    }),
    (e.wbg.__wbg_createFramebuffer_163e192e1e53ec9b = function (e) {
      const n = e.createFramebuffer();
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_createFramebuffer_1aa54479f7524ef5 = function (e) {
      const n = e.createFramebuffer();
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_createObjectURL_06505af3e8787cc8 = function () {
      return handleError(function (e, n) {
        const r = passStringToWasm0(URL.createObjectURL(n), wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
          t = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(e + 4, t, !0), getDataViewMemory0().setInt32(e + 0, r, !0);
      }, arguments);
    }),
    (e.wbg.__wbg_createPipelineLayout_56c6cf983f892d2b = function (e, n) {
      return e.createPipelineLayout(n);
    }),
    (e.wbg.__wbg_createProgram_5a5a92d23fdc2f1a = function (e) {
      const n = e.createProgram();
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_createProgram_b75025f0f1a4ef55 = function (e) {
      const n = e.createProgram();
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_createQuerySet_c14be802adf7c207 = function (e, n) {
      return e.createQuerySet(n);
    }),
    (e.wbg.__wbg_createQuery_2816e95a473b5501 = function (e) {
      const n = e.createQuery();
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_createRenderBundleEncoder_8e4bdffea72f8c1f = function (e, n) {
      return e.createRenderBundleEncoder(n);
    }),
    (e.wbg.__wbg_createRenderPipeline_079a88a0601fcce1 = function (e, n) {
      return e.createRenderPipeline(n);
    }),
    (e.wbg.__wbg_createRenderbuffer_29e130c03bc689d3 = function (e) {
      const n = e.createRenderbuffer();
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_createRenderbuffer_b10004ae18d38014 = function (e) {
      const n = e.createRenderbuffer();
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_createSampler_50ae7c4dd1f9b066 = function (e) {
      const n = e.createSampler();
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_createSampler_ef5578990df3baf7 = function (e, n) {
      return e.createSampler(n);
    }),
    (e.wbg.__wbg_createShaderModule_17f451ea25cae47c = function (e, n) {
      return e.createShaderModule(n);
    }),
    (e.wbg.__wbg_createShader_29c8e06db7e7211f = function (e, n) {
      const r = e.createShader(n >>> 0);
      return isLikeNone(r) ? 0 : addToExternrefTable0(r);
    }),
    (e.wbg.__wbg_createShader_8c3053457f874cdd = function (e, n) {
      const r = e.createShader(n >>> 0);
      return isLikeNone(r) ? 0 : addToExternrefTable0(r);
    }),
    (e.wbg.__wbg_createTexture_01cc1cd2fea732d9 = function (e, n) {
      return e.createTexture(n);
    }),
    (e.wbg.__wbg_createTexture_20f63b261993f581 = function (e) {
      const n = e.createTexture();
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_createTexture_facd2df68d8d0276 = function (e) {
      const n = e.createTexture();
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_createVertexArrayOES_89f45f4a4fde395f = function (e) {
      const n = e.createVertexArrayOES();
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_createVertexArray_70d7c4c62e00613d = function (e) {
      const n = e.createVertexArray();
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_createView_04701884291e1ccc = function (e, n) {
      return e.createView(n);
    }),
    (e.wbg.__wbg_crypto_ed58b8e10a292839 = function (e) {
      return e.crypto;
    }),
    (e.wbg.__wbg_ctrlKey_60b29e015a543678 = function (e) {
      return e.ctrlKey;
    }),
    (e.wbg.__wbg_ctrlKey_ab341328ab202d37 = function (e) {
      return e.ctrlKey;
    }),
    (e.wbg.__wbg_cullFace_96a9dca4a5b1ca33 = function (e, n) {
      e.cullFace(n >>> 0);
    }),
    (e.wbg.__wbg_cullFace_99bb4e31c974596d = function (e, n) {
      e.cullFace(n >>> 0);
    }),
    (e.wbg.__wbg_debug_347b3d1f33e1c28e = function (e) {
      console.debug(e);
    }),
    (e.wbg.__wbg_deleteBuffer_9d705222a7e77a7b = function (e, n) {
      e.deleteBuffer(n);
    }),
    (e.wbg.__wbg_deleteBuffer_db0d7ecbaa97fa56 = function (e, n) {
      e.deleteBuffer(n);
    }),
    (e.wbg.__wbg_deleteFramebuffer_69db238ea6b8a9a1 = function (e, n) {
      e.deleteFramebuffer(n);
    }),
    (e.wbg.__wbg_deleteFramebuffer_ecf398bec452aaf9 = function (e, n) {
      e.deleteFramebuffer(n);
    }),
    (e.wbg.__wbg_deleteProgram_cb18e0020d488bad = function (e, n) {
      e.deleteProgram(n);
    }),
    (e.wbg.__wbg_deleteProgram_e1a6c4b922e202e3 = function (e, n) {
      e.deleteProgram(n);
    }),
    (e.wbg.__wbg_deleteQuery_e083394da1710d6c = function (e, n) {
      e.deleteQuery(n);
    }),
    (e.wbg.__wbg_deleteRenderbuffer_05fa7f35ea76cafd = function (e, n) {
      e.deleteRenderbuffer(n);
    }),
    (e.wbg.__wbg_deleteRenderbuffer_2f1216e54aa2f248 = function (e, n) {
      e.deleteRenderbuffer(n);
    }),
    (e.wbg.__wbg_deleteSampler_e5c61c85993f9a69 = function (e, n) {
      e.deleteSampler(n);
    }),
    (e.wbg.__wbg_deleteShader_257caf93b24ac555 = function (e, n) {
      e.deleteShader(n);
    }),
    (e.wbg.__wbg_deleteShader_fb86028e46cb069b = function (e, n) {
      e.deleteShader(n);
    }),
    (e.wbg.__wbg_deleteSync_b5caedf06185d972 = function (e, n) {
      e.deleteSync(n);
    }),
    (e.wbg.__wbg_deleteTexture_6913f682a09c8171 = function (e, n) {
      e.deleteTexture(n);
    }),
    (e.wbg.__wbg_deleteTexture_a29655740b1cbe33 = function (e, n) {
      e.deleteTexture(n);
    }),
    (e.wbg.__wbg_deleteVertexArrayOES_2def7ce37f8e89f2 = function (e, n) {
      e.deleteVertexArrayOES(n);
    }),
    (e.wbg.__wbg_deleteVertexArray_a3bca8e15204ffed = function (e, n) {
      e.deleteVertexArray(n);
    }),
    (e.wbg.__wbg_deltaMode_a4cc321212f87817 = function (e) {
      return e.deltaMode;
    }),
    (e.wbg.__wbg_deltaX_27e2939a1af8c940 = function (e) {
      return e.deltaX;
    }),
    (e.wbg.__wbg_deltaY_4bb52a4f0a7ad28b = function (e) {
      return e.deltaY;
    }),
    (e.wbg.__wbg_depthFunc_657dd592930e7f2f = function (e, n) {
      e.depthFunc(n >>> 0);
    }),
    (e.wbg.__wbg_depthFunc_f9fd44a07ea8398e = function (e, n) {
      e.depthFunc(n >>> 0);
    }),
    (e.wbg.__wbg_depthMask_87195357e4f7df17 = function (e, n) {
      e.depthMask(0 !== n);
    }),
    (e.wbg.__wbg_depthMask_bac7f6b455b6ddeb = function (e, n) {
      e.depthMask(0 !== n);
    }),
    (e.wbg.__wbg_depthRange_d947e824a28dc9a1 = function (e, n, r) {
      e.depthRange(n, r);
    }),
    (e.wbg.__wbg_depthRange_f71c79182f666e45 = function (e, n, r) {
      e.depthRange(n, r);
    }),
    (e.wbg.__wbg_destroy_35f94012e5bb9c17 = function (e) {
      e.destroy();
    }),
    (e.wbg.__wbg_destroy_767d9dde1008e293 = function (e) {
      e.destroy();
    }),
    (e.wbg.__wbg_destroy_c6af4226dda95dbd = function (e) {
      e.destroy();
    }),
    (e.wbg.__wbg_devicePixelContentBoxSize_1ea2c6145730b8c0 = function (e) {
      return e.devicePixelContentBoxSize;
    }),
    (e.wbg.__wbg_devicePixelRatio_f4eb7cbe3a812de0 = function (e) {
      return e.devicePixelRatio;
    }),
    (e.wbg.__wbg_disableVertexAttribArray_c513f1fff3cb73f2 = function (e, n) {
      e.disableVertexAttribArray(n >>> 0);
    }),
    (e.wbg.__wbg_disableVertexAttribArray_e7ff41dc0c3eaf1f = function (e, n) {
      e.disableVertexAttribArray(n >>> 0);
    }),
    (e.wbg.__wbg_disable_4c1cedffa6646166 = function (e, n) {
      e.disable(n >>> 0);
    }),
    (e.wbg.__wbg_disable_5320561e5cb15f08 = function (e, n) {
      e.disable(n >>> 0);
    }),
    (e.wbg.__wbg_disconnect_8b7c928b6057719b = function (e) {
      e.disconnect();
    }),
    (e.wbg.__wbg_disconnect_c45e8044053eddf3 = function (e) {
      e.disconnect();
    }),
    (e.wbg.__wbg_dispatchWorkgroupsIndirect_8b25efab93a7a433 = function (e, n, r) {
      e.dispatchWorkgroupsIndirect(n, r);
    }),
    (e.wbg.__wbg_dispatchWorkgroups_c102fa81b955935d = function (e, n, r, t) {
      e.dispatchWorkgroups(n >>> 0, r >>> 0, t >>> 0);
    }),
    (e.wbg.__wbg_document_c488ca7509cc6938 = function (e) {
      const n = e.document;
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_drawArraysInstancedANGLE_55c83db2758c6ab4 = function (e, n, r, t, _) {
      e.drawArraysInstancedANGLE(n >>> 0, r, t, _);
    }),
    (e.wbg.__wbg_drawArraysInstanced_11f863da4daf24d0 = function (e, n, r, t, _) {
      e.drawArraysInstanced(n >>> 0, r, t, _);
    }),
    (e.wbg.__wbg_drawArrays_87e9bb0e2fb3e0fa = function (e, n, r, t) {
      e.drawArrays(n >>> 0, r, t);
    }),
    (e.wbg.__wbg_drawArrays_f5b0f0a0dc392c3f = function (e, n, r, t) {
      e.drawArrays(n >>> 0, r, t);
    }),
    (e.wbg.__wbg_drawBuffersWEBGL_22730193cdce9696 = function (e, n) {
      e.drawBuffersWEBGL(n);
    }),
    (e.wbg.__wbg_drawBuffers_f256d529aecd01f2 = function (e, n) {
      e.drawBuffers(n);
    }),
    (e.wbg.__wbg_drawElementsInstancedANGLE_db0bafff77affb0d = function (e, n, r, t, _, a) {
      e.drawElementsInstancedANGLE(n >>> 0, r, t >>> 0, _, a);
    }),
    (e.wbg.__wbg_drawElementsInstanced_e87f1c69165df984 = function (e, n, r, t, _, a) {
      e.drawElementsInstanced(n >>> 0, r, t >>> 0, _, a);
    }),
    (e.wbg.__wbg_drawIndexedIndirect_34484fc6227c7bc8 = function (e, n, r) {
      e.drawIndexedIndirect(n, r);
    }),
    (e.wbg.__wbg_drawIndexedIndirect_5a7c30bb5f1d5b67 = function (e, n, r) {
      e.drawIndexedIndirect(n, r);
    }),
    (e.wbg.__wbg_drawIndexed_115af1449b52a948 = function (e, n, r, t, _, a) {
      e.drawIndexed(n >>> 0, r >>> 0, t >>> 0, _, a >>> 0);
    }),
    (e.wbg.__wbg_drawIndexed_a587cce4c317791f = function (e, n, r, t, _, a) {
      e.drawIndexed(n >>> 0, r >>> 0, t >>> 0, _, a >>> 0);
    }),
    (e.wbg.__wbg_drawIndirect_036d71498a21f1a3 = function (e, n, r) {
      e.drawIndirect(n, r);
    }),
    (e.wbg.__wbg_drawIndirect_a1d7c5e893aa5756 = function (e, n, r) {
      e.drawIndirect(n, r);
    }),
    (e.wbg.__wbg_draw_5351b12033166aca = function (e, n, r, t, _) {
      e.draw(n >>> 0, r >>> 0, t >>> 0, _ >>> 0);
    }),
    (e.wbg.__wbg_draw_e2a7c5d66fb2d244 = function (e, n, r, t, _) {
      e.draw(n >>> 0, r >>> 0, t >>> 0, _ >>> 0);
    }),
    (e.wbg.__wbg_enableVertexAttribArray_0ce3052ae5f3f84a = function (e, n) {
      e.enableVertexAttribArray(n >>> 0);
    }),
    (e.wbg.__wbg_enableVertexAttribArray_2bb681a583bf0dbe = function (e, n) {
      e.enableVertexAttribArray(n >>> 0);
    }),
    (e.wbg.__wbg_enable_8d6ea7489b31dabd = function (e, n) {
      e.enable(n >>> 0);
    }),
    (e.wbg.__wbg_enable_bb868e19d5c88d56 = function (e, n) {
      e.enable(n >>> 0);
    }),
    (e.wbg.__wbg_endQuery_b4f2566f7afc4117 = function (e, n) {
      e.endQuery(n >>> 0);
    }),
    (e.wbg.__wbg_end_0ac71677a5c1717a = function (e) {
      e.end();
    }),
    (e.wbg.__wbg_end_6f776519f1faa582 = function (e) {
      e.end();
    }),
    (e.wbg.__wbg_error_2a6b93fdada7ff11 = function (e) {
      console.error(e);
    }),
    (e.wbg.__wbg_error_7534b8e9a36f1ab4 = function (e, n) {
      let r, t;
      try {
        (r = e), (t = n), console.error(getStringFromWasm0(e, n));
      } finally {
        wasm.__wbindgen_free(r, t, 1);
      }
    }),
    (e.wbg.__wbg_error_e98e6aadd08e0b94 = function (e) {
      return e.error;
    }),
    (e.wbg.__wbg_error_f0dde81ae1e4cfea = function (e, n) {
      console.error(e, n);
    }),
    (e.wbg.__wbg_executeBundles_8e6c0614da2805d4 = function (e, n) {
      e.executeBundles(n);
    }),
    (e.wbg.__wbg_features_1b464383ea8a7691 = function (e) {
      return e.features;
    }),
    (e.wbg.__wbg_features_e5fbbc2760867852 = function (e) {
      return e.features;
    }),
    (e.wbg.__wbg_fenceSync_68dcf439f52decac = function (e, n, r) {
      const t = e.fenceSync(n >>> 0, r >>> 0);
      return isLikeNone(t) ? 0 : addToExternrefTable0(t);
    }),
    (e.wbg.__wbg_finish_20711371c58df61c = function (e) {
      return e.finish();
    }),
    (e.wbg.__wbg_finish_34b2c54329c8719f = function (e, n) {
      return e.finish(n);
    }),
    (e.wbg.__wbg_finish_a9ab917e756ea00c = function (e, n) {
      return e.finish(n);
    }),
    (e.wbg.__wbg_finish_e0a6c97c0622f843 = function (e) {
      return e.finish();
    }),
    (e.wbg.__wbg_focus_c71947fc3fe22147 = function () {
      return handleError(function (e) {
        e.focus();
      }, arguments);
    }),
    (e.wbg.__wbg_framebufferRenderbuffer_308ddbcaaed66ff2 = function (e, n, r, t, _) {
      e.framebufferRenderbuffer(n >>> 0, r >>> 0, t >>> 0, _);
    }),
    (e.wbg.__wbg_framebufferRenderbuffer_a23d035c46e3e192 = function (e, n, r, t, _) {
      e.framebufferRenderbuffer(n >>> 0, r >>> 0, t >>> 0, _);
    }),
    (e.wbg.__wbg_framebufferTexture2D_170b0f8c792e246f = function (e, n, r, t, _, a) {
      e.framebufferTexture2D(n >>> 0, r >>> 0, t >>> 0, _, a);
    }),
    (e.wbg.__wbg_framebufferTexture2D_5366ecb050293d09 = function (e, n, r, t, _, a) {
      e.framebufferTexture2D(n >>> 0, r >>> 0, t >>> 0, _, a);
    }),
    (e.wbg.__wbg_framebufferTextureLayer_daccfb6fb9396578 = function (e, n, r, t, _, a) {
      e.framebufferTextureLayer(n >>> 0, r >>> 0, t, _, a);
    }),
    (e.wbg.__wbg_framebufferTextureMultiviewOVR_e2282e87fdf2564f = function (e, n, r, t, _, a, b) {
      e.framebufferTextureMultiviewOVR(n >>> 0, r >>> 0, t, _, a, b);
    }),
    (e.wbg.__wbg_frontFace_7b469405c0e889ee = function (e, n) {
      e.frontFace(n >>> 0);
    }),
    (e.wbg.__wbg_frontFace_993e921eaef39c45 = function (e, n) {
      e.frontFace(n >>> 0);
    }),
    (e.wbg.__wbg_fullscreenElement_a613ad02fa918fb4 = function (e) {
      const n = e.fullscreenElement;
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_getBindGroupLayout_4a94df6108ac6667 = function (e, n) {
      return e.getBindGroupLayout(n >>> 0);
    }),
    (e.wbg.__wbg_getBindGroupLayout_80e803d942962f6a = function (e, n) {
      return e.getBindGroupLayout(n >>> 0);
    }),
    (e.wbg.__wbg_getBufferSubData_5102d8a217d0774c = function (e, n, r, t) {
      e.getBufferSubData(n >>> 0, r, t);
    }),
    (e.wbg.__wbg_getCoalescedEvents_1372a1922f78401a = function (e) {
      return e.getCoalescedEvents;
    }),
    (e.wbg.__wbg_getCoalescedEvents_3736b5e5d63bed7b = function (e) {
      return e.getCoalescedEvents();
    }),
    (e.wbg.__wbg_getCompilationInfo_2af3ecdfeda551a3 = function (e) {
      return e.getCompilationInfo();
    }),
    (e.wbg.__wbg_getComputedStyle_c3a9de7674a38310 = function () {
      return handleError(function (e, n) {
        const r = e.getComputedStyle(n);
        return isLikeNone(r) ? 0 : addToExternrefTable0(r);
      }, arguments);
    }),
    (e.wbg.__wbg_getContext_02d86c7d9cfa709e = function () {
      return handleError(function (e, n, r) {
        const t = e.getContext(getStringFromWasm0(n, r));
        return isLikeNone(t) ? 0 : addToExternrefTable0(t);
      }, arguments);
    }),
    (e.wbg.__wbg_getContext_24d4414b979c1bbd = function () {
      return handleError(function (e, n, r) {
        const t = e.getContext(getStringFromWasm0(n, r));
        return isLikeNone(t) ? 0 : addToExternrefTable0(t);
      }, arguments);
    }),
    (e.wbg.__wbg_getContext_74e4f1560c2a2fae = function () {
      return handleError(function (e, n, r, t) {
        const _ = e.getContext(getStringFromWasm0(n, r), t);
        return isLikeNone(_) ? 0 : addToExternrefTable0(_);
      }, arguments);
    }),
    (e.wbg.__wbg_getContext_b22f05fca7ddb494 = function () {
      return handleError(function (e, n, r, t) {
        const _ = e.getContext(getStringFromWasm0(n, r), t);
        return isLikeNone(_) ? 0 : addToExternrefTable0(_);
      }, arguments);
    }),
    (e.wbg.__wbg_getCurrentTexture_5a79cda2ff36e1ee = function (e) {
      return e.getCurrentTexture();
    }),
    (e.wbg.__wbg_getElementById_7b2db24a9b54f077 = function (e, n, r) {
      const t = e.getElementById(getStringFromWasm0(n, r));
      return isLikeNone(t) ? 0 : addToExternrefTable0(t);
    }),
    (e.wbg.__wbg_getExtension_28666bdc87d23aca = function () {
      return handleError(function (e, n, r) {
        const t = e.getExtension(getStringFromWasm0(n, r));
        return isLikeNone(t) ? 0 : addToExternrefTable0(t);
      }, arguments);
    }),
    (e.wbg.__wbg_getIndexedParameter_f9e7220a3bb8862c = function () {
      return handleError(function (e, n, r) {
        return e.getIndexedParameter(n >>> 0, r >>> 0);
      }, arguments);
    }),
    (e.wbg.__wbg_getMappedRange_932dd043ae22ee0a = function (e, n, r) {
      return e.getMappedRange(n, r);
    }),
    (e.wbg.__wbg_getOwnPropertyDescriptor_c701b185423f5b7e = function (e, n) {
      return Object.getOwnPropertyDescriptor(e, n);
    }),
    (e.wbg.__wbg_getParameter_304cffb9a759dc04 = function () {
      return handleError(function (e, n) {
        return e.getParameter(n >>> 0);
      }, arguments);
    }),
    (e.wbg.__wbg_getParameter_fd65bc6ff1b0ffd9 = function () {
      return handleError(function (e, n) {
        return e.getParameter(n >>> 0);
      }, arguments);
    }),
    (e.wbg.__wbg_getPreferredCanvasFormat_de73c02773a5209e = function (e) {
      const n = e.getPreferredCanvasFormat();
      return (__wbindgen_enum_GpuTextureFormat.indexOf(n) + 1 || 96) - 1;
    }),
    (e.wbg.__wbg_getProgramInfoLog_032aac3e6f3a253c = function (e, n, r) {
      const t = n.getProgramInfoLog(r);
      var _ = isLikeNone(t) ? 0 : passStringToWasm0(t, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
        a = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(e + 4, a, !0), getDataViewMemory0().setInt32(e + 0, _, !0);
    }),
    (e.wbg.__wbg_getProgramInfoLog_039168c2aed8d3fe = function (e, n, r) {
      const t = n.getProgramInfoLog(r);
      var _ = isLikeNone(t) ? 0 : passStringToWasm0(t, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
        a = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(e + 4, a, !0), getDataViewMemory0().setInt32(e + 0, _, !0);
    }),
    (e.wbg.__wbg_getProgramParameter_70b22019524689fa = function (e, n, r) {
      return e.getProgramParameter(n, r >>> 0);
    }),
    (e.wbg.__wbg_getProgramParameter_9b3bdf8d90159edb = function (e, n, r) {
      return e.getProgramParameter(n, r >>> 0);
    }),
    (e.wbg.__wbg_getPropertyValue_e87121b8549f72d5 = function () {
      return handleError(function (e, n, r, t) {
        const _ = passStringToWasm0(n.getPropertyValue(getStringFromWasm0(r, t)), wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
          a = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(e + 4, a, !0), getDataViewMemory0().setInt32(e + 0, _, !0);
      }, arguments);
    }),
    (e.wbg.__wbg_getQueryParameter_e7b02fe5fd64baa5 = function (e, n, r) {
      return e.getQueryParameter(n, r >>> 0);
    }),
    (e.wbg.__wbg_getRandomValues_bcb4912f16000dc4 = function () {
      return handleError(function (e, n) {
        e.getRandomValues(n);
      }, arguments);
    }),
    (e.wbg.__wbg_getShaderInfoLog_5c7d45bafe3be3dd = function (e, n, r) {
      const t = n.getShaderInfoLog(r);
      var _ = isLikeNone(t) ? 0 : passStringToWasm0(t, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
        a = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(e + 4, a, !0), getDataViewMemory0().setInt32(e + 0, _, !0);
    }),
    (e.wbg.__wbg_getShaderInfoLog_d2cc881ce343a733 = function (e, n, r) {
      const t = n.getShaderInfoLog(r);
      var _ = isLikeNone(t) ? 0 : passStringToWasm0(t, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
        a = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(e + 4, a, !0), getDataViewMemory0().setInt32(e + 0, _, !0);
    }),
    (e.wbg.__wbg_getShaderParameter_6d0578dd9f58b684 = function (e, n, r) {
      return e.getShaderParameter(n, r >>> 0);
    }),
    (e.wbg.__wbg_getShaderParameter_c50fbeadf9ef6879 = function (e, n, r) {
      return e.getShaderParameter(n, r >>> 0);
    }),
    (e.wbg.__wbg_getSupportedExtensions_fca342bac23691db = function (e) {
      const n = e.getSupportedExtensions();
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_getSupportedProfiles_b2cc3aec569a65fa = function (e) {
      const n = e.getSupportedProfiles();
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_getSyncParameter_5688138f66b57b16 = function (e, n, r) {
      return e.getSyncParameter(n, r >>> 0);
    }),
    (e.wbg.__wbg_getUniformBlockIndex_b53609b8ecff8b48 = function (e, n, r, t) {
      return e.getUniformBlockIndex(n, getStringFromWasm0(r, t));
    }),
    (e.wbg.__wbg_getUniformLocation_852fbe42afe106ff = function (e, n, r, t) {
      const _ = e.getUniformLocation(n, getStringFromWasm0(r, t));
      return isLikeNone(_) ? 0 : addToExternrefTable0(_);
    }),
    (e.wbg.__wbg_getUniformLocation_9d46a65011600cce = function (e, n, r, t) {
      const _ = e.getUniformLocation(n, getStringFromWasm0(r, t));
      return isLikeNone(_) ? 0 : addToExternrefTable0(_);
    }),
    (e.wbg.__wbg_get_68aa371864aa301a = function (e, n) {
      return e[n >>> 0];
    }),
    (e.wbg.__wbg_get_6b316bfdb1b95076 = function (e, n) {
      const r = e[n >>> 0];
      return isLikeNone(r) ? 0 : addToExternrefTable0(r);
    }),
    (e.wbg.__wbg_get_92a4780a3beb5fe9 = function () {
      return handleError(function (e, n) {
        return Reflect.get(e, n);
      }, arguments);
    }),
    (e.wbg.__wbg_globalThis_1e2ac1d6eee845b3 = function () {
      return handleError(function () {
        return globalThis.globalThis;
      }, arguments);
    }),
    (e.wbg.__wbg_global_f25a574ae080367c = function () {
      return handleError(function () {
        return global.global;
      }, arguments);
    }),
    (e.wbg.__wbg_gpu_87871e8f7ace8fee = function (e) {
      return e.gpu;
    }),
    (e.wbg.__wbg_has_624cbf0451d880e8 = function (e, n, r) {
      return e.has(getStringFromWasm0(n, r));
    }),
    (e.wbg.__wbg_height_4065e49e5ec4c4c1 = function (e) {
      return e.height;
    }),
    (e.wbg.__wbg_height_51a97623165c9beb = function (e) {
      return e.height;
    }),
    (e.wbg.__wbg_height_74bc8ec7548ff6b6 = function (e) {
      return e.height;
    }),
    (e.wbg.__wbg_height_a196a7b9b1d7e01c = function (e) {
      return e.height;
    }),
    (e.wbg.__wbg_height_cabc0c8a4c838304 = function (e) {
      return e.height;
    }),
    (e.wbg.__wbg_height_e509816ec3fdf5b1 = function (e) {
      return e.height;
    }),
    (e.wbg.__wbg_includes_959087f4155febdf = function (e, n, r) {
      return e.includes(n, r);
    }),
    (e.wbg.__wbg_info_b6bd3cb6471c2b4c = function (e) {
      console.info(e);
    }),
    (e.wbg.__wbg_inlineSize_6f8d0983462c2919 = function (e) {
      return e.inlineSize;
    }),
    (e.wbg.__wbg_innerHeight_7b90591a896a67c3 = function () {
      return handleError(function (e) {
        return e.innerHeight;
      }, arguments);
    }),
    (e.wbg.__wbg_innerWidth_712558d2709f1c4b = function () {
      return handleError(function (e) {
        return e.innerWidth;
      }, arguments);
    }),
    (e.wbg.__wbg_instanceof_GpuAdapter_0731153d2b08720b = function (e) {
      let n;
      try {
        n = e instanceof GPUAdapter;
      } catch (e) {
        n = !1;
      }
      return n;
    }),
    (e.wbg.__wbg_instanceof_GpuCanvasContext_d14121c7bd72fcef = function (e) {
      let n;
      try {
        n = e instanceof GPUCanvasContext;
      } catch (e) {
        n = !1;
      }
      return n;
    }),
    (e.wbg.__wbg_instanceof_GpuDeviceLostInfo_a3677ebb8241d800 = function (e) {
      let n;
      try {
        n = e instanceof GPUDeviceLostInfo;
      } catch (e) {
        n = !1;
      }
      return n;
    }),
    (e.wbg.__wbg_instanceof_GpuOutOfMemoryError_391d9a08edbfa04b = function (e) {
      let n;
      try {
        n = e instanceof GPUOutOfMemoryError;
      } catch (e) {
        n = !1;
      }
      return n;
    }),
    (e.wbg.__wbg_instanceof_GpuValidationError_f4d803c383da3c92 = function (e) {
      let n;
      try {
        n = e instanceof GPUValidationError;
      } catch (e) {
        n = !1;
      }
      return n;
    }),
    (e.wbg.__wbg_instanceof_HtmlCanvasElement_9db0dfd54b2c5330 = function (e) {
      let n;
      try {
        n = e instanceof HTMLCanvasElement;
      } catch (e) {
        n = !1;
      }
      return n;
    }),
    (e.wbg.__wbg_instanceof_Object_f0f57d6eeca1b81d = function (e) {
      let n;
      try {
        n = e instanceof Object;
      } catch (e) {
        n = !1;
      }
      return n;
    }),
    (e.wbg.__wbg_instanceof_WebGl2RenderingContext_888701598b82d45d = function (e) {
      let n;
      try {
        n = e instanceof WebGL2RenderingContext;
      } catch (e) {
        n = !1;
      }
      return n;
    }),
    (e.wbg.__wbg_instanceof_Window_a959820eb267fe22 = function (e) {
      let n;
      try {
        n = e instanceof Window;
      } catch (e) {
        n = !1;
      }
      return n;
    }),
    (e.wbg.__wbg_invalidateFramebuffer_f4a994f4a8535cca = function () {
      return handleError(function (e, n, r) {
        e.invalidateFramebuffer(n >>> 0, r);
      }, arguments);
    }),
    (e.wbg.__wbg_isIntersecting_9059d5bcaf29f415 = function (e) {
      return e.isIntersecting;
    }),
    (e.wbg.__wbg_is_20768e55ad2a7c3f = function (e, n) {
      return Object.is(e, n);
    }),
    (e.wbg.__wbg_key_02315cd3f595756b = function (e, n) {
      const r = passStringToWasm0(n.key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
        t = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(e + 4, t, !0), getDataViewMemory0().setInt32(e + 0, r, !0);
    }),
    (e.wbg.__wbg_label_2082ab37d2ad170d = function (e, n) {
      const r = passStringToWasm0(n.label, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
        t = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(e + 4, t, !0), getDataViewMemory0().setInt32(e + 0, r, !0);
    }),
    (e.wbg.__wbg_length_2e63ba34c4121df5 = function (e) {
      return e.length;
    }),
    (e.wbg.__wbg_length_9df32f7add647235 = function (e) {
      return e.length;
    }),
    (e.wbg.__wbg_length_e74df4881604f1d9 = function (e) {
      return e.length;
    }),
    (e.wbg.__wbg_limits_2dd632c891786ddf = function (e) {
      return e.limits;
    }),
    (e.wbg.__wbg_limits_f6411f884b0b2d62 = function (e) {
      return e.limits;
    }),
    (e.wbg.__wbg_lineNum_0246de1e072ffe19 = function (e) {
      return e.lineNum;
    }),
    (e.wbg.__wbg_linkProgram_575f761eda0a14bc = function (e, n) {
      e.linkProgram(n);
    }),
    (e.wbg.__wbg_linkProgram_5eee13e603e9af41 = function (e, n) {
      e.linkProgram(n);
    }),
    (e.wbg.__wbg_location_e9eba129bf0612a5 = function (e) {
      return e.location;
    }),
    (e.wbg.__wbg_log_d818ca3cab23fc77 = function (e) {
      console.log(e);
    }),
    (e.wbg.__wbg_lost_6e4d29847ce2a34a = function (e) {
      return e.lost;
    }),
    (e.wbg.__wbg_mapAsync_37f5e03edf2e1352 = function (e, n, r, t) {
      return e.mapAsync(n >>> 0, r, t);
    }),
    (e.wbg.__wbg_matchMedia_0be65181eeae951c = function () {
      return handleError(function (e, n, r) {
        const t = e.matchMedia(getStringFromWasm0(n, r));
        return isLikeNone(t) ? 0 : addToExternrefTable0(t);
      }, arguments);
    }),
    (e.wbg.__wbg_matches_254463383aee4688 = function (e) {
      return e.matches;
    }),
    (e.wbg.__wbg_maxBindGroups_768ca5e8623bf450 = function (e) {
      return e.maxBindGroups;
    }),
    (e.wbg.__wbg_maxBindingsPerBindGroup_057972d600d69719 = function (e) {
      return e.maxBindingsPerBindGroup;
    }),
    (e.wbg.__wbg_maxBufferSize_e237b44f19a5a62b = function (e) {
      return e.maxBufferSize;
    }),
    (e.wbg.__wbg_maxColorAttachmentBytesPerSample_d6c7b4051d22c6d6 = function (e) {
      return e.maxColorAttachmentBytesPerSample;
    }),
    (e.wbg.__wbg_maxColorAttachments_7a18ba24c05edcfd = function (e) {
      return e.maxColorAttachments;
    }),
    (e.wbg.__wbg_maxComputeInvocationsPerWorkgroup_b99c2f3611633992 = function (e) {
      return e.maxComputeInvocationsPerWorkgroup;
    }),
    (e.wbg.__wbg_maxComputeWorkgroupSizeX_adb26da9ed7f77f7 = function (e) {
      return e.maxComputeWorkgroupSizeX;
    }),
    (e.wbg.__wbg_maxComputeWorkgroupSizeY_cc217559c98be33b = function (e) {
      return e.maxComputeWorkgroupSizeY;
    }),
    (e.wbg.__wbg_maxComputeWorkgroupSizeZ_66606a80e2cf2309 = function (e) {
      return e.maxComputeWorkgroupSizeZ;
    }),
    (e.wbg.__wbg_maxComputeWorkgroupStorageSize_cb6235497b8c4997 = function (e) {
      return e.maxComputeWorkgroupStorageSize;
    }),
    (e.wbg.__wbg_maxComputeWorkgroupsPerDimension_6bf550b5f21d57cf = function (e) {
      return e.maxComputeWorkgroupsPerDimension;
    }),
    (e.wbg.__wbg_maxDynamicStorageBuffersPerPipelineLayout_c6ac20334e328b47 = function (e) {
      return e.maxDynamicStorageBuffersPerPipelineLayout;
    }),
    (e.wbg.__wbg_maxDynamicUniformBuffersPerPipelineLayout_aa8f14a74b440f01 = function (e) {
      return e.maxDynamicUniformBuffersPerPipelineLayout;
    }),
    (e.wbg.__wbg_maxSampledTexturesPerShaderStage_db7c4922cc60144a = function (e) {
      return e.maxSampledTexturesPerShaderStage;
    }),
    (e.wbg.__wbg_maxSamplersPerShaderStage_538705fe2263e710 = function (e) {
      return e.maxSamplersPerShaderStage;
    }),
    (e.wbg.__wbg_maxStorageBufferBindingSize_32178c0f5f7f85cb = function (e) {
      return e.maxStorageBufferBindingSize;
    }),
    (e.wbg.__wbg_maxStorageBuffersPerShaderStage_9f67e9eae0089f77 = function (e) {
      return e.maxStorageBuffersPerShaderStage;
    }),
    (e.wbg.__wbg_maxStorageTexturesPerShaderStage_57239664936031cf = function (e) {
      return e.maxStorageTexturesPerShaderStage;
    }),
    (e.wbg.__wbg_maxTextureArrayLayers_db5d4e486c78ae04 = function (e) {
      return e.maxTextureArrayLayers;
    }),
    (e.wbg.__wbg_maxTextureDimension1D_3475085ffacabbdc = function (e) {
      return e.maxTextureDimension1D;
    }),
    (e.wbg.__wbg_maxTextureDimension2D_7c8d5ecf09eb8519 = function (e) {
      return e.maxTextureDimension2D;
    }),
    (e.wbg.__wbg_maxTextureDimension3D_8bd976677a0f91d4 = function (e) {
      return e.maxTextureDimension3D;
    }),
    (e.wbg.__wbg_maxUniformBufferBindingSize_95b1a54e7e4a0f0f = function (e) {
      return e.maxUniformBufferBindingSize;
    }),
    (e.wbg.__wbg_maxUniformBuffersPerShaderStage_5f475d9a453af14d = function (e) {
      return e.maxUniformBuffersPerShaderStage;
    }),
    (e.wbg.__wbg_maxVertexAttributes_4c48ca2f5d32f860 = function (e) {
      return e.maxVertexAttributes;
    }),
    (e.wbg.__wbg_maxVertexBufferArrayStride_2233f6933ecc5a16 = function (e) {
      return e.maxVertexBufferArrayStride;
    }),
    (e.wbg.__wbg_maxVertexBuffers_c47e508cd7348554 = function (e) {
      return e.maxVertexBuffers;
    }),
    (e.wbg.__wbg_media_8db09f09635587da = function (e, n) {
      const r = passStringToWasm0(n.media, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
        t = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(e + 4, t, !0), getDataViewMemory0().setInt32(e + 0, r, !0);
    }),
    (e.wbg.__wbg_message_0762358e59db7ed6 = function (e, n) {
      const r = passStringToWasm0(n.message, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
        t = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(e + 4, t, !0), getDataViewMemory0().setInt32(e + 0, r, !0);
    }),
    (e.wbg.__wbg_message_7957ab09f64c6822 = function (e, n) {
      const r = passStringToWasm0(n.message, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
        t = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(e + 4, t, !0), getDataViewMemory0().setInt32(e + 0, r, !0);
    }),
    (e.wbg.__wbg_message_b163994503433c9e = function (e, n) {
      const r = passStringToWasm0(n.message, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
        t = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(e + 4, t, !0), getDataViewMemory0().setInt32(e + 0, r, !0);
    }),
    (e.wbg.__wbg_messages_da071582f72bc978 = function (e) {
      return e.messages;
    }),
    (e.wbg.__wbg_metaKey_34d5658170ffb3ee = function (e) {
      return e.metaKey;
    }),
    (e.wbg.__wbg_metaKey_6c8e9228e8dda152 = function (e) {
      return e.metaKey;
    }),
    (e.wbg.__wbg_minStorageBufferOffsetAlignment_51b4801fac3a58de = function (e) {
      return e.minStorageBufferOffsetAlignment;
    }),
    (e.wbg.__wbg_minUniformBufferOffsetAlignment_5d62a77924b2335f = function (e) {
      return e.minUniformBufferOffsetAlignment;
    }),
    (e.wbg.__wbg_movementX_e32c342d96d1c701 = function (e) {
      return e.movementX;
    }),
    (e.wbg.__wbg_movementY_136c6febb976ca3b = function (e) {
      return e.movementY;
    }),
    (e.wbg.__wbg_msCrypto_0a36e2ec3a343d26 = function (e) {
      return e.msCrypto;
    }),
    (e.wbg.__wbg_navigator_2936a93ec3c6f4c5 = function (e) {
      return e.navigator;
    }),
    (e.wbg.__wbg_navigator_da495c9e52e160b1 = function (e) {
      return e.navigator;
    }),
    (e.wbg.__wbg_new_076cac58bb698dd4 = function () {
      return new Object();
    }),
    (e.wbg.__wbg_new_0c28e72025e00594 = function () {
      return new Array();
    }),
    (e.wbg.__wbg_new_23362fa370a0a372 = function (e) {
      return new Uint8Array(e);
    }),
    (e.wbg.__wbg_new_238671e08bf4fcbb = function () {
      return handleError(function () {
        return new MessageChannel();
      }, arguments);
    }),
    (e.wbg.__wbg_new_4b15073a88792687 = function () {
      return handleError(function (e) {
        return new ResizeObserver(e);
      }, arguments);
    }),
    (e.wbg.__wbg_new_8a6f238a6ece86ea = function () {
      return new Error();
    }),
    (e.wbg.__wbg_new_93cf40e4f48fe902 = function () {
      return handleError(function () {
        return new AbortController();
      }, arguments);
    }),
    (e.wbg.__wbg_new_b4a18f0a618c89f2 = function () {
      return handleError(function (e, n) {
        return new Worker(getStringFromWasm0(e, n));
      }, arguments);
    }),
    (e.wbg.__wbg_new_c94d990936d8ea5d = function () {
      return handleError(function (e) {
        return new IntersectionObserver(e);
      }, arguments);
    }),
    (e.wbg.__wbg_newnoargs_19a249f4eceaaac3 = function (e, n) {
      return new Function(getStringFromWasm0(e, n));
    }),
    (e.wbg.__wbg_newwithbyteoffsetandlength_24ff09a6b37a856f = function (e, n, r) {
      return new Int16Array(e, n >>> 0, r >>> 0);
    }),
    (e.wbg.__wbg_newwithbyteoffsetandlength_25d3cac011b6e2d5 = function (e, n, r) {
      return new Uint32Array(e, n >>> 0, r >>> 0);
    }),
    (e.wbg.__wbg_newwithbyteoffsetandlength_457c61bfe0fb7b8c = function (e, n, r) {
      return new Int32Array(e, n >>> 0, r >>> 0);
    }),
    (e.wbg.__wbg_newwithbyteoffsetandlength_9f48300371c8802a = function (e, n, r) {
      return new Uint16Array(e, n >>> 0, r >>> 0);
    }),
    (e.wbg.__wbg_newwithbyteoffsetandlength_a6087a94c7bfea61 = function (e, n, r) {
      return new Int8Array(e, n >>> 0, r >>> 0);
    }),
    (e.wbg.__wbg_newwithbyteoffsetandlength_c280c15b00e018cd = function (e, n, r) {
      return new Float32Array(e, n >>> 0, r >>> 0);
    }),
    (e.wbg.__wbg_newwithbyteoffsetandlength_ee8def7000b7b2be = function (e, n, r) {
      return new Uint8Array(e, n >>> 0, r >>> 0);
    }),
    (e.wbg.__wbg_newwithlength_91de49dea5643c87 = function (e) {
      return new Uint8Array(e >>> 0);
    }),
    (e.wbg.__wbg_newwithstrsequenceandoptions_af096ce40d9d9ac8 = function () {
      return handleError(function (e, n) {
        return new Blob(e, n);
      }, arguments);
    }),
    (e.wbg.__wbg_node_02999533c4ea02e3 = function (e) {
      return e.node;
    }),
    (e.wbg.__wbg_now_2c95c9de01293173 = function (e) {
      return e.now();
    }),
    (e.wbg.__wbg_now_5b0cbad8de553ec4 = function (e) {
      return e.now();
    }),
    (e.wbg.__wbg_observe_e2208b07fe315de7 = function (e, n) {
      e.observe(n);
    }),
    (e.wbg.__wbg_observe_ec91d62599b7772b = function (e, n) {
      e.observe(n);
    }),
    (e.wbg.__wbg_observe_fd48955513eca909 = function (e, n, r) {
      e.observe(n, r);
    }),
    (e.wbg.__wbg_of_2f6232d86af7992c = function (e, n) {
      return Array.of(e, n);
    }),
    (e.wbg.__wbg_of_5ae3a2d893e18853 = function (e) {
      return Array.of(e);
    }),
    (e.wbg.__wbg_offsetX_d6957d052a0d4b11 = function (e) {
      return e.offsetX;
    }),
    (e.wbg.__wbg_offsetY_076edde514bf80f4 = function (e) {
      return e.offsetY;
    }),
    (e.wbg.__wbg_offset_336f14c993863b76 = function (e) {
      return e.offset;
    }),
    (e.wbg.__wbg_performance_7a3ffd0b17f663ad = function (e) {
      return e.performance;
    }),
    (e.wbg.__wbg_persisted_7e044507e52804d9 = function (e) {
      return e.persisted;
    }),
    (e.wbg.__wbg_pixelStorei_198b92c3e346678a = function (e, n, r) {
      e.pixelStorei(n >>> 0, r);
    }),
    (e.wbg.__wbg_pixelStorei_9c4cb0a4b040b41d = function (e, n, r) {
      e.pixelStorei(n >>> 0, r);
    }),
    (e.wbg.__wbg_play_e7eb90a843114e0d = function (e) {
      e.play();
    }),
    (e.wbg.__wbg_pointerId_a2cbd2cdd6da90b2 = function (e) {
      return e.pointerId;
    }),
    (e.wbg.__wbg_pointerType_1b74686427cdec29 = function (e, n) {
      const r = passStringToWasm0(n.pointerType, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
        t = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(e + 4, t, !0), getDataViewMemory0().setInt32(e + 0, r, !0);
    }),
    (e.wbg.__wbg_polygonOffset_7ec31dee95d41171 = function (e, n, r) {
      e.polygonOffset(n, r);
    }),
    (e.wbg.__wbg_polygonOffset_c6cbc8093770e840 = function (e, n, r) {
      e.polygonOffset(n, r);
    }),
    (e.wbg.__wbg_popErrorScope_af0b22f136a861d6 = function (e) {
      return e.popErrorScope();
    }),
    (e.wbg.__wbg_port1_6f5b26fd23d19536 = function (e) {
      return e.port1;
    }),
    (e.wbg.__wbg_port2_2eb4c961d6df5816 = function (e) {
      return e.port2;
    }),
    (e.wbg.__wbg_postMessage_33dcf5caa3589c64 = function () {
      return handleError(function (e, n, r) {
        e.postMessage(n, r);
      }, arguments);
    }),
    (e.wbg.__wbg_postMessage_3e7f3215320b4a9c = function () {
      return handleError(function (e, n) {
        e.postMessage(n);
      }, arguments);
    }),
    (e.wbg.__wbg_postTask_9ba4c3cedae00b38 = function (e, n, r) {
      return e.postTask(n, r);
    }),
    (e.wbg.__wbg_pressure_8707a47b6fb1c1fd = function (e) {
      return e.pressure;
    }),
    (e.wbg.__wbg_preventDefault_faafffcaad92972d = function (e) {
      e.preventDefault();
    }),
    (e.wbg.__wbg_process_5c1d670bc53614b8 = function (e) {
      return e.process;
    }),
    (e.wbg.__wbg_prototype_0f68911d93450df4 = function () {
      return ResizeObserverEntry.prototype;
    }),
    (e.wbg.__wbg_pushErrorScope_b52914ff10ba6ce3 = function (e, n) {
      e.pushErrorScope(__wbindgen_enum_GpuErrorFilter[n]);
    }),
    (e.wbg.__wbg_push_3e9ce81246ef1d1b = function (e, n) {
      return e.push(n);
    }),
    (e.wbg.__wbg_queryCounterEXT_6da4ab4ec9c37329 = function (e, n, r) {
      e.queryCounterEXT(n, r >>> 0);
    }),
    (e.wbg.__wbg_querySelectorAll_775f04e6f26ad643 = function () {
      return handleError(function (e, n, r) {
        return e.querySelectorAll(getStringFromWasm0(n, r));
      }, arguments);
    }),
    (e.wbg.__wbg_querySelector_473a7bd6647e7cbb = function () {
      return handleError(function (e, n, r) {
        const t = e.querySelector(getStringFromWasm0(n, r));
        return isLikeNone(t) ? 0 : addToExternrefTable0(t);
      }, arguments);
    }),
    (e.wbg.__wbg_queueMicrotask_3d422e1ba49c2500 = function (e) {
      return e.queueMicrotask;
    }),
    (e.wbg.__wbg_queueMicrotask_5fc3e400ac3c03f4 = function (e) {
      queueMicrotask(e);
    }),
    (e.wbg.__wbg_queueMicrotask_f301663ccadbb7d0 = function (e) {
      queueMicrotask(e);
    }),
    (e.wbg.__wbg_queue_bea4017efaaf9904 = function (e) {
      return e.queue;
    }),
    (e.wbg.__wbg_randomFillSync_ab2cfe79ebbf2740 = function () {
      return handleError(function (e, n) {
        e.randomFillSync(n);
      }, arguments);
    }),
    (e.wbg.__wbg_readBuffer_8fd1512f6bdfc8f0 = function (e, n) {
      e.readBuffer(n >>> 0);
    }),
    (e.wbg.__wbg_readPixels_48fc96a447cda9aa = function () {
      return handleError(function (e, n, r, t, _, a, b, o) {
        e.readPixels(n, r, t, _, a >>> 0, b >>> 0, o);
      }, arguments);
    }),
    (e.wbg.__wbg_readPixels_7b1022930a9026d1 = function () {
      return handleError(function (e, n, r, t, _, a, b, o) {
        e.readPixels(n, r, t, _, a >>> 0, b >>> 0, o);
      }, arguments);
    }),
    (e.wbg.__wbg_readPixels_da6e94b84b4cfd41 = function () {
      return handleError(function (e, n, r, t, _, a, b, o) {
        e.readPixels(n, r, t, _, a >>> 0, b >>> 0, o);
      }, arguments);
    }),
    (e.wbg.__wbg_reason_43acd39cce242b50 = function (e) {
      const n = e.reason;
      return (__wbindgen_enum_GpuDeviceLostReason.indexOf(n) + 1 || 3) - 1;
    }),
    (e.wbg.__wbg_removeEventListener_d14a328308e427ba = function () {
      return handleError(function (e, n, r, t) {
        e.removeEventListener(getStringFromWasm0(n, r), t);
      }, arguments);
    }),
    (e.wbg.__wbg_removeListener_aee72eb2e5fba09c = function () {
      return handleError(function (e, n) {
        e.removeListener(n);
      }, arguments);
    }),
    (e.wbg.__wbg_removeProperty_902c73a4430b3e54 = function () {
      return handleError(function (e, n, r, t) {
        const _ = passStringToWasm0(n.removeProperty(getStringFromWasm0(r, t)), wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
          a = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(e + 4, a, !0), getDataViewMemory0().setInt32(e + 0, _, !0);
      }, arguments);
    }),
    (e.wbg.__wbg_renderbufferStorageMultisample_abd1099fecb2e2a4 = function (e, n, r, t, _, a) {
      e.renderbufferStorageMultisample(n >>> 0, r, t >>> 0, _, a);
    }),
    (e.wbg.__wbg_renderbufferStorage_56c61eb0bb2718a9 = function (e, n, r, t, _) {
      e.renderbufferStorage(n >>> 0, r >>> 0, t, _);
    }),
    (e.wbg.__wbg_renderbufferStorage_aa4b58453d5aca0f = function (e, n, r, t, _) {
      e.renderbufferStorage(n >>> 0, r >>> 0, t, _);
    }),
    (e.wbg.__wbg_repeat_56fa20e30d00be95 = function (e) {
      return e.repeat;
    }),
    (e.wbg.__wbg_requestAdapter_e6dcfac497cafa7a = function (e, n) {
      return e.requestAdapter(n);
    }),
    (e.wbg.__wbg_requestAnimationFrame_e8ca543d07df528e = function () {
      return handleError(function (e, n) {
        return e.requestAnimationFrame(n);
      }, arguments);
    }),
    (e.wbg.__wbg_requestDevice_03b802707d5a382c = function (e, n) {
      return e.requestDevice(n);
    }),
    (e.wbg.__wbg_requestFullscreen_e1ad8752a4e33f7e = function (e) {
      return e.requestFullscreen;
    }),
    (e.wbg.__wbg_requestFullscreen_f727b1f250ebb10a = function (e) {
      return e.requestFullscreen();
    }),
    (e.wbg.__wbg_requestIdleCallback_773c554fc8c5a310 = function (e) {
      return e.requestIdleCallback;
    }),
    (e.wbg.__wbg_requestIdleCallback_ba1f658c72e2140c = function () {
      return handleError(function (e, n) {
        return e.requestIdleCallback(n);
      }, arguments);
    }),
    (e.wbg.__wbg_require_79b1e9274cde3c87 = function () {
      return handleError(function () {
        return module.require;
      }, arguments);
    }),
    (e.wbg.__wbg_resolveQuerySet_811661fb23f3b699 = function (e, n, r, t, _, a) {
      e.resolveQuerySet(n, r >>> 0, t >>> 0, _, a >>> 0);
    }),
    (e.wbg.__wbg_resolve_6a311e8bb26423ab = function (e) {
      return Promise.resolve(e);
    }),
    (e.wbg.__wbg_revokeObjectURL_3e4ad6d46a9a93f1 = function () {
      return handleError(function (e, n) {
        URL.revokeObjectURL(getStringFromWasm0(e, n));
      }, arguments);
    }),
    (e.wbg.__wbg_samplerParameterf_a9708333dc0df03e = function (e, n, r, t) {
      e.samplerParameterf(n, r >>> 0, t);
    }),
    (e.wbg.__wbg_samplerParameteri_6011eca3eaa96ac6 = function (e, n, r, t) {
      e.samplerParameteri(n, r >>> 0, t);
    }),
    (e.wbg.__wbg_scheduler_10edeee35a76c7c6 = function (e) {
      return e.scheduler;
    }),
    (e.wbg.__wbg_scheduler_6d71128f17fbca34 = function (e) {
      return e.scheduler;
    }),
    (e.wbg.__wbg_scissor_4c06926fa8af817c = function (e, n, r, t, _) {
      e.scissor(n, r, t, _);
    }),
    (e.wbg.__wbg_scissor_608c4f610141e6df = function (e, n, r, t, _) {
      e.scissor(n, r, t, _);
    }),
    (e.wbg.__wbg_self_ac4343e4047b83cc = function () {
      return handleError(function () {
        return self.self;
      }, arguments);
    }),
    (e.wbg.__wbg_setAttribute_e5d83ecaf7f586d5 = function () {
      return handleError(function (e, n, r, t, _) {
        e.setAttribute(getStringFromWasm0(n, r), getStringFromWasm0(t, _));
      }, arguments);
    }),
    (e.wbg.__wbg_setBindGroup_62a3045b0921e429 = function (e, n, r, t, _, a, b) {
      e.setBindGroup(n >>> 0, r, getArrayU32FromWasm0(t, _), a, b >>> 0);
    }),
    (e.wbg.__wbg_setBindGroup_6c0fd18e9a53a945 = function (e, n, r) {
      e.setBindGroup(n >>> 0, r);
    }),
    (e.wbg.__wbg_setBindGroup_7f3b61f1f482133b = function (e, n, r) {
      e.setBindGroup(n >>> 0, r);
    }),
    (e.wbg.__wbg_setBindGroup_bf767a5aa46a33ce = function (e, n, r, t, _, a, b) {
      e.setBindGroup(n >>> 0, r, getArrayU32FromWasm0(t, _), a, b >>> 0);
    }),
    (e.wbg.__wbg_setBindGroup_c4aaff14063226b4 = function (e, n, r, t, _, a, b) {
      e.setBindGroup(n >>> 0, r, getArrayU32FromWasm0(t, _), a, b >>> 0);
    }),
    (e.wbg.__wbg_setBindGroup_f82e771dc1b69093 = function (e, n, r) {
      e.setBindGroup(n >>> 0, r);
    }),
    (e.wbg.__wbg_setBlendConstant_016723821cfb3aa4 = function (e, n) {
      e.setBlendConstant(n);
    }),
    (e.wbg.__wbg_setIndexBuffer_286a40afdff411b7 = function (e, n, r, t) {
      e.setIndexBuffer(n, __wbindgen_enum_GpuIndexFormat[r], t);
    }),
    (e.wbg.__wbg_setIndexBuffer_7efd0b7a40c65fb9 = function (e, n, r, t, _) {
      e.setIndexBuffer(n, __wbindgen_enum_GpuIndexFormat[r], t, _);
    }),
    (e.wbg.__wbg_setIndexBuffer_e091a9673bb575e2 = function (e, n, r, t) {
      e.setIndexBuffer(n, __wbindgen_enum_GpuIndexFormat[r], t);
    }),
    (e.wbg.__wbg_setIndexBuffer_f0759f00036f615f = function (e, n, r, t, _) {
      e.setIndexBuffer(n, __wbindgen_enum_GpuIndexFormat[r], t, _);
    }),
    (e.wbg.__wbg_setPipeline_ba92070b8ee81cf9 = function (e, n) {
      e.setPipeline(n);
    }),
    (e.wbg.__wbg_setPipeline_c344f76bae58c4d6 = function (e, n) {
      e.setPipeline(n);
    }),
    (e.wbg.__wbg_setPipeline_d76451c50a121598 = function (e, n) {
      e.setPipeline(n);
    }),
    (e.wbg.__wbg_setPointerCapture_6b89bc3d20c408af = function () {
      return handleError(function (e, n) {
        e.setPointerCapture(n);
      }, arguments);
    }),
    (e.wbg.__wbg_setProperty_b11b0bad191551d1 = function () {
      return handleError(function (e, n, r, t, _) {
        e.setProperty(getStringFromWasm0(n, r), getStringFromWasm0(t, _));
      }, arguments);
    }),
    (e.wbg.__wbg_setScissorRect_0b6ee0852ef0b6b9 = function (e, n, r, t, _) {
      e.setScissorRect(n >>> 0, r >>> 0, t >>> 0, _ >>> 0);
    }),
    (e.wbg.__wbg_setStencilReference_34fd3d59673a5a9d = function (e, n) {
      e.setStencilReference(n >>> 0);
    }),
    (e.wbg.__wbg_setTimeout_11f3c7cad8433a4f = function () {
      return handleError(function (e, n, r) {
        return e.setTimeout(n, r);
      }, arguments);
    }),
    (e.wbg.__wbg_setTimeout_15ba883433c836ab = function () {
      return handleError(function (e, n) {
        return e.setTimeout(n);
      }, arguments);
    }),
    (e.wbg.__wbg_setVertexBuffer_06a90dc78e1ad9c4 = function (e, n, r, t, _) {
      e.setVertexBuffer(n >>> 0, r, t, _);
    }),
    (e.wbg.__wbg_setVertexBuffer_1540e9118b6c451d = function (e, n, r, t) {
      e.setVertexBuffer(n >>> 0, r, t);
    }),
    (e.wbg.__wbg_setVertexBuffer_5166eedc06450701 = function (e, n, r, t, _) {
      e.setVertexBuffer(n >>> 0, r, t, _);
    }),
    (e.wbg.__wbg_setVertexBuffer_8621784e5014065b = function (e, n, r, t) {
      e.setVertexBuffer(n >>> 0, r, t);
    }),
    (e.wbg.__wbg_setViewport_731ad30abb13f744 = function (e, n, r, t, _, a, b) {
      e.setViewport(n, r, t, _, a, b);
    }),
    (e.wbg.__wbg_set_421385e996a16e02 = function () {
      return handleError(function (e, n, r) {
        return Reflect.set(e, n, r);
      }, arguments);
    }),
    (e.wbg.__wbg_set_7b70226104a82921 = function (e, n, r) {
      e.set(n, r >>> 0);
    }),
    (e.wbg.__wbg_setbox_f664fc1447c0b2bb = function (e, n) {
      e.box = __wbindgen_enum_ResizeObserverBoxOptions[n];
    }),
    (e.wbg.__wbg_setheight_4286b13b9186d39f = function (e, n) {
      e.height = n >>> 0;
    }),
    (e.wbg.__wbg_setheight_7632621fed149fd9 = function (e, n) {
      e.height = n >>> 0;
    }),
    (e.wbg.__wbg_setonmessage_1f177e6cba71d19d = function (e, n) {
      e.onmessage = n;
    }),
    (e.wbg.__wbg_setonuncapturederror_19541466822d790b = function (e, n) {
      e.onuncapturederror = n;
    }),
    (e.wbg.__wbg_settype_202db174d92fe493 = function (e, n, r) {
      e.type = getStringFromWasm0(n, r);
    }),
    (e.wbg.__wbg_setwidth_5e43e6e177d3e2ec = function (e, n) {
      e.width = n >>> 0;
    }),
    (e.wbg.__wbg_setwidth_db46810857c0f6bd = function (e, n) {
      e.width = n >>> 0;
    }),
    (e.wbg.__wbg_shaderSource_7d9e91c6b9aaf864 = function (e, n, r, t) {
      e.shaderSource(n, getStringFromWasm0(r, t));
    }),
    (e.wbg.__wbg_shaderSource_b7db90958962e1f7 = function (e, n, r, t) {
      e.shaderSource(n, getStringFromWasm0(r, t));
    }),
    (e.wbg.__wbg_shiftKey_570898b1142a9898 = function (e) {
      return e.shiftKey;
    }),
    (e.wbg.__wbg_shiftKey_e90da27a3092777e = function (e) {
      return e.shiftKey;
    }),
    (e.wbg.__wbg_signal_fd2d6d0644f16ad8 = function (e) {
      return e.signal;
    }),
    (e.wbg.__wbg_size_661bddb3f9898121 = function (e) {
      return e.size;
    }),
    (e.wbg.__wbg_stack_0ed75d68575b0f3c = function (e, n) {
      const r = passStringToWasm0(n.stack, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
        t = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(e + 4, t, !0), getDataViewMemory0().setInt32(e + 0, r, !0);
    }),
    (e.wbg.__wbg_start_a00c28f297559e1d = function (e) {
      e.start();
    }),
    (e.wbg.__wbg_stencilFuncSeparate_903776516b404f1e = function (e, n, r, t, _) {
      e.stencilFuncSeparate(n >>> 0, r >>> 0, t, _ >>> 0);
    }),
    (e.wbg.__wbg_stencilFuncSeparate_9987b0fe1f74adc3 = function (e, n, r, t, _) {
      e.stencilFuncSeparate(n >>> 0, r >>> 0, t, _ >>> 0);
    }),
    (e.wbg.__wbg_stencilMaskSeparate_24a5bad679d4896c = function (e, n, r) {
      e.stencilMaskSeparate(n >>> 0, r >>> 0);
    }),
    (e.wbg.__wbg_stencilMaskSeparate_5ade706794e0ff10 = function (e, n, r) {
      e.stencilMaskSeparate(n >>> 0, r >>> 0);
    }),
    (e.wbg.__wbg_stencilMask_8ccbc71e58e71b93 = function (e, n) {
      e.stencilMask(n >>> 0);
    }),
    (e.wbg.__wbg_stencilMask_e03561d8e6b7171a = function (e, n) {
      e.stencilMask(n >>> 0);
    }),
    (e.wbg.__wbg_stencilOpSeparate_13e313403862a2bc = function (e, n, r, t, _) {
      e.stencilOpSeparate(n >>> 0, r >>> 0, t >>> 0, _ >>> 0);
    }),
    (e.wbg.__wbg_stencilOpSeparate_e03fe45a6a83cf8f = function (e, n, r, t, _) {
      e.stencilOpSeparate(n >>> 0, r >>> 0, t >>> 0, _ >>> 0);
    }),
    (e.wbg.__wbg_style_e7c4e0938a7565b2 = function (e) {
      return e.style;
    }),
    (e.wbg.__wbg_subarray_b4e9772c34a7f5ba = function (e, n, r) {
      return e.subarray(n >>> 0, r >>> 0);
    }),
    (e.wbg.__wbg_submit_f635072bb3d05faa = function (e, n) {
      e.submit(n);
    }),
    (e.wbg.__wbg_texImage2D_102612af3b3ea301 = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f) {
        e.texImage2D(n >>> 0, r, t, _, a, b, o >>> 0, c >>> 0, f);
      }, arguments);
    }),
    (e.wbg.__wbg_texImage2D_38f7a3dc4dcf0183 = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f) {
        e.texImage2D(n >>> 0, r, t, _, a, b, o >>> 0, c >>> 0, f);
      }, arguments);
    }),
    (e.wbg.__wbg_texImage3D_4828de4d80648b9d = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f, i) {
        e.texImage3D(n >>> 0, r, t, _, a, b, o, c >>> 0, f >>> 0, i);
      }, arguments);
    }),
    (e.wbg.__wbg_texParameteri_2cc96bb59a67d4c2 = function (e, n, r, t) {
      e.texParameteri(n >>> 0, r >>> 0, t);
    }),
    (e.wbg.__wbg_texParameteri_8e4109b7fbd3b875 = function (e, n, r, t) {
      e.texParameteri(n >>> 0, r >>> 0, t);
    }),
    (e.wbg.__wbg_texStorage2D_728b9632dbd913e2 = function (e, n, r, t, _, a) {
      e.texStorage2D(n >>> 0, r, t >>> 0, _, a);
    }),
    (e.wbg.__wbg_texStorage3D_04d10ef19e465ec2 = function (e, n, r, t, _, a, b) {
      e.texStorage3D(n >>> 0, r, t >>> 0, _, a, b);
    }),
    (e.wbg.__wbg_texSubImage2D_0c095c30c73e34c0 = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f) {
        e.texSubImage2D(n >>> 0, r, t, _, a, b, o >>> 0, c >>> 0, f);
      }, arguments);
    }),
    (e.wbg.__wbg_texSubImage2D_3c9a9ceac3c27fe7 = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f) {
        e.texSubImage2D(n >>> 0, r, t, _, a, b, o >>> 0, c >>> 0, f);
      }, arguments);
    }),
    (e.wbg.__wbg_texSubImage2D_3dbb6fb895fd53a7 = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f) {
        e.texSubImage2D(n >>> 0, r, t, _, a, b, o >>> 0, c >>> 0, f);
      }, arguments);
    }),
    (e.wbg.__wbg_texSubImage2D_4e505a214a40fc20 = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f) {
        e.texSubImage2D(n >>> 0, r, t, _, a, b, o >>> 0, c >>> 0, f);
      }, arguments);
    }),
    (e.wbg.__wbg_texSubImage2D_7197aef4cdbc7d70 = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f) {
        e.texSubImage2D(n >>> 0, r, t, _, a, b, o >>> 0, c >>> 0, f);
      }, arguments);
    }),
    (e.wbg.__wbg_texSubImage2D_746d9e75d2dd12d1 = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f) {
        e.texSubImage2D(n >>> 0, r, t, _, a, b, o >>> 0, c >>> 0, f);
      }, arguments);
    }),
    (e.wbg.__wbg_texSubImage2D_ca1d7744b168aa02 = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f) {
        e.texSubImage2D(n >>> 0, r, t, _, a, b, o >>> 0, c >>> 0, f);
      }, arguments);
    }),
    (e.wbg.__wbg_texSubImage2D_da8455e8da280cee = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f) {
        e.texSubImage2D(n >>> 0, r, t, _, a, b, o >>> 0, c >>> 0, f);
      }, arguments);
    }),
    (e.wbg.__wbg_texSubImage3D_82336f6100e3ef24 = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f, i, g) {
        e.texSubImage3D(n >>> 0, r, t, _, a, b, o, c, f >>> 0, i >>> 0, g);
      }, arguments);
    }),
    (e.wbg.__wbg_texSubImage3D_831e19830a791320 = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f, i, g) {
        e.texSubImage3D(n >>> 0, r, t, _, a, b, o, c, f >>> 0, i >>> 0, g);
      }, arguments);
    }),
    (e.wbg.__wbg_texSubImage3D_9623fc609df925f5 = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f, i, g) {
        e.texSubImage3D(n >>> 0, r, t, _, a, b, o, c, f >>> 0, i >>> 0, g);
      }, arguments);
    }),
    (e.wbg.__wbg_texSubImage3D_9a8cb5676fdf0b50 = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f, i, g) {
        e.texSubImage3D(n >>> 0, r, t, _, a, b, o, c, f >>> 0, i >>> 0, g);
      }, arguments);
    }),
    (e.wbg.__wbg_texSubImage3D_a18f6424082a9393 = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f, i, g) {
        e.texSubImage3D(n >>> 0, r, t, _, a, b, o, c, f >>> 0, i >>> 0, g);
      }, arguments);
    }),
    (e.wbg.__wbg_texSubImage3D_d127dad275801f75 = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f, i, g) {
        e.texSubImage3D(n >>> 0, r, t, _, a, b, o, c, f >>> 0, i >>> 0, g);
      }, arguments);
    }),
    (e.wbg.__wbg_texSubImage3D_ebd1f2b229a92c5d = function () {
      return handleError(function (e, n, r, t, _, a, b, o, c, f, i, g) {
        e.texSubImage3D(n >>> 0, r, t, _, a, b, o, c, f >>> 0, i >>> 0, g);
      }, arguments);
    }),
    (e.wbg.__wbg_then_5c6469c1e1da9e59 = function (e, n) {
      return e.then(n);
    }),
    (e.wbg.__wbg_then_faeb8aed8c1629b7 = function (e, n, r) {
      return e.then(n, r);
    }),
    (e.wbg.__wbg_type_c0d5d83032e9858a = function (e) {
      const n = e.type;
      return (__wbindgen_enum_GpuCompilationMessageType.indexOf(n) + 1 || 4) - 1;
    }),
    (e.wbg.__wbg_uniform1f_163e6ffe0d9805a4 = function (e, n, r) {
      e.uniform1f(n, r);
    }),
    (e.wbg.__wbg_uniform1f_bb85eb8ed9248e52 = function (e, n, r) {
      e.uniform1f(n, r);
    }),
    (e.wbg.__wbg_uniform1i_9fe01b91ff85aa85 = function (e, n, r) {
      e.uniform1i(n, r);
    }),
    (e.wbg.__wbg_uniform1i_da7c764279d55bb5 = function (e, n, r) {
      e.uniform1i(n, r);
    }),
    (e.wbg.__wbg_uniform1ui_1cd8b5fee3b44787 = function (e, n, r) {
      e.uniform1ui(n, r >>> 0);
    }),
    (e.wbg.__wbg_uniform2fv_40e0cc0b3d7ab815 = function (e, n, r, t) {
      e.uniform2fv(n, getArrayF32FromWasm0(r, t));
    }),
    (e.wbg.__wbg_uniform2fv_d7ec4f77d2282f77 = function (e, n, r, t) {
      e.uniform2fv(n, getArrayF32FromWasm0(r, t));
    }),
    (e.wbg.__wbg_uniform2iv_6d1ed66fa019f1a6 = function (e, n, r, t) {
      e.uniform2iv(n, getArrayI32FromWasm0(r, t));
    }),
    (e.wbg.__wbg_uniform2iv_b36969471f3bb8e2 = function (e, n, r, t) {
      e.uniform2iv(n, getArrayI32FromWasm0(r, t));
    }),
    (e.wbg.__wbg_uniform2uiv_e5d292b09c7c2eb4 = function (e, n, r, t) {
      e.uniform2uiv(n, getArrayU32FromWasm0(r, t));
    }),
    (e.wbg.__wbg_uniform3fv_4f40a7b75bcdeb91 = function (e, n, r, t) {
      e.uniform3fv(n, getArrayF32FromWasm0(r, t));
    }),
    (e.wbg.__wbg_uniform3fv_c6fea7086ffa568e = function (e, n, r, t) {
      e.uniform3fv(n, getArrayF32FromWasm0(r, t));
    }),
    (e.wbg.__wbg_uniform3iv_46cafa9a87333139 = function (e, n, r, t) {
      e.uniform3iv(n, getArrayI32FromWasm0(r, t));
    }),
    (e.wbg.__wbg_uniform3iv_c13167af320af60e = function (e, n, r, t) {
      e.uniform3iv(n, getArrayI32FromWasm0(r, t));
    }),
    (e.wbg.__wbg_uniform3uiv_7e60873d7a35f50b = function (e, n, r, t) {
      e.uniform3uiv(n, getArrayU32FromWasm0(r, t));
    }),
    (e.wbg.__wbg_uniform4f_2408c0a3b4a0941d = function (e, n, r, t, _, a) {
      e.uniform4f(n, r, t, _, a);
    }),
    (e.wbg.__wbg_uniform4f_4eebf85a05c60a16 = function (e, n, r, t, _, a) {
      e.uniform4f(n, r, t, _, a);
    }),
    (e.wbg.__wbg_uniform4fv_7ecf41f27e0e71ec = function (e, n, r, t) {
      e.uniform4fv(n, getArrayF32FromWasm0(r, t));
    }),
    (e.wbg.__wbg_uniform4fv_c88b1733f9a40a7a = function (e, n, r, t) {
      e.uniform4fv(n, getArrayF32FromWasm0(r, t));
    }),
    (e.wbg.__wbg_uniform4iv_0ee5d566bd3880e4 = function (e, n, r, t) {
      e.uniform4iv(n, getArrayI32FromWasm0(r, t));
    }),
    (e.wbg.__wbg_uniform4iv_cd69e9451d767045 = function (e, n, r, t) {
      e.uniform4iv(n, getArrayI32FromWasm0(r, t));
    }),
    (e.wbg.__wbg_uniform4uiv_c55d0b6c672eaf59 = function (e, n, r, t) {
      e.uniform4uiv(n, getArrayU32FromWasm0(r, t));
    }),
    (e.wbg.__wbg_uniformBlockBinding_e646e98e7f5da8fa = function (e, n, r, t) {
      e.uniformBlockBinding(n, r >>> 0, t >>> 0);
    }),
    (e.wbg.__wbg_uniformMatrix2fv_ae2d3b42477e00fd = function (e, n, r, t, _) {
      e.uniformMatrix2fv(n, 0 !== r, getArrayF32FromWasm0(t, _));
    }),
    (e.wbg.__wbg_uniformMatrix2fv_d44126fac416e7e4 = function (e, n, r, t, _) {
      e.uniformMatrix2fv(n, 0 !== r, getArrayF32FromWasm0(t, _));
    }),
    (e.wbg.__wbg_uniformMatrix2x3fv_18d94e4451a372cc = function (e, n, r, t, _) {
      e.uniformMatrix2x3fv(n, 0 !== r, getArrayF32FromWasm0(t, _));
    }),
    (e.wbg.__wbg_uniformMatrix2x4fv_c34a8a330e7c94bd = function (e, n, r, t, _) {
      e.uniformMatrix2x4fv(n, 0 !== r, getArrayF32FromWasm0(t, _));
    }),
    (e.wbg.__wbg_uniformMatrix3fv_652493ea4042e14f = function (e, n, r, t, _) {
      e.uniformMatrix3fv(n, 0 !== r, getArrayF32FromWasm0(t, _));
    }),
    (e.wbg.__wbg_uniformMatrix3fv_a3b27e44f0ad7caa = function (e, n, r, t, _) {
      e.uniformMatrix3fv(n, 0 !== r, getArrayF32FromWasm0(t, _));
    }),
    (e.wbg.__wbg_uniformMatrix3x2fv_1bc7685c610e2b46 = function (e, n, r, t, _) {
      e.uniformMatrix3x2fv(n, 0 !== r, getArrayF32FromWasm0(t, _));
    }),
    (e.wbg.__wbg_uniformMatrix3x4fv_c99cdce05d7ffca9 = function (e, n, r, t, _) {
      e.uniformMatrix3x4fv(n, 0 !== r, getArrayF32FromWasm0(t, _));
    }),
    (e.wbg.__wbg_uniformMatrix4fv_a5f6838f6e217418 = function (e, n, r, t, _) {
      e.uniformMatrix4fv(n, 0 !== r, getArrayF32FromWasm0(t, _));
    }),
    (e.wbg.__wbg_uniformMatrix4fv_bbdf3d84ccedee84 = function (e, n, r, t, _) {
      e.uniformMatrix4fv(n, 0 !== r, getArrayF32FromWasm0(t, _));
    }),
    (e.wbg.__wbg_uniformMatrix4x2fv_05ec6db042145650 = function (e, n, r, t, _) {
      e.uniformMatrix4x2fv(n, 0 !== r, getArrayF32FromWasm0(t, _));
    }),
    (e.wbg.__wbg_uniformMatrix4x3fv_c393892235ce0f8b = function (e, n, r, t, _) {
      e.uniformMatrix4x3fv(n, 0 !== r, getArrayF32FromWasm0(t, _));
    }),
    (e.wbg.__wbg_unmap_8c2e8131b2aaa844 = function (e) {
      e.unmap();
    }),
    (e.wbg.__wbg_unobserve_9198337c0c96042f = function (e, n) {
      e.unobserve(n);
    }),
    (e.wbg.__wbg_usage_13caa02888040e9f = function (e) {
      return e.usage;
    }),
    (e.wbg.__wbg_useProgram_795e70e5047fcb65 = function (e, n) {
      e.useProgram(n);
    }),
    (e.wbg.__wbg_useProgram_e84b53bf74bbe9b3 = function (e, n) {
      e.useProgram(n);
    }),
    (e.wbg.__wbg_userAgentData_5e600df9bb352050 = function (e) {
      const n = e.userAgentData;
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_userAgent_bfd54e5c60738678 = function () {
      return handleError(function (e, n) {
        const r = passStringToWasm0(n.userAgent, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
          t = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(e + 4, t, !0), getDataViewMemory0().setInt32(e + 0, r, !0);
      }, arguments);
    }),
    (e.wbg.__wbg_valueOf_a2728b52687d72b4 = function (e) {
      return e.valueOf();
    }),
    (e.wbg.__wbg_versions_c71aa1626a93e0a1 = function (e) {
      return e.versions;
    }),
    (e.wbg.__wbg_vertexAttribDivisorANGLE_78ad959056e0feb7 = function (e, n, r) {
      e.vertexAttribDivisorANGLE(n >>> 0, r >>> 0);
    }),
    (e.wbg.__wbg_vertexAttribDivisor_bc3026299e814316 = function (e, n, r) {
      e.vertexAttribDivisor(n >>> 0, r >>> 0);
    }),
    (e.wbg.__wbg_vertexAttribIPointer_4397ca04b895d127 = function (e, n, r, t, _, a) {
      e.vertexAttribIPointer(n >>> 0, r, t >>> 0, _, a);
    }),
    (e.wbg.__wbg_vertexAttribPointer_1738c34c1c0d57a0 = function (e, n, r, t, _, a, b) {
      e.vertexAttribPointer(n >>> 0, r, t >>> 0, 0 !== _, a, b);
    }),
    (e.wbg.__wbg_vertexAttribPointer_34a2b143ee35746f = function (e, n, r, t, _, a, b) {
      e.vertexAttribPointer(n >>> 0, r, t >>> 0, 0 !== _, a, b);
    }),
    (e.wbg.__wbg_videoHeight_7d8449d4b1aad15d = function (e) {
      return e.videoHeight;
    }),
    (e.wbg.__wbg_videoWidth_134d623b7b20f203 = function (e) {
      return e.videoWidth;
    }),
    (e.wbg.__wbg_viewport_04c48fc077486d94 = function (e, n, r, t, _) {
      e.viewport(n, r, t, _);
    }),
    (e.wbg.__wbg_viewport_301bba26f65246ed = function (e, n, r, t, _) {
      e.viewport(n, r, t, _);
    }),
    (e.wbg.__wbg_visibilityState_c2b01655a6777e68 = function (e) {
      const n = e.visibilityState;
      return (__wbindgen_enum_VisibilityState.indexOf(n) + 1 || 3) - 1;
    }),
    (e.wbg.__wbg_warn_a6963915e4da61f6 = function (e) {
      console.warn(e);
    }),
    (e.wbg.__wbg_webkitFullscreenElement_0c4654cdfe6894e5 = function (e) {
      const n = e.webkitFullscreenElement;
      return isLikeNone(n) ? 0 : addToExternrefTable0(n);
    }),
    (e.wbg.__wbg_webkitRequestFullscreen_fe95241c4f21ea63 = function (e) {
      e.webkitRequestFullscreen();
    }),
    (e.wbg.__wbg_width_514dd9b3b0cff49c = function (e) {
      return e.width;
    }),
    (e.wbg.__wbg_width_551edb4bb900e3dd = function (e) {
      return e.width;
    }),
    (e.wbg.__wbg_width_826b25a505a0b357 = function (e) {
      return e.width;
    }),
    (e.wbg.__wbg_width_dfc6149b0c4d8821 = function (e) {
      return e.width;
    }),
    (e.wbg.__wbg_width_e9eedd46da897708 = function (e) {
      return e.width;
    }),
    (e.wbg.__wbg_width_ee6a46425045c0dd = function (e) {
      return e.width;
    }),
    (e.wbg.__wbg_window_1a23defd102c72f4 = function () {
      return handleError(function () {
        return window.window;
      }, arguments);
    }),
    (e.wbg.__wbg_writeBuffer_5ca4981365eb5ac0 = function (e, n, r, t, _, a) {
      e.writeBuffer(n, r, t, _, a);
    }),
    (e.wbg.__wbg_writeTexture_246118eb2f5a1592 = function (e, n, r, t, _) {
      e.writeTexture(n, r, t, _);
    }),
    (e.wbg.__wbindgen_boolean_get = function (e) {
      return "boolean" == typeof e ? (e ? 1 : 0) : 2;
    }),
    (e.wbg.__wbindgen_cb_drop = function (e) {
      const n = e.original;
      if (1 == n.cnt--) return (n.a = 0), !0;
      return !1;
    }),
    (e.wbg.__wbindgen_closure_wrapper6910 = function (e, n, r) {
      return makeMutClosure(e, n, 1982, __wbg_adapter_39);
    }),
    (e.wbg.__wbindgen_closure_wrapper6912 = function (e, n, r) {
      return makeMutClosure(e, n, 1982, __wbg_adapter_42);
    }),
    (e.wbg.__wbindgen_closure_wrapper6917 = function (e, n, r) {
      return makeMutClosure(e, n, 1982, __wbg_adapter_39);
    }),
    (e.wbg.__wbindgen_closure_wrapper6919 = function (e, n, r) {
      return makeMutClosure(e, n, 1982, __wbg_adapter_47);
    }),
    (e.wbg.__wbindgen_closure_wrapper6921 = function (e, n, r) {
      return makeMutClosure(e, n, 1982, __wbg_adapter_39);
    }),
    (e.wbg.__wbindgen_closure_wrapper6923 = function (e, n, r) {
      return makeMutClosure(e, n, 1982, __wbg_adapter_39);
    }),
    (e.wbg.__wbindgen_closure_wrapper6926 = function (e, n, r) {
      return makeMutClosure(e, n, 1982, __wbg_adapter_39);
    }),
    (e.wbg.__wbindgen_closure_wrapper6930 = function (e, n, r) {
      return makeMutClosure(e, n, 1982, __wbg_adapter_39);
    }),
    (e.wbg.__wbindgen_closure_wrapper6945 = function (e, n, r) {
      return makeMutClosure(e, n, 1982, __wbg_adapter_39);
    }),
    (e.wbg.__wbindgen_closure_wrapper8980 = function (e, n, r) {
      return makeMutClosure(e, n, 2150, __wbg_adapter_60);
    }),
    (e.wbg.__wbindgen_closure_wrapper938 = function (e, n, r) {
      return makeMutClosure(e, n, 213, __wbg_adapter_36);
    }),
    (e.wbg.__wbindgen_debug_string = function (e, n) {
      const r = passStringToWasm0(debugString(n), wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
        t = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(e + 4, t, !0), getDataViewMemory0().setInt32(e + 0, r, !0);
    }),
    (e.wbg.__wbindgen_init_externref_table = function () {
      const e = wasm.__wbindgen_export_1,
        n = e.grow(4);
      e.set(0, void 0), e.set(n + 0, void 0), e.set(n + 1, null), e.set(n + 2, !0), e.set(n + 3, !1);
    }),
    (e.wbg.__wbindgen_is_function = function (e) {
      return "function" == typeof e;
    }),
    (e.wbg.__wbindgen_is_null = function (e) {
      return null === e;
    }),
    (e.wbg.__wbindgen_is_object = function (e) {
      return "object" == typeof e && null !== e;
    }),
    (e.wbg.__wbindgen_is_string = function (e) {
      return "string" == typeof e;
    }),
    (e.wbg.__wbindgen_is_undefined = function (e) {
      return void 0 === e;
    }),
    (e.wbg.__wbindgen_memory = function () {
      return wasm.memory;
    }),
    (e.wbg.__wbindgen_number_get = function (e, n) {
      const r = "number" == typeof n ? n : void 0;
      getDataViewMemory0().setFloat64(e + 8, isLikeNone(r) ? 0 : r, !0), getDataViewMemory0().setInt32(e + 0, !isLikeNone(r), !0);
    }),
    (e.wbg.__wbindgen_number_new = function (e) {
      return e;
    }),
    (e.wbg.__wbindgen_string_get = function (e, n) {
      const r = "string" == typeof n ? n : void 0;
      var t = isLikeNone(r) ? 0 : passStringToWasm0(r, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc),
        _ = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(e + 4, _, !0), getDataViewMemory0().setInt32(e + 0, t, !0);
    }),
    (e.wbg.__wbindgen_string_new = function (e, n) {
      return getStringFromWasm0(e, n);
    }),
    (e.wbg.__wbindgen_throw = function (e, n) {
      throw new Error(getStringFromWasm0(e, n));
    }),
    e
  );
}
function __wbg_init_memory(e, n) {}
function __wbg_finalize_init(e, n) {
  return (
    (wasm = e.exports),
    (__wbg_init.__wbindgen_wasm_module = n),
    (cachedDataViewMemory0 = null),
    (cachedFloat32ArrayMemory0 = null),
    (cachedInt32ArrayMemory0 = null),
    (cachedUint32ArrayMemory0 = null),
    (cachedUint8ArrayMemory0 = null),
    wasm.__wbindgen_start(),
    wasm
  );
}
function initSync(e) {
  if (void 0 !== wasm) return wasm;
  void 0 !== e &&
    (Object.getPrototypeOf(e) === Object.prototype
      ? ({ module: e } = e)
      : console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));
  const n = __wbg_get_imports();
  __wbg_init_memory(n), e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e));
  return __wbg_finalize_init(new WebAssembly.Instance(e, n), e);
}
async function __wbg_init(e) {
  if (void 0 !== wasm) return wasm;
  void 0 !== e &&
    (Object.getPrototypeOf(e) === Object.prototype
      ? ({ module_or_path: e } = e)
      : console.warn("using deprecated parameters for the initialization function; pass a single object instead")),
    void 0 === e && (e = new URL("particle_system_bg.wasm", import.meta.url));
  const n = __wbg_get_imports();
  ("string" == typeof e || ("function" == typeof Request && e instanceof Request) || ("function" == typeof URL && e instanceof URL)) &&
    (e = fetch(e)),
    __wbg_init_memory(n);
  const { instance: r, module: t } = await __wbg_load(await e, n);
  return __wbg_finalize_init(r, t);
}
export { initSync };
export default __wbg_init;
