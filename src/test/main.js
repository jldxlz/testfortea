// fs=require('fs');
vm=require('vm');// vm must be in the global context to work properly


// const sandbox = {
//     "self": {"name":"","onmessage":null,"onmessageerror":null,"webpackChunk_N_E":[[[],{}]],"_N_E":{}}
// }
// const context = vm.createContext(sandbox);

// filename = "./78.0ae365715a46284e.js"
// var code = fs.readFileSync(filename, 'utf-8');
// // vm.runInThisContext(code, filename);
// var n = vm.runInContext(code, context);
// console.log(n(8078));

function uu(e, t, r) {
    r.d(t, {
        s_: function() {
            return rV
        },
        GB: function() {
            return ng
        }
    });
    var n, i, o, a, s = {};
    function l(e) {
        if (!Number.isSafeInteger(e) || e < 0)
            throw Error(`Wrong positive integer: ${e}`)
    }
    function u(e, ...t) {
        if (!(e instanceof Uint8Array))
            throw Error("Expected Uint8Array");
        if (t.length > 0 && !t.includes(e.length))
            throw Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`)
    }
    r.r(s),
    r.d(s, {
        dQ: function() {
            return F
        },
        ci: function() {
            return O
        },
        bytesToNumberBE: function() {
            return z
        },
        ty: function() {
            return j
        },
        eV: function() {
            return M
        },
        n$: function() {
            return G
        },
        ql: function() {
            return D
        },
        hexToBytes: function() {
            return q
        },
        tL: function() {
            return T
        },
        S5: function() {
            return P
        },
        FF: function() {
            return J
        }
    });
    var c = {
        number: l,
        bool: function(e) {
            if ("boolean" != typeof e)
                throw Error(`Expected boolean, not ${e}`)
        },
        bytes: u,
        hash: function(e) {
            if ("function" != typeof e || "function" != typeof e.create)
                throw Error("Hash should be wrapped by utils.wrapConstructor");
            l(e.outputLen),
            l(e.blockLen)
        },
        exists: function(e, t=!0) {
            if (e.destroyed)
                throw Error("Hash instance has been destroyed");
            if (t && e.finished)
                throw Error("Hash#digest() has already been called")
        },
        output: function(e, t) {
            u(e);
            let r = t.outputLen;
            if (e.length < r)
                throw Error(`digestInto() expects output buffer of length at least ${r}`)
        }
    };
    let h = "object" == typeof globalThis && "crypto"in globalThis ? globalThis.crypto : void 0
      , f = e=>e instanceof Uint8Array
      , d = e=>new DataView(e.buffer,e.byteOffset,e.byteLength)
      , p = (e,t)=>e << 32 - t | e >>> t;
    if (68 !== new Uint8Array(new Uint32Array([287454020]).buffer)[0])
        throw Error("Non little-endian hardware is not supported");
    let g = Array.from({
        length: 256
    }, (e,t)=>t.toString(16).padStart(2, "0"));
    function y(e) {
        if (!f(e))
            throw Error("Uint8Array expected");
        let t = "";
        for (let r = 0; r < e.length; r++)
            t += g[e[r]];
        return t
    }
    function b(e) {
        if ("string" != typeof e)
            throw Error("hex string expected, got " + typeof e);
        let t = e.length;
        if (t % 2)
            throw Error("padded hex string expected, got unpadded hex of length " + t);
        let r = new Uint8Array(t / 2);
        for (let t = 0; t < r.length; t++) {
            let n = 2 * t
              , i = Number.parseInt(e.slice(n, n + 2), 16);
            if (Number.isNaN(i) || i < 0)
                throw Error("Invalid byte sequence");
            r[t] = i
        }
        return r
    }
    function m(e) {
        if ("string" == typeof e && (e = function(e) {
            if ("string" != typeof e)
                throw Error(`utf8ToBytes expected string, got ${typeof e}`);
            return new Uint8Array(new TextEncoder().encode(e))
        }(e)),
        !f(e))
            throw Error(`expected Uint8Array, got ${typeof e}`);
        return e
    }
    function w(...e) {
        let t = new Uint8Array(e.reduce((e,t)=>e + t.length, 0))
          , r = 0;
        return e.forEach(e=>{
            if (!f(e))
                throw Error("Uint8Array expected");
            t.set(e, r),
            r += e.length
        }
        ),
        t
    }
    class v {
        clone() {
            return this._cloneInto()
        }
    }
    function E(e) {
        let t = t=>e().update(m(t)).digest()
          , r = e();
        return t.outputLen = r.outputLen,
        t.blockLen = r.blockLen,
        t.create = ()=>e(),
        t
    }
    function x(e=32) {
        if (h && "function" == typeof h.getRandomValues)
            return h.getRandomValues(new Uint8Array(e));
        throw Error("crypto.getRandomValues must be defined")
    }
    class k extends v {
        constructor(e, t, r, n) {
            super(),
            this.blockLen = e,
            this.outputLen = t,
            this.padOffset = r,
            this.isLE = n,
            this.finished = !1,
            this.length = 0,
            this.pos = 0,
            this.destroyed = !1,
            this.buffer = new Uint8Array(e),
            this.view = d(this.buffer)
        }
        update(e) {
            c.exists(this);
            let {view: t, buffer: r, blockLen: n} = this
              , i = (e = m(e)).length;
            for (let o = 0; o < i; ) {
                let a = Math.min(n - this.pos, i - o);
                if (a === n) {
                    let t = d(e);
                    for (; n <= i - o; o += n)
                        this.process(t, o);
                    continue
                }
                r.set(e.subarray(o, o + a), this.pos),
                this.pos += a,
                o += a,
                this.pos === n && (this.process(t, 0),
                this.pos = 0)
            }
            return this.length += e.length,
            this.roundClean(),
            this
        }
        digestInto(e) {
            c.exists(this),
            c.output(e, this),
            this.finished = !0;
            let {buffer: t, view: r, blockLen: n, isLE: i} = this
              , {pos: o} = this;
            t[o++] = 128,
            this.buffer.subarray(o).fill(0),
            this.padOffset > n - o && (this.process(r, 0),
            o = 0);
            for (let e = o; e < n; e++)
                t[e] = 0;
            !function(e, t, r, n) {
                if ("function" == typeof e.setBigUint64)
                    return e.setBigUint64(t, r, n);
                let i = BigInt(32)
                  , o = BigInt(4294967295)
                  , a = Number(r >> i & o)
                  , s = Number(r & o)
                  , l = n ? 4 : 0
                  , u = n ? 0 : 4;
                e.setUint32(t + l, a, n),
                e.setUint32(t + u, s, n)
            }(r, n - 8, BigInt(8 * this.length), i),
            this.process(r, 0);
            let a = d(e)
              , s = this.outputLen;
            if (s % 4)
                throw Error("_sha2: outputLen should be aligned to 32bit");
            let l = s / 4
              , u = this.get();
            if (l > u.length)
                throw Error("_sha2: outputLen bigger than state");
            for (let e = 0; e < l; e++)
                a.setUint32(4 * e, u[e], i)
        }
        digest() {
            let {buffer: e, outputLen: t} = this;
            this.digestInto(e);
            let r = e.slice(0, t);
            return this.destroy(),
            r
        }
        _cloneInto(e) {
            e || (e = new this.constructor),
            e.set(...this.get());
            let {blockLen: t, buffer: r, length: n, finished: i, destroyed: o, pos: a} = this;
            return e.length = n,
            e.pos = a,
            e.finished = i,
            e.destroyed = o,
            n % t && e.buffer.set(r),
            e
        }
    }
    let A = (e,t,r)=>e & t ^ ~e & r
      , B = (e,t,r)=>e & t ^ e & r ^ t & r
      , I = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298])
      , U = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225])
      , S = new Uint32Array(64);
    class L extends k {
        constructor() {
            super(64, 32, 8, !1),
            this.A = 0 | U[0],
            this.B = 0 | U[1],
            this.C = 0 | U[2],
            this.D = 0 | U[3],
            this.E = 0 | U[4],
            this.F = 0 | U[5],
            this.G = 0 | U[6],
            this.H = 0 | U[7]
        }
        get() {
            let {A: e, B: t, C: r, D: n, E: i, F: o, G: a, H: s} = this;
            return [e, t, r, n, i, o, a, s]
        }
        set(e, t, r, n, i, o, a, s) {
            this.A = 0 | e,
            this.B = 0 | t,
            this.C = 0 | r,
            this.D = 0 | n,
            this.E = 0 | i,
            this.F = 0 | o,
            this.G = 0 | a,
            this.H = 0 | s
        }
        process(e, t) {
            for (let r = 0; r < 16; r++,
            t += 4)
                S[r] = e.getUint32(t, !1);
            for (let e = 16; e < 64; e++) {
                let t = S[e - 15]
                  , r = S[e - 2]
                  , n = p(t, 7) ^ p(t, 18) ^ t >>> 3
                  , i = p(r, 17) ^ p(r, 19) ^ r >>> 10;
                S[e] = i + S[e - 7] + n + S[e - 16] | 0
            }
            let {A: r, B: n, C: i, D: o, E: a, F: s, G: l, H: u} = this;
            for (let e = 0; e < 64; e++) {
                let t = u + (p(a, 6) ^ p(a, 11) ^ p(a, 25)) + A(a, s, l) + I[e] + S[e] | 0
                  , c = (p(r, 2) ^ p(r, 13) ^ p(r, 22)) + B(r, n, i) | 0;
                u = l,
                l = s,
                s = a,
                a = o + t | 0,
                o = i,
                i = n,
                n = r,
                r = t + c | 0
            }
            r = r + this.A | 0,
            n = n + this.B | 0,
            i = i + this.C | 0,
            o = o + this.D | 0,
            a = a + this.E | 0,
            s = s + this.F | 0,
            l = l + this.G | 0,
            u = u + this.H | 0,
            this.set(r, n, i, o, a, s, l, u)
        }
        roundClean() {
            S.fill(0)
        }
        destroy() {
            this.set(0, 0, 0, 0, 0, 0, 0, 0),
            this.buffer.fill(0)
        }
    }
    class _ extends L {
        constructor() {
            super(),
            this.A = -1056596264,
            this.B = 914150663,
            this.C = 812702999,
            this.D = -150054599,
            this.E = -4191439,
            this.F = 1750603025,
            this.G = 1694076839,
            this.H = -1090891868,
            this.outputLen = 28
        }
    }
    let $ = E(()=>new L);
    E(()=>new _),
    BigInt(0);
    let H = BigInt(1)
      , C = BigInt(2)
      , R = e=>e instanceof Uint8Array
      , N = Array.from({
        length: 256
    }, (e,t)=>t.toString(16).padStart(2, "0"));
    function O(e) {
        if (!R(e))
            throw Error("Uint8Array expected");
        let t = "";
        for (let r = 0; r < e.length; r++)
            t += N[e[r]];
        return t
    }
    function K(e) {
        if ("string" != typeof e)
            throw Error("hex string expected, got " + typeof e);
        return BigInt("" === e ? "0" : `0x${e}`)
    }
    function q(e) {
        if ("string" != typeof e)
            throw Error("hex string expected, got " + typeof e);
        let t = e.length;
        if (t % 2)
            throw Error("padded hex string expected, got unpadded hex of length " + t);
        let r = new Uint8Array(t / 2);
        for (let t = 0; t < r.length; t++) {
            let n = 2 * t
              , i = Number.parseInt(e.slice(n, n + 2), 16);
            if (Number.isNaN(i) || i < 0)
                throw Error("Invalid byte sequence");
            r[t] = i
        }
        return r
    }
    function z(e) {
        return K(O(e))
    }
    function j(e) {
        if (!R(e))
            throw Error("Uint8Array expected");
        return K(O(Uint8Array.from(e).reverse()))
    }
    function T(e, t) {
        return q(e.toString(16).padStart(2 * t, "0"))
    }
    function P(e, t) {
        return T(e, t).reverse()
    }
    function D(e, t, r) {
        let n;
        if ("string" == typeof t)
            try {
                n = q(t)
            } catch (r) {
                throw Error(`${e} must be valid hex string, got "${t}". Cause: ${r}`)
            }
        else if (R(t))
            n = Uint8Array.from(t);
        else
            throw Error(`${e} must be hex string or Uint8Array`);
        let i = n.length;
        if ("number" == typeof r && i !== r)
            throw Error(`${e} expected ${r} bytes, got ${i}`);
        return n
    }
    function M(...e) {
        let t = new Uint8Array(e.reduce((e,t)=>e + t.length, 0))
          , r = 0;
        return e.forEach(e=>{
            if (!R(e))
                throw Error("Uint8Array expected");
            t.set(e, r),
            r += e.length
        }
        ),
        t
    }
    let F = e=>(C << BigInt(e - 1)) - H
      , V = e=>new Uint8Array(e)
      , Z = e=>Uint8Array.from(e);
    function G(e, t, r) {
        if ("number" != typeof e || e < 2)
            throw Error("hashLen must be a number");
        if ("number" != typeof t || t < 2)
            throw Error("qByteLen must be a number");
        if ("function" != typeof r)
            throw Error("hmacFn must be a function");
        let n = V(e)
          , i = V(e)
          , o = 0
          , a = ()=>{
            n.fill(1),
            i.fill(0),
            o = 0
        }
          , s = (...e)=>r(i, n, ...e)
          , l = (e=V())=>{
            i = s(Z([0]), e),
            n = s(),
            0 !== e.length && (i = s(Z([1]), e),
            n = s())
        }
          , u = ()=>{
            if (o++ >= 1e3)
                throw Error("drbg: tried 1000 values");
            let e = 0
              , r = [];
            for (; e < t; ) {
                let t = (n = s()).slice();
                r.push(t),
                e += n.length
            }
            return M(...r)
        }
        ;
        return (e,t)=>{
            let r;
            for (a(),
            l(e); !(r = t(u())); )
                l();
            return a(),
            r
        }
    }
    let W = {
        bigint: e=>"bigint" == typeof e,
        function: e=>"function" == typeof e,
        boolean: e=>"boolean" == typeof e,
        string: e=>"string" == typeof e,
        isSafeInteger: e=>Number.isSafeInteger(e),
        array: e=>Array.isArray(e),
        field: (e,t)=>t.Fp.isValid(e),
        hash: e=>"function" == typeof e && Number.isSafeInteger(e.outputLen)
    };
    function J(e, t, r={}) {
        let n = (t,r,n)=>{
            let i = W[r];
            if ("function" != typeof i)
                throw Error(`Invalid validator "${r}", expected function`);
            let o = e[t];
            if ((!n || void 0 !== o) && !i(o, e))
                throw Error(`Invalid param ${String(t)}=${o} (${typeof o}), expected ${r}`)
        }
        ;
        for (let[e,r] of Object.entries(t))
            n(e, r, !1);
        for (let[e,t] of Object.entries(r))
            n(e, t, !0);
        return e
    }
    /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    let Y = BigInt(0)
      , Q = BigInt(1)
      , X = BigInt(2)
      , ee = BigInt(3)
      , et = BigInt(4)
      , er = BigInt(5)
      , en = BigInt(8);
    function ei(e, t) {
        let r = e % t;
        return r >= Y ? r : t + r
    }
    function eo(e, t, r) {
        let n = e;
        for (; t-- > Y; )
            n *= n,
            n %= r;
        return n
    }
    function ea(e, t) {
        if (e === Y || t <= Y)
            throw Error(`invert: expected positive integers, got n=${e} mod=${t}`);
        let r = ei(e, t)
          , n = t
          , i = Y
          , o = Q
          , a = Q
          , s = Y;
        for (; r !== Y; ) {
            let e = n / r
              , t = n % r
              , l = i - a * e
              , u = o - s * e;
            n = r,
            r = t,
            i = a,
            o = s,
            a = l,
            s = u
        }
        if (n !== Q)
            throw Error("invert: does not exist");
        return ei(i, t)
    }
    BigInt(9),
    BigInt(16);
    let es = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
    function el(e, t) {
        let r = void 0 !== t ? t : e.toString(2).length;
        return {
            nBitLength: r,
            nByteLength: Math.ceil(r / 8)
        }
    }
    /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    let eu = BigInt(0)
      , ec = BigInt(1);
    function eh(e) {
        return J(e.Fp, es.reduce((e,t)=>(e[t] = "function",
        e), {
            ORDER: "bigint",
            MASK: "bigint",
            BYTES: "isSafeInteger",
            BITS: "isSafeInteger"
        })),
        J(e, {
            n: "bigint",
            h: "bigint",
            Gx: "field",
            Gy: "field"
        }, {
            nBitLength: "isSafeInteger",
            nByteLength: "isSafeInteger"
        }),
        Object.freeze({
            ...el(e.n, e.nBitLength),
            ...e,
            p: e.Fp.ORDER
        })
    }
    let {bytesToNumberBE: ef, hexToBytes: ed} = s
      , ep = {
        Err: class extends Error {
            constructor(e="") {
                super(e)
            }
        }
        ,
        _parseInt(e) {
            let {Err: t} = ep;
            if (e.length < 2 || 2 !== e[0])
                throw new t("Invalid signature integer tag");
            let r = e[1]
              , n = e.subarray(2, r + 2);
            if (!r || n.length !== r)
                throw new t("Invalid signature integer: wrong length");
            if (128 & n[0])
                throw new t("Invalid signature integer: negative");
            if (0 === n[0] && !(128 & n[1]))
                throw new t("Invalid signature integer: unnecessary leading zero");
            return {
                d: ef(n),
                l: e.subarray(r + 2)
            }
        },
        toSig(e) {
            let {Err: t} = ep
              , r = "string" == typeof e ? ed(e) : e;
            if (!(r instanceof Uint8Array))
                throw Error("ui8a expected");
            let n = r.length;
            if (n < 2 || 48 != r[0])
                throw new t("Invalid signature tag");
            if (r[1] !== n - 2)
                throw new t("Invalid signature: incorrect length");
            let {d: i, l: o} = ep._parseInt(r.subarray(2))
              , {d: a, l: s} = ep._parseInt(o);
            if (s.length)
                throw new t("Invalid signature: left bytes after parsing");
            return {
                r: i,
                s: a
            }
        },
        hexFromSig(e) {
            let t = e=>8 & Number.parseInt(e[0], 16) ? "00" + e : e
              , r = e=>{
                let t = e.toString(16);
                return 1 & t.length ? `0${t}` : t
            }
              , n = t(r(e.s))
              , i = t(r(e.r))
              , o = n.length / 2
              , a = i.length / 2
              , s = r(o)
              , l = r(a);
            return `30${r(a + o + 4)}02${l}${i}02${s}${n}`
        }
    }
      , eg = BigInt(0)
      , ey = BigInt(1)
      , eb = (BigInt(2),
    BigInt(3));
    BigInt(4);
    class em extends v {
        constructor(e, t) {
            super(),
            this.finished = !1,
            this.destroyed = !1,
            c.hash(e);
            let r = m(t);
            if (this.iHash = e.create(),
            "function" != typeof this.iHash.update)
                throw Error("Expected instance of class which extends utils.Hash");
            this.blockLen = this.iHash.blockLen,
            this.outputLen = this.iHash.outputLen;
            let n = this.blockLen
              , i = new Uint8Array(n);
            i.set(r.length > n ? e.create().update(r).digest() : r);
            for (let e = 0; e < i.length; e++)
                i[e] ^= 54;
            this.iHash.update(i),
            this.oHash = e.create();
            for (let e = 0; e < i.length; e++)
                i[e] ^= 106;
            this.oHash.update(i),
            i.fill(0)
        }
        update(e) {
            return c.exists(this),
            this.iHash.update(e),
            this
        }
        digestInto(e) {
            c.exists(this),
            c.bytes(e, this.outputLen),
            this.finished = !0,
            this.iHash.digestInto(e),
            this.oHash.update(e),
            this.oHash.digestInto(e),
            this.destroy()
        }
        digest() {
            let e = new Uint8Array(this.oHash.outputLen);
            return this.digestInto(e),
            e
        }
        _cloneInto(e) {
            e || (e = Object.create(Object.getPrototypeOf(this), {}));
            let {oHash: t, iHash: r, finished: n, destroyed: i, blockLen: o, outputLen: a} = this;
            return e.finished = n,
            e.destroyed = i,
            e.blockLen = o,
            e.outputLen = a,
            e.oHash = t._cloneInto(e.oHash),
            e.iHash = r._cloneInto(e.iHash),
            e
        }
        destroy() {
            this.destroyed = !0,
            this.oHash.destroy(),
            this.iHash.destroy()
        }
    }
    let ew = (e,t,r)=>new em(e,t).update(r).digest();
    ew.create = (e,t)=>new em(e,t);
    /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    let ev = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f")
      , eE = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141")
      , ex = BigInt(1)
      , ek = BigInt(2)
      , eA = (e,t)=>(e + t / ek) / t;
    function eB(e) {
        let t = BigInt(3)
          , r = BigInt(6)
          , n = BigInt(11)
          , i = BigInt(22)
          , o = BigInt(23)
          , a = BigInt(44)
          , s = BigInt(88)
          , l = e * e * e % ev
          , u = l * l * e % ev
          , c = eo(u, t, ev) * u % ev
          , h = eo(c, t, ev) * u % ev
          , f = eo(h, ek, ev) * l % ev
          , d = eo(f, n, ev) * f % ev
          , p = eo(d, i, ev) * d % ev
          , g = eo(p, a, ev) * p % ev
          , y = eo(g, s, ev) * g % ev
          , b = eo(y, a, ev) * p % ev
          , m = eo(b, t, ev) * u % ev
          , w = eo(m, o, ev) * d % ev
          , v = eo(w, r, ev) * l % ev
          , E = eo(v, ek, ev);
        if (!eI.eql(eI.sqr(E), e))
            throw Error("Cannot find square root");
        return E
    }
    let eI = function(e, t, r=!1, n={}) {
        if (e <= Y)
            throw Error(`Expected Fp ORDER > 0, got ${e}`);
        let {nBitLength: i, nByteLength: o} = el(e, t);
        if (o > 2048)
            throw Error("Field lengths over 2048 bytes are not supported");
        let a = function(e) {
            if (e % et === ee) {
                let t = (e + Q) / et;
                return function(e, r) {
                    let n = e.pow(r, t);
                    if (!e.eql(e.sqr(n), r))
                        throw Error("Cannot find square root");
                    return n
                }
            }
            if (e % en === er) {
                let t = (e - er) / en;
                return function(e, r) {
                    let n = e.mul(r, X)
                      , i = e.pow(n, t)
                      , o = e.mul(r, i)
                      , a = e.mul(e.mul(o, X), i)
                      , s = e.mul(o, e.sub(a, e.ONE));
                    if (!e.eql(e.sqr(s), r))
                        throw Error("Cannot find square root");
                    return s
                }
            }
            return function(e) {
                let t, r, n;
                let i = (e - Q) / X;
                for (t = e - Q,
                r = 0; t % X === Y; t /= X,
                r++)
                    ;
                for (n = X; n < e && function(e, t, r) {
                    if (r <= Y || t < Y)
                        throw Error("Expected power/modulo > 0");
                    if (r === Q)
                        return Y;
                    let n = Q;
                    for (; t > Y; )
                        t & Q && (n = n * e % r),
                        e = e * e % r,
                        t >>= Q;
                    return n
                }(n, i, e) !== e - Q; n++)
                    ;
                if (1 === r) {
                    let t = (e + Q) / et;
                    return function(e, r) {
                        let n = e.pow(r, t);
                        if (!e.eql(e.sqr(n), r))
                            throw Error("Cannot find square root");
                        return n
                    }
                }
                let o = (t + Q) / X;
                return function(e, a) {
                    if (e.pow(a, i) === e.neg(e.ONE))
                        throw Error("Cannot find square root");
                    let s = r
                      , l = e.pow(e.mul(e.ONE, n), t)
                      , u = e.pow(a, o)
                      , c = e.pow(a, t);
                    for (; !e.eql(c, e.ONE); ) {
                        if (e.eql(c, e.ZERO))
                            return e.ZERO;
                        let t = 1;
                        for (let r = e.sqr(c); t < s && !e.eql(r, e.ONE); t++)
                            r = e.sqr(r);
                        let r = e.pow(l, Q << BigInt(s - t - 1));
                        l = e.sqr(r),
                        u = e.mul(u, r),
                        c = e.mul(c, l),
                        s = t
                    }
                    return u
                }
            }(e)
        }(e)
          , s = Object.freeze({
            ORDER: e,
            BITS: i,
            BYTES: o,
            MASK: F(i),
            ZERO: Y,
            ONE: Q,
            create: t=>ei(t, e),
            isValid: t=>{
                if ("bigint" != typeof t)
                    throw Error(`Invalid field element: expected bigint, got ${typeof t}`);
                return Y <= t && t < e
            }
            ,
            is0: e=>e === Y,
            isOdd: e=>(e & Q) === Q,
            neg: t=>ei(-t, e),
            eql: (e,t)=>e === t,
            sqr: t=>ei(t * t, e),
            add: (t,r)=>ei(t + r, e),
            sub: (t,r)=>ei(t - r, e),
            mul: (t,r)=>ei(t * r, e),
            pow: (e,t)=>(function(e, t, r) {
                if (r < Y)
                    throw Error("Expected power > 0");
                if (r === Y)
                    return e.ONE;
                if (r === Q)
                    return t;
                let n = e.ONE
                  , i = t;
                for (; r > Y; )
                    r & Q && (n = e.mul(n, i)),
                    i = e.sqr(i),
                    r >>= Q;
                return n
            }
            )(s, e, t),
            div: (t,r)=>ei(t * ea(r, e), e),
            sqrN: e=>e * e,
            addN: (e,t)=>e + t,
            subN: (e,t)=>e - t,
            mulN: (e,t)=>e * t,
            inv: t=>ea(t, e),
            sqrt: n.sqrt || (e=>a(s, e)),
            invertBatch: e=>(function(e, t) {
                let r = Array(t.length)
                  , n = t.reduce((t,n,i)=>e.is0(n) ? t : (r[i] = t,
                e.mul(t, n)), e.ONE)
                  , i = e.inv(n);
                return t.reduceRight((t,n,i)=>e.is0(n) ? t : (r[i] = e.mul(t, r[i]),
                e.mul(t, n)), i),
                r
            }
            )(s, e),
            cmov: (e,t,r)=>r ? t : e,
            toBytes: e=>r ? P(e, o) : T(e, o),
            fromBytes: e=>{
                if (e.length !== o)
                    throw Error(`Fp.fromBytes: expected ${o}, got ${e.length}`);
                return r ? j(e) : z(e)
            }
        });
        return Object.freeze(s)
    }(ev, void 0, void 0, {
        sqrt: eB
    })
      , eU = function(e, t) {
        let r = t=>(function(e) {
            let t = function(e) {
                let t = eh(e);
                return J(t, {
                    hash: "hash",
                    hmac: "function",
                    randomBytes: "function"
                }, {
                    bits2int: "function",
                    bits2int_modN: "function",
                    lowS: "boolean"
                }),
                Object.freeze({
                    lowS: !0,
                    ...t
                })
            }(e)
              , {Fp: r, n: n} = t
              , i = r.BYTES + 1
              , o = 2 * r.BYTES + 1;
            function a(e) {
                return ei(e, n)
            }
            let {ProjectivePoint: s, normPrivateKeyToScalar: l, weierstrassEquation: u, isWithinCurveOrder: c} = function(e) {
                let t = /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
                function(e) {
                    let t = eh(e);
                    J(t, {
                        a: "field",
                        b: "field"
                    }, {
                        allowedPrivateKeyLengths: "array",
                        wrapPrivateKey: "boolean",
                        isTorsionFree: "function",
                        clearCofactor: "function",
                        allowInfinityPoint: "boolean",
                        fromBytes: "function",
                        toBytes: "function"
                    });
                    let {endo: r, Fp: n, a: i} = t;
                    if (r) {
                        if (!n.eql(i, n.ZERO))
                            throw Error("Endomorphism can only be defined for Koblitz curves that have a=0");
                        if ("object" != typeof r || "bigint" != typeof r.beta || "function" != typeof r.splitScalar)
                            throw Error("Expected endomorphism with beta: bigint and splitScalar: function")
                    }
                    return Object.freeze({
                        ...t
                    })
                }(e)
                  , {Fp: r} = t
                  , n = t.toBytes || ((e,t,n)=>{
                    let i = t.toAffine();
                    return M(Uint8Array.from([4]), r.toBytes(i.x), r.toBytes(i.y))
                }
                )
                  , i = t.fromBytes || (e=>{
                    let t = e.subarray(1);
                    return {
                        x: r.fromBytes(t.subarray(0, r.BYTES)),
                        y: r.fromBytes(t.subarray(r.BYTES, 2 * r.BYTES))
                    }
                }
                );
                function o(e) {
                    let {a: n, b: i} = t
                      , o = r.sqr(e)
                      , a = r.mul(o, e);
                    return r.add(r.add(a, r.mul(e, n)), i)
                }
                if (!r.eql(r.sqr(t.Gy), o(t.Gx)))
                    throw Error("bad generator point: equation left != right");
                function a(e) {
                    return "bigint" == typeof e && eg < e && e < t.n
                }
                function s(e) {
                    if (!a(e))
                        throw Error("Expected valid bigint: 0 < bigint < curve.n")
                }
                function l(e) {
                    let r;
                    let {allowedPrivateKeyLengths: n, nByteLength: i, wrapPrivateKey: o, n: a} = t;
                    if (n && "bigint" != typeof e) {
                        if (e instanceof Uint8Array && (e = O(e)),
                        "string" != typeof e || !n.includes(e.length))
                            throw Error("Invalid key");
                        e = e.padStart(2 * i, "0")
                    }
                    try {
                        r = "bigint" == typeof e ? e : z(D("private key", e, i))
                    } catch (t) {
                        throw Error(`private key must be ${i} bytes, hex or bigint, not ${typeof e}`)
                    }
                    return o && (r = ei(r, a)),
                    s(r),
                    r
                }
                let u = new Map;
                function c(e) {
                    if (!(e instanceof h))
                        throw Error("ProjectivePoint expected")
                }
                class h {
                    constructor(e, t, n) {
                        if (this.px = e,
                        this.py = t,
                        this.pz = n,
                        null == e || !r.isValid(e))
                            throw Error("x required");
                        if (null == t || !r.isValid(t))
                            throw Error("y required");
                        if (null == n || !r.isValid(n))
                            throw Error("z required")
                    }
                    static fromAffine(e) {
                        let {x: t, y: n} = e || {};
                        if (!e || !r.isValid(t) || !r.isValid(n))
                            throw Error("invalid affine point");
                        if (e instanceof h)
                            throw Error("projective point not allowed");
                        let i = e=>r.eql(e, r.ZERO);
                        return i(t) && i(n) ? h.ZERO : new h(t,n,r.ONE)
                    }
                    get x() {
                        return this.toAffine().x
                    }
                    get y() {
                        return this.toAffine().y
                    }
                    static normalizeZ(e) {
                        let t = r.invertBatch(e.map(e=>e.pz));
                        return e.map((e,r)=>e.toAffine(t[r])).map(h.fromAffine)
                    }
                    static fromHex(e) {
                        let t = h.fromAffine(i(D("pointHex", e)));
                        return t.assertValidity(),
                        t
                    }
                    static fromPrivateKey(e) {
                        return h.BASE.multiply(l(e))
                    }
                    _setWindowSize(e) {
                        this._WINDOW_SIZE = e,
                        u.delete(this)
                    }
                    assertValidity() {
                        if (this.is0()) {
                            if (t.allowInfinityPoint)
                                return;
                            throw Error("bad point: ZERO")
                        }
                        let {x: e, y: n} = this.toAffine();
                        if (!r.isValid(e) || !r.isValid(n))
                            throw Error("bad point: x or y not FE");
                        let i = r.sqr(n)
                          , a = o(e);
                        if (!r.eql(i, a))
                            throw Error("bad point: equation left != right");
                        if (!this.isTorsionFree())
                            throw Error("bad point: not in prime-order subgroup")
                    }
                    hasEvenY() {
                        let {y: e} = this.toAffine();
                        if (r.isOdd)
                            return !r.isOdd(e);
                        throw Error("Field doesn't support isOdd")
                    }
                    equals(e) {
                        c(e);
                        let {px: t, py: n, pz: i} = this
                          , {px: o, py: a, pz: s} = e
                          , l = r.eql(r.mul(t, s), r.mul(o, i))
                          , u = r.eql(r.mul(n, s), r.mul(a, i));
                        return l && u
                    }
                    negate() {
                        return new h(this.px,r.neg(this.py),this.pz)
                    }
                    double() {
                        let {a: e, b: n} = t
                          , i = r.mul(n, eb)
                          , {px: o, py: a, pz: s} = this
                          , l = r.ZERO
                          , u = r.ZERO
                          , c = r.ZERO
                          , f = r.mul(o, o)
                          , d = r.mul(a, a)
                          , p = r.mul(s, s)
                          , g = r.mul(o, a);
                        return g = r.add(g, g),
                        c = r.mul(o, s),
                        c = r.add(c, c),
                        l = r.mul(e, c),
                        u = r.mul(i, p),
                        u = r.add(l, u),
                        l = r.sub(d, u),
                        u = r.add(d, u),
                        u = r.mul(l, u),
                        l = r.mul(g, l),
                        c = r.mul(i, c),
                        p = r.mul(e, p),
                        g = r.sub(f, p),
                        g = r.mul(e, g),
                        g = r.add(g, c),
                        c = r.add(f, f),
                        f = r.add(c, f),
                        f = r.add(f, p),
                        f = r.mul(f, g),
                        u = r.add(u, f),
                        p = r.mul(a, s),
                        p = r.add(p, p),
                        f = r.mul(p, g),
                        l = r.sub(l, f),
                        c = r.mul(p, d),
                        c = r.add(c, c),
                        new h(l,u,c = r.add(c, c))
                    }
                    add(e) {
                        c(e);
                        let {px: n, py: i, pz: o} = this
                          , {px: a, py: s, pz: l} = e
                          , u = r.ZERO
                          , f = r.ZERO
                          , d = r.ZERO
                          , p = t.a
                          , g = r.mul(t.b, eb)
                          , y = r.mul(n, a)
                          , b = r.mul(i, s)
                          , m = r.mul(o, l)
                          , w = r.add(n, i)
                          , v = r.add(a, s);
                        w = r.mul(w, v),
                        v = r.add(y, b),
                        w = r.sub(w, v),
                        v = r.add(n, o);
                        let E = r.add(a, l);
                        return v = r.mul(v, E),
                        E = r.add(y, m),
                        v = r.sub(v, E),
                        E = r.add(i, o),
                        u = r.add(s, l),
                        E = r.mul(E, u),
                        u = r.add(b, m),
                        E = r.sub(E, u),
                        d = r.mul(p, v),
                        u = r.mul(g, m),
                        d = r.add(u, d),
                        u = r.sub(b, d),
                        d = r.add(b, d),
                        f = r.mul(u, d),
                        b = r.add(y, y),
                        b = r.add(b, y),
                        m = r.mul(p, m),
                        v = r.mul(g, v),
                        b = r.add(b, m),
                        m = r.sub(y, m),
                        m = r.mul(p, m),
                        v = r.add(v, m),
                        y = r.mul(b, v),
                        f = r.add(f, y),
                        y = r.mul(E, v),
                        u = r.mul(w, u),
                        u = r.sub(u, y),
                        y = r.mul(w, b),
                        d = r.mul(E, d),
                        new h(u,f,d = r.add(d, y))
                    }
                    subtract(e) {
                        return this.add(e.negate())
                    }
                    is0() {
                        return this.equals(h.ZERO)
                    }
                    wNAF(e) {
                        return d.wNAFCached(this, u, e, e=>{
                            let t = r.invertBatch(e.map(e=>e.pz));
                            return e.map((e,r)=>e.toAffine(t[r])).map(h.fromAffine)
                        }
                        )
                    }
                    multiplyUnsafe(e) {
                        let n = h.ZERO;
                        if (e === eg)
                            return n;
                        if (s(e),
                        e === ey)
                            return this;
                        let {endo: i} = t;
                        if (!i)
                            return d.unsafeLadder(this, e);
                        let {k1neg: o, k1: a, k2neg: l, k2: u} = i.splitScalar(e)
                          , c = n
                          , f = n
                          , p = this;
                        for (; a > eg || u > eg; )
                            a & ey && (c = c.add(p)),
                            u & ey && (f = f.add(p)),
                            p = p.double(),
                            a >>= ey,
                            u >>= ey;
                        return o && (c = c.negate()),
                        l && (f = f.negate()),
                        f = new h(r.mul(f.px, i.beta),f.py,f.pz),
                        c.add(f)
                    }
                    multiply(e) {
                        let n, i;
                        s(e);
                        let {endo: o} = t;
                        if (o) {
                            let {k1neg: t, k1: a, k2neg: s, k2: l} = o.splitScalar(e)
                              , {p: u, f: c} = this.wNAF(a)
                              , {p: f, f: p} = this.wNAF(l);
                            u = d.constTimeNegate(t, u),
                            f = d.constTimeNegate(s, f),
                            f = new h(r.mul(f.px, o.beta),f.py,f.pz),
                            n = u.add(f),
                            i = c.add(p)
                        } else {
                            let {p: t, f: r} = this.wNAF(e);
                            n = t,
                            i = r
                        }
                        return h.normalizeZ([n, i])[0]
                    }
                    multiplyAndAddUnsafe(e, t, r) {
                        let n = h.BASE
                          , i = (e,t)=>t !== eg && t !== ey && e.equals(n) ? e.multiply(t) : e.multiplyUnsafe(t)
                          , o = i(this, t).add(i(e, r));
                        return o.is0() ? void 0 : o
                    }
                    toAffine(e) {
                        let {px: t, py: n, pz: i} = this
                          , o = this.is0();
                        null == e && (e = o ? r.ONE : r.inv(i));
                        let a = r.mul(t, e)
                          , s = r.mul(n, e)
                          , l = r.mul(i, e);
                        if (o)
                            return {
                                x: r.ZERO,
                                y: r.ZERO
                            };
                        if (!r.eql(l, r.ONE))
                            throw Error("invZ was invalid");
                        return {
                            x: a,
                            y: s
                        }
                    }
                    isTorsionFree() {
                        let {h: e, isTorsionFree: r} = t;
                        if (e === ey)
                            return !0;
                        if (r)
                            return r(h, this);
                        throw Error("isTorsionFree() has not been declared for the elliptic curve")
                    }
                    clearCofactor() {
                        let {h: e, clearCofactor: r} = t;
                        return e === ey ? this : r ? r(h, this) : this.multiplyUnsafe(t.h)
                    }
                    toRawBytes(e=!0) {
                        return this.assertValidity(),
                        n(h, this, e)
                    }
                    toHex(e=!0) {
                        return O(this.toRawBytes(e))
                    }
                }
                h.BASE = new h(t.Gx,t.Gy,r.ONE),
                h.ZERO = new h(r.ZERO,r.ONE,r.ZERO);
                let f = t.nBitLength
                  , d = function(e, t) {
                    let r = (e,t)=>{
                        let r = t.negate();
                        return e ? r : t
                    }
                      , n = e=>({
                        windows: Math.ceil(t / e) + 1,
                        windowSize: 2 ** (e - 1)
                    });
                    return {
                        constTimeNegate: r,
                        unsafeLadder(t, r) {
                            let n = e.ZERO
                              , i = t;
                            for (; r > eu; )
                                r & ec && (n = n.add(i)),
                                i = i.double(),
                                r >>= ec;
                            return n
                        },
                        precomputeWindow(e, t) {
                            let {windows: r, windowSize: i} = n(t)
                              , o = []
                              , a = e
                              , s = a;
                            for (let e = 0; e < r; e++) {
                                s = a,
                                o.push(s);
                                for (let e = 1; e < i; e++)
                                    s = s.add(a),
                                    o.push(s);
                                a = s.double()
                            }
                            return o
                        },
                        wNAF(t, i, o) {
                            let {windows: a, windowSize: s} = n(t)
                              , l = e.ZERO
                              , u = e.BASE
                              , c = BigInt(2 ** t - 1)
                              , h = 2 ** t
                              , f = BigInt(t);
                            for (let e = 0; e < a; e++) {
                                let t = e * s
                                  , n = Number(o & c);
                                o >>= f,
                                n > s && (n -= h,
                                o += ec);
                                let a = t + Math.abs(n) - 1
                                  , d = e % 2 != 0
                                  , p = n < 0;
                                0 === n ? u = u.add(r(d, i[t])) : l = l.add(r(p, i[a]))
                            }
                            return {
                                p: l,
                                f: u
                            }
                        },
                        wNAFCached(e, t, r, n) {
                            let i = e._WINDOW_SIZE || 1
                              , o = t.get(e);
                            return o || (o = this.precomputeWindow(e, i),
                            1 !== i && t.set(e, n(o))),
                            this.wNAF(i, o, r)
                        }
                    }
                }(h, t.endo ? Math.ceil(f / 2) : f);
                return {
                    CURVE: t,
                    ProjectivePoint: h,
                    normPrivateKeyToScalar: l,
                    weierstrassEquation: o,
                    isWithinCurveOrder: a
                }
            }({
                ...t,
                toBytes(e, t, n) {
                    let i = t.toAffine()
                      , o = r.toBytes(i.x)
                      , a = M;
                    return n ? a(Uint8Array.from([t.hasEvenY() ? 2 : 3]), o) : a(Uint8Array.from([4]), o, r.toBytes(i.y))
                },
                fromBytes(e) {
                    let t = e.length
                      , n = e[0]
                      , a = e.subarray(1);
                    if (t === i && (2 === n || 3 === n)) {
                        let e = z(a);
                        if (!(eg < e && e < r.ORDER))
                            throw Error("Point is not on curve");
                        let t = u(e)
                          , i = r.sqrt(t);
                        return (1 & n) == 1 != ((i & ey) === ey) && (i = r.neg(i)),
                        {
                            x: e,
                            y: i
                        }
                    }
                    if (t === o && 4 === n)
                        return {
                            x: r.fromBytes(a.subarray(0, r.BYTES)),
                            y: r.fromBytes(a.subarray(r.BYTES, 2 * r.BYTES))
                        };
                    throw Error(`Point of length ${t} was invalid. Expected ${i} compressed bytes or ${o} uncompressed bytes`)
                }
            })
              , h = e=>O(T(e, t.nByteLength))
              , f = (e,t,r)=>z(e.slice(t, r));
            class d {
                constructor(e, t, r) {
                    this.r = e,
                    this.s = t,
                    this.recovery = r,
                    this.assertValidity()
                }
                static fromCompact(e) {
                    let r = t.nByteLength;
                    return new d(f(e = D("compactSignature", e, 2 * r), 0, r),f(e, r, 2 * r))
                }
                static fromDER(e) {
                    let {r: t, s: r} = ep.toSig(D("DER", e));
                    return new d(t,r)
                }
                assertValidity() {
                    if (!c(this.r))
                        throw Error("r must be 0 < r < CURVE.n");
                    if (!c(this.s))
                        throw Error("s must be 0 < s < CURVE.n")
                }
                addRecoveryBit(e) {
                    return new d(this.r,this.s,e)
                }
                recoverPublicKey(e) {
                    let {r: i, s: o, recovery: l} = this
                      , u = y(D("msgHash", e));
                    if (null == l || ![0, 1, 2, 3].includes(l))
                        throw Error("recovery id invalid");
                    let c = 2 === l || 3 === l ? i + t.n : i;
                    if (c >= r.ORDER)
                        throw Error("recovery id 2 or 3 invalid");
                    let f = (1 & l) == 0 ? "02" : "03"
                      , d = s.fromHex(f + h(c))
                      , p = ea(c, n)
                      , g = a(-u * p)
                      , b = a(o * p)
                      , m = s.BASE.multiplyAndAddUnsafe(d, g, b);
                    if (!m)
                        throw Error("point at infinify");
                    return m.assertValidity(),
                    m
                }
                hasHighS() {
                    return this.s > n >> ey
                }
                normalizeS() {
                    return this.hasHighS() ? new d(this.r,a(-this.s),this.recovery) : this
                }
                toDERRawBytes() {
                    return q(this.toDERHex())
                }
                toDERHex() {
                    return ep.hexFromSig({
                        r: this.r,
                        s: this.s
                    })
                }
                toCompactRawBytes() {
                    return q(this.toCompactHex())
                }
                toCompactHex() {
                    return h(this.r) + h(this.s)
                }
            }
            function p(e) {
                let t = e instanceof Uint8Array
                  , r = "string" == typeof e
                  , n = (t || r) && e.length;
                return t ? n === i || n === o : r ? n === 2 * i || n === 2 * o : e instanceof s
            }
            let g = t.bits2int || function(e) {
                let r = z(e)
                  , n = 8 * e.length - t.nBitLength;
                return n > 0 ? r >> BigInt(n) : r
            }
              , y = t.bits2int_modN || function(e) {
                return a(g(e))
            }
              , b = F(t.nBitLength);
            function m(e) {
                if ("bigint" != typeof e)
                    throw Error("bigint expected");
                if (!(eg <= e && e < b))
                    throw Error(`bigint expected < 2^${t.nBitLength}`);
                return T(e, t.nByteLength)
            }
            let w = {
                lowS: t.lowS,
                prehash: !1
            }
              , v = {
                lowS: t.lowS,
                prehash: !1
            };
            return s.BASE._setWindowSize(8),
            {
                CURVE: t,
                getPublicKey: function(e, t=!0) {
                    return s.fromPrivateKey(e).toRawBytes(t)
                },
                getSharedSecret: function(e, t, r=!0) {
                    if (p(e))
                        throw Error("first arg must be private key");
                    if (!p(t))
                        throw Error("second arg must be public key");
                    return s.fromHex(t).multiply(l(e)).toRawBytes(r)
                },
                sign: function(e, i, o=w) {
                    let {seed: u, k2sig: h} = function(e, i, o=w) {
                        if (["recovered", "canonical"].some(e=>e in o))
                            throw Error("sign() legacy options not supported");
                        let {hash: u, randomBytes: h} = t
                          , {lowS: f, prehash: p, extraEntropy: b} = o;
                        null == f && (f = !0),
                        e = D("msgHash", e),
                        p && (e = D("prehashed msgHash", u(e)));
                        let v = y(e)
                          , E = l(i)
                          , x = [m(E), m(v)];
                        if (null != b) {
                            let e = !0 === b ? h(r.BYTES) : b;
                            x.push(D("extraEntropy", e, r.BYTES))
                        }
                        return {
                            seed: M(...x),
                            k2sig: function(e) {
                                let t = g(e);
                                if (!c(t))
                                    return;
                                let r = ea(t, n)
                                  , i = s.BASE.multiply(t).toAffine()
                                  , o = a(i.x);
                                if (o === eg)
                                    return;
                                let l = a(r * a(v + o * E));
                                if (l === eg)
                                    return;
                                let u = (i.x === o ? 0 : 2) | Number(i.y & ey)
                                  , h = l;
                                if (f && l > n >> ey)
                                    h = l > n >> ey ? a(-l) : l,
                                    u ^= 1;
                                return new d(o,h,u)
                            }
                        }
                    }(e, i, o);
                    return G(t.hash.outputLen, t.nByteLength, t.hmac)(u, h)
                },
                verify: function(e, r, i, o=v) {
                    let l, u;
                    if (r = D("msgHash", r),
                    i = D("publicKey", i),
                    "strict"in o)
                        throw Error("options.strict was renamed to lowS");
                    let {lowS: c, prehash: h} = o;
                    try {
                        if ("string" == typeof e || e instanceof Uint8Array)
                            try {
                                u = d.fromDER(e)
                            } catch (t) {
                                if (!(t instanceof ep.Err))
                                    throw t;
                                u = d.fromCompact(e)
                            }
                        else if ("object" == typeof e && "bigint" == typeof e.r && "bigint" == typeof e.s) {
                            let {r: t, s: r} = e;
                            u = new d(t,r)
                        } else
                            throw Error("PARSE");
                        l = s.fromHex(i)
                    } catch (e) {
                        if ("PARSE" === e.message)
                            throw Error("signature must be Signature instance, Uint8Array or hex string");
                        return !1
                    }
                    if (c && u.hasHighS())
                        return !1;
                    h && (r = t.hash(r));
                    let {r: f, s: p} = u
                      , g = y(r)
                      , b = ea(p, n)
                      , m = a(g * b)
                      , w = a(f * b)
                      , E = s.BASE.multiplyAndAddUnsafe(l, m, w)?.toAffine();
                    return !!E && a(E.x) === f
                },
                ProjectivePoint: s,
                Signature: d,
                utils: {
                    isValidPrivateKey(e) {
                        try {
                            return l(e),
                            !0
                        } catch (e) {
                            return !1
                        }
                    },
                    normPrivateKeyToScalar: l,
                    randomPrivateKey: ()=>T(function(e, t, r=!1) {
                        let n = (e = D("privateHash", e)).length
                          , i = el(t).nByteLength + 8;
                        if (i < 24 || n < i || n > 1024)
                            throw Error(`hashToPrivateScalar: expected ${i}-1024 bytes of input, got ${n}`);
                        return ei(r ? j(e) : z(e), t - Q) + Q
                    }(t.randomBytes(r.BYTES + 8), n), t.nByteLength),
                    precompute: (e=8,t=s.BASE)=>(t._setWindowSize(e),
                    t.multiply(BigInt(3)),
                    t)
                }
            }
        }
        )({
            ...e,
            hash: t,
            hmac: (e,...r)=>ew(t, e, w(...r)),
            randomBytes: x
        });
        return Object.freeze({
            ...r(t),
            create: r
        })
    }({
        a: BigInt(0),
        b: BigInt(7),
        Fp: eI,
        n: eE,
        Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
        Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
        h: BigInt(1),
        lowS: !0,
        endo: {
            beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
            splitScalar: e=>{
                let t = BigInt("0x3086d221a7d46bcde86c90e49284eb15")
                  , r = -ex * BigInt("0xe4437ed6010e88286f547fa90abfe4c3")
                  , n = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8")
                  , i = BigInt("0x100000000000000000000000000000000")
                  , o = eA(t * e, eE)
                  , a = eA(-r * e, eE)
                  , s = ei(e - o * t - a * n, eE)
                  , l = ei(-o * r - a * t, eE)
                  , u = s > i
                  , c = l > i;
                if (u && (s = eE - s),
                c && (l = eE - l),
                s > i || l > i)
                    throw Error("splitScalar: Endomorphism failed, k=" + e);
                return {
                    k1neg: u,
                    k1: s,
                    k2neg: c,
                    k2: l
                }
            }
        }
    }, $)
      , eS = BigInt(0)
      , eL = e=>"bigint" == typeof e && eS < e && e < ev
      , e_ = e=>"bigint" == typeof e && eS < e && e < eE
      , e$ = {};
    function eH(e, ...t) {
        let r = e$[e];
        if (void 0 === r) {
            let t = $(Uint8Array.from(e, e=>e.charCodeAt(0)));
            r = M(t, t),
            e$[e] = r
        }
        return $(M(r, ...t))
    }
    let eC = e=>e.toRawBytes(!0).slice(1)
      , eR = e=>T(e, 32)
      , eN = e=>ei(e, ev)
      , eO = e=>ei(e, eE)
      , eK = eU.ProjectivePoint
      , eq = (e,t,r)=>eK.BASE.multiplyAndAddUnsafe(e, t, r);
    function ez(e) {
        let t = eU.utils.normPrivateKeyToScalar(e)
          , r = eK.fromPrivateKey(t);
        return {
            scalar: r.hasEvenY() ? t : eO(-t),
            bytes: eC(r)
        }
    }
    function ej(e) {
        if (!eL(e))
            throw Error("bad x: need 0 < x < p");
        let t = eN(e * e)
          , r = eB(eN(t * e + BigInt(7)));
        r % ek !== eS && (r = eN(-r));
        let n = new eK(e,r,ex);
        return n.assertValidity(),
        n
    }
    function eT(...e) {
        return eO(z(eH("BIP0340/challenge", ...e)))
    }
    function eP(e, t, r) {
        let n = D("signature", e, 64)
          , i = D("message", t)
          , o = D("publicKey", r, 32);
        try {
            let e = ej(z(o))
              , t = z(n.subarray(0, 32));
            if (!eL(t))
                return !1;
            let r = z(n.subarray(32, 64));
            if (!e_(r))
                return !1;
            let a = eT(eR(t), eC(e), i)
              , s = eq(e, r, eO(-a));
            if (!s || !s.hasEvenY() || s.toAffine().x !== t)
                return !1;
            return !0
        } catch (e) {
            return !1
        }
    }
    let eD = {
        getPublicKey: function(e) {
            return ez(e).bytes
        },
        sign: function(e, t, r=x(32)) {
            let n = D("message", e)
              , {bytes: i, scalar: o} = ez(t)
              , a = eR(o ^ z(eH("BIP0340/aux", D("auxRand", r, 32))))
              , s = eO(z(eH("BIP0340/nonce", a, i, n)));
            if (s === eS)
                throw Error("sign failed: k is zero");
            let {bytes: l, scalar: u} = ez(s)
              , c = eT(l, i, n)
              , h = new Uint8Array(64);
            if (h.set(l, 0),
            h.set(eR(eO(u + c * o)), 32),
            !eP(h, n, i))
                throw Error("sign: Invalid signature produced");
            return h
        },
        verify: eP,
        utils: {
            randomPrivateKey: eU.utils.randomPrivateKey,
            lift_x: ej,
            pointToBytes: eC,
            numberToBytesBE: T,
            bytesToNumberBE: z,
            taggedHash: eH,
            mod: ei
        }
    };
    /*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    function eM(e) {
        if (!Number.isSafeInteger(e))
            throw Error(`Wrong integer: ${e}`)
    }
    function eF(...e) {
        let t = (e,t)=>r=>e(t(r));
        return {
            encode: Array.from(e).reverse().reduce((e,r)=>e ? t(e, r.encode) : r.encode, void 0),
            decode: e.reduce((e,r)=>e ? t(e, r.decode) : r.decode, void 0)
        }
    }
    function eV(e) {
        return {
            encode: t=>{
                if (!Array.isArray(t) || t.length && "number" != typeof t[0])
                    throw Error("alphabet.encode input should be an array of numbers");
                return t.map(t=>{
                    if (eM(t),
                    t < 0 || t >= e.length)
                        throw Error(`Digit index outside alphabet: ${t} (alphabet: ${e.length})`);
                    return e[t]
                }
                )
            }
            ,
            decode: t=>{
                if (!Array.isArray(t) || t.length && "string" != typeof t[0])
                    throw Error("alphabet.decode input should be array of strings");
                return t.map(t=>{
                    if ("string" != typeof t)
                        throw Error(`alphabet.decode: not string element=${t}`);
                    let r = e.indexOf(t);
                    if (-1 === r)
                        throw Error(`Unknown letter: "${t}". Allowed: ${e}`);
                    return r
                }
                )
            }
        }
    }
    function eZ(e="") {
        if ("string" != typeof e)
            throw Error("join separator should be string");
        return {
            encode: t=>{
                if (!Array.isArray(t) || t.length && "string" != typeof t[0])
                    throw Error("join.encode input should be array of strings");
                for (let e of t)
                    if ("string" != typeof e)
                        throw Error(`join.encode: non-string input=${e}`);
                return t.join(e)
            }
            ,
            decode: t=>{
                if ("string" != typeof t)
                    throw Error("join.decode input should be string");
                return t.split(e)
            }
        }
    }
    function eG(e, t="=") {
        if (eM(e),
        "string" != typeof t)
            throw Error("padding chr should be string");
        return {
            encode(r) {
                if (!Array.isArray(r) || r.length && "string" != typeof r[0])
                    throw Error("padding.encode input should be array of strings");
                for (let e of r)
                    if ("string" != typeof e)
                        throw Error(`padding.encode: non-string input=${e}`);
                for (; r.length * e % 8; )
                    r.push(t);
                return r
            },
            decode(r) {
                if (!Array.isArray(r) || r.length && "string" != typeof r[0])
                    throw Error("padding.encode input should be array of strings");
                for (let e of r)
                    if ("string" != typeof e)
                        throw Error(`padding.decode: non-string input=${e}`);
                let n = r.length;
                if (n * e % 8)
                    throw Error("Invalid padding: string should have whole number of bytes");
                for (; n > 0 && r[n - 1] === t; n--)
                    if (!((n - 1) * e % 8))
                        throw Error("Invalid padding: string has too much padding");
                return r.slice(0, n)
            }
        }
    }
    function eW(e) {
        if ("function" != typeof e)
            throw Error("normalize fn should be function");
        return {
            encode: e=>e,
            decode: t=>e(t)
        }
    }
    function eJ(e, t, r) {
        if (t < 2)
            throw Error(`convertRadix: wrong from=${t}, base cannot be less than 2`);
        if (r < 2)
            throw Error(`convertRadix: wrong to=${r}, base cannot be less than 2`);
        if (!Array.isArray(e))
            throw Error("convertRadix: data should be array");
        if (!e.length)
            return [];
        let n = 0
          , i = []
          , o = Array.from(e);
        for (o.forEach(e=>{
            if (eM(e),
            e < 0 || e >= t)
                throw Error(`Wrong integer: ${e}`)
        }
        ); ; ) {
            let e = 0
              , a = !0;
            for (let i = n; i < o.length; i++) {
                let s = o[i]
                  , l = t * e + s;
                if (!Number.isSafeInteger(l) || t * e / t !== e || l - s != t * e || (e = l % r,
                o[i] = Math.floor(l / r),
                !Number.isSafeInteger(o[i]) || o[i] * r + e !== l))
                    throw Error("convertRadix: carry overflow");
                a && (o[i] ? a = !1 : n = i)
            }
            if (i.push(e),
            a)
                break
        }
        for (let t = 0; t < e.length - 1 && 0 === e[t]; t++)
            i.push(0);
        return i.reverse()
    }
    let eY = (e,t)=>t ? eY(t, e % t) : e
      , eQ = (e,t)=>e + (t - eY(e, t));
    function eX(e, t, r, n) {
        if (!Array.isArray(e))
            throw Error("convertRadix2: data should be array");
        if (t <= 0 || t > 32)
            throw Error(`convertRadix2: wrong from=${t}`);
        if (r <= 0 || r > 32)
            throw Error(`convertRadix2: wrong to=${r}`);
        if (eQ(t, r) > 32)
            throw Error(`convertRadix2: carry overflow from=${t} to=${r} carryBits=${eQ(t, r)}`);
        let i = 0
          , o = 0
          , a = 2 ** r - 1
          , s = [];
        for (let n of e) {
            if (eM(n),
            n >= 2 ** t)
                throw Error(`convertRadix2: invalid data word=${n} from=${t}`);
            if (i = i << t | n,
            o + t > 32)
                throw Error(`convertRadix2: carry overflow pos=${o} from=${t}`);
            for (o += t; o >= r; o -= r)
                s.push((i >> o - r & a) >>> 0);
            i &= 2 ** o - 1
        }
        if (i = i << r - o & a,
        !n && o >= t)
            throw Error("Excess padding");
        if (!n && i)
            throw Error(`Non-zero padding: ${i}`);
        return n && o > 0 && s.push(i >>> 0),
        s
    }
    function e0(e) {
        return eM(e),
        {
            encode: t=>{
                if (!(t instanceof Uint8Array))
                    throw Error("radix.encode input should be Uint8Array");
                return eJ(Array.from(t), 256, e)
            }
            ,
            decode: t=>{
                if (!Array.isArray(t) || t.length && "number" != typeof t[0])
                    throw Error("radix.decode input should be array of strings");
                return Uint8Array.from(eJ(t, e, 256))
            }
        }
    }
    function e1(e, t=!1) {
        if (eM(e),
        e <= 0 || e > 32)
            throw Error("radix2: bits should be in (0..32]");
        if (eQ(8, e) > 32 || eQ(e, 8) > 32)
            throw Error("radix2: carry overflow");
        return {
            encode: r=>{
                if (!(r instanceof Uint8Array))
                    throw Error("radix2.encode input should be Uint8Array");
                return eX(Array.from(r), 8, e, !t)
            }
            ,
            decode: r=>{
                if (!Array.isArray(r) || r.length && "number" != typeof r[0])
                    throw Error("radix2.decode input should be array of strings");
                return Uint8Array.from(eX(r, e, 8, t))
            }
        }
    }
    function e2(e) {
        if ("function" != typeof e)
            throw Error("unsafeWrapper fn should be function");
        return function(...t) {
            try {
                return e.apply(null, t)
            } catch (e) {}
        }
    }
    function e3(e, t) {
        if (eM(e),
        "function" != typeof t)
            throw Error("checksum fn should be function");
        return {
            encode(r) {
                if (!(r instanceof Uint8Array))
                    throw Error("checksum.encode: input should be Uint8Array");
                let n = t(r).slice(0, e)
                  , i = new Uint8Array(r.length + e);
                return i.set(r),
                i.set(n, r.length),
                i
            },
            decode(r) {
                if (!(r instanceof Uint8Array))
                    throw Error("checksum.decode: input should be Uint8Array");
                let n = r.slice(0, -e)
                  , i = t(n).slice(0, e)
                  , o = r.slice(-e);
                for (let t = 0; t < e; t++)
                    if (i[t] !== o[t])
                        throw Error("Invalid checksum");
                return n
            }
        }
    }
    let e8 = {
        alphabet: eV,
        chain: eF,
        checksum: e3,
        radix: e0,
        radix2: e1,
        join: eZ,
        padding: eG
    };
    eF(e1(4), eV("0123456789ABCDEF"), eZ("")),
    eF(e1(5), eV("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), eG(5), eZ("")),
    eF(e1(5), eV("0123456789ABCDEFGHIJKLMNOPQRSTUV"), eG(5), eZ("")),
    eF(e1(5), eV("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), eZ(""), eW(e=>e.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")));
    let e4 = eF(e1(6), eV("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), eG(6), eZ(""))
      , e5 = (eF(e1(6), eV("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), eG(6), eZ("")),
    e=>eF(e0(58), eV(e), eZ("")))
      , e6 = e5("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
    e5("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"),
    e5("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
    let e9 = eF(eV("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), eZ(""))
      , e7 = [996825010, 642813549, 513874426, 1027748829, 705979059];
    function te(e) {
        let t = e >> 25
          , r = (33554431 & e) << 5;
        for (let e = 0; e < e7.length; e++)
            (t >> e & 1) == 1 && (r ^= e7[e]);
        return r
    }
    function tt(e, t, r=1) {
        let n = e.length
          , i = 1;
        for (let t = 0; t < n; t++) {
            let r = e.charCodeAt(t);
            if (r < 33 || r > 126)
                throw Error(`Invalid prefix (${e})`);
            i = te(i) ^ r >> 5
        }
        i = te(i);
        for (let t = 0; t < n; t++)
            i = te(i) ^ 31 & e.charCodeAt(t);
        for (let e of t)
            i = te(i) ^ e;
        for (let e = 0; e < 6; e++)
            i = te(i);
        return i ^= r,
        e9.encode(eX([i % 1073741824], 30, 5, !1))
    }
    function tr(e) {
        let t = "bech32" === e ? 1 : 734539939
          , r = e1(5)
          , n = r.decode
          , i = r.encode
          , o = e2(n);
        function a(e, r=90) {
            if ("string" != typeof e)
                throw Error(`bech32.decode input should be string, not ${typeof e}`);
            if (e.length < 8 || !1 !== r && e.length > r)
                throw TypeError(`Wrong string length: ${e.length} (${e}). Expected (8..${r})`);
            let n = e.toLowerCase();
            if (e !== n && e !== e.toUpperCase())
                throw Error("String must be lowercase or uppercase");
            let i = (e = n).lastIndexOf("1");
            if (0 === i || -1 === i)
                throw Error('Letter "1" must be present between prefix and data only');
            let o = e.slice(0, i)
              , a = e.slice(i + 1);
            if (a.length < 6)
                throw Error("Data must be at least 6 characters long");
            let s = e9.decode(a).slice(0, -6)
              , l = tt(o, s, t);
            if (!a.endsWith(l))
                throw Error(`Invalid checksum in ${e}: expected "${l}"`);
            return {
                prefix: o,
                words: s
            }
        }
        let s = e2(a);
        return {
            encode: function(e, r, n=90) {
                if ("string" != typeof e)
                    throw Error(`bech32.encode prefix should be string, not ${typeof e}`);
                if (!Array.isArray(r) || r.length && "number" != typeof r[0])
                    throw Error(`bech32.encode words should be array of numbers, not ${typeof r}`);
                let i = e.length + 7 + r.length;
                if (!1 !== n && i > n)
                    throw TypeError(`Length ${i} exceeds limit ${n}`);
                return e = e.toLowerCase(),
                `${e}1${e9.encode(r)}${tt(e, r, t)}`
            },
            decode: a,
            decodeToBytes: function(e) {
                let {prefix: t, words: r} = a(e, !1);
                return {
                    prefix: t,
                    words: r,
                    bytes: n(r)
                }
            },
            decodeUnsafe: s,
            fromWords: n,
            fromWordsUnsafe: o,
            toWords: i
        }
    }
    let tn = tr("bech32");
    tr("bech32m"),
    eF(e1(4), eV("0123456789abcdef"), eZ(""), eW(e=>{
        if ("string" != typeof e || e.length % 2)
            throw TypeError(`hex.decode: expected string, got ${typeof e} with length ${e.length}`);
        return e.toLowerCase()
    }
    ));
    let ti = `abandon
ability
able
about
above
absent
absorb
abstract
absurd
abuse
access
accident
account
accuse
achieve
acid
acoustic
acquire
across
act
action
actor
actress
actual
adapt
add
addict
address
adjust
admit
adult
advance
advice
aerobic
affair
afford
afraid
again
age
agent
agree
ahead
aim
air
airport
aisle
alarm
album
alcohol
alert
alien
all
alley
allow
almost
alone
alpha
already
also
alter
always
amateur
amazing
among
amount
amused
analyst
anchor
ancient
anger
angle
angry
animal
ankle
announce
annual
another
answer
antenna
antique
anxiety
any
apart
apology
appear
apple
approve
april
arch
arctic
area
arena
argue
arm
armed
armor
army
around
arrange
arrest
arrive
arrow
art
artefact
artist
artwork
ask
aspect
assault
asset
assist
assume
asthma
athlete
atom
attack
attend
attitude
attract
auction
audit
august
aunt
author
auto
autumn
average
avocado
avoid
awake
aware
away
awesome
awful
awkward
axis
baby
bachelor
bacon
badge
bag
balance
balcony
ball
bamboo
banana
banner
bar
barely
bargain
barrel
base
basic
basket
battle
beach
bean
beauty
because
become
beef
before
begin
behave
behind
believe
below
belt
bench
benefit
best
betray
better
between
beyond
bicycle
bid
bike
bind
biology
bird
birth
bitter
black
blade
blame
blanket
blast
bleak
bless
blind
blood
blossom
blouse
blue
blur
blush
board
boat
body
boil
bomb
bone
bonus
book
boost
border
boring
borrow
boss
bottom
bounce
box
boy
bracket
brain
brand
brass
brave
bread
breeze
brick
bridge
brief
bright
bring
brisk
broccoli
broken
bronze
broom
brother
brown
brush
bubble
buddy
budget
buffalo
build
bulb
bulk
bullet
bundle
bunker
burden
burger
burst
bus
business
busy
butter
buyer
buzz
cabbage
cabin
cable
cactus
cage
cake
call
calm
camera
camp
can
canal
cancel
candy
cannon
canoe
canvas
canyon
capable
capital
captain
car
carbon
card
cargo
carpet
carry
cart
case
cash
casino
castle
casual
cat
catalog
catch
category
cattle
caught
cause
caution
cave
ceiling
celery
cement
census
century
cereal
certain
chair
chalk
champion
change
chaos
chapter
charge
chase
chat
cheap
check
cheese
chef
cherry
chest
chicken
chief
child
chimney
choice
choose
chronic
chuckle
chunk
churn
cigar
cinnamon
circle
citizen
city
civil
claim
clap
clarify
claw
clay
clean
clerk
clever
click
client
cliff
climb
clinic
clip
clock
clog
close
cloth
cloud
clown
club
clump
cluster
clutch
coach
coast
coconut
code
coffee
coil
coin
collect
color
column
combine
come
comfort
comic
common
company
concert
conduct
confirm
congress
connect
consider
control
convince
cook
cool
copper
copy
coral
core
corn
correct
cost
cotton
couch
country
couple
course
cousin
cover
coyote
crack
cradle
craft
cram
crane
crash
crater
crawl
crazy
cream
credit
creek
crew
cricket
crime
crisp
critic
crop
cross
crouch
crowd
crucial
cruel
cruise
crumble
crunch
crush
cry
crystal
cube
culture
cup
cupboard
curious
current
curtain
curve
cushion
custom
cute
cycle
dad
damage
damp
dance
danger
daring
dash
daughter
dawn
day
deal
debate
debris
decade
december
decide
decline
decorate
decrease
deer
defense
define
defy
degree
delay
deliver
demand
demise
denial
dentist
deny
depart
depend
deposit
depth
deputy
derive
describe
desert
design
desk
despair
destroy
detail
detect
develop
device
devote
diagram
dial
diamond
diary
dice
diesel
diet
differ
digital
dignity
dilemma
dinner
dinosaur
direct
dirt
disagree
discover
disease
dish
dismiss
disorder
display
distance
divert
divide
divorce
dizzy
doctor
document
dog
doll
dolphin
domain
donate
donkey
donor
door
dose
double
dove
draft
dragon
drama
drastic
draw
dream
dress
drift
drill
drink
drip
drive
drop
drum
dry
duck
dumb
dune
during
dust
dutch
duty
dwarf
dynamic
eager
eagle
early
earn
earth
easily
east
easy
echo
ecology
economy
edge
edit
educate
effort
egg
eight
either
elbow
elder
electric
elegant
element
elephant
elevator
elite
else
embark
embody
embrace
emerge
emotion
employ
empower
empty
enable
enact
end
endless
endorse
enemy
energy
enforce
engage
engine
enhance
enjoy
enlist
enough
enrich
enroll
ensure
enter
entire
entry
envelope
episode
equal
equip
era
erase
erode
erosion
error
erupt
escape
essay
essence
estate
eternal
ethics
evidence
evil
evoke
evolve
exact
example
excess
exchange
excite
exclude
excuse
execute
exercise
exhaust
exhibit
exile
exist
exit
exotic
expand
expect
expire
explain
expose
express
extend
extra
eye
eyebrow
fabric
face
faculty
fade
faint
faith
fall
false
fame
family
famous
fan
fancy
fantasy
farm
fashion
fat
fatal
father
fatigue
fault
favorite
feature
february
federal
fee
feed
feel
female
fence
festival
fetch
fever
few
fiber
fiction
field
figure
file
film
filter
final
find
fine
finger
finish
fire
firm
first
fiscal
fish
fit
fitness
fix
flag
flame
flash
flat
flavor
flee
flight
flip
float
flock
floor
flower
fluid
flush
fly
foam
focus
fog
foil
fold
follow
food
foot
force
forest
forget
fork
fortune
forum
forward
fossil
foster
found
fox
fragile
frame
frequent
fresh
friend
fringe
frog
front
frost
frown
frozen
fruit
fuel
fun
funny
furnace
fury
future
gadget
gain
galaxy
gallery
game
gap
garage
garbage
garden
garlic
garment
gas
gasp
gate
gather
gauge
gaze
general
genius
genre
gentle
genuine
gesture
ghost
giant
gift
giggle
ginger
giraffe
girl
give
glad
glance
glare
glass
glide
glimpse
globe
gloom
glory
glove
glow
glue
goat
goddess
gold
good
goose
gorilla
gospel
gossip
govern
gown
grab
grace
grain
grant
grape
grass
gravity
great
green
grid
grief
grit
grocery
group
grow
grunt
guard
guess
guide
guilt
guitar
gun
gym
habit
hair
half
hammer
hamster
hand
happy
harbor
hard
harsh
harvest
hat
have
hawk
hazard
head
health
heart
heavy
hedgehog
height
hello
helmet
help
hen
hero
hidden
high
hill
hint
hip
hire
history
hobby
hockey
hold
hole
holiday
hollow
home
honey
hood
hope
horn
horror
horse
hospital
host
hotel
hour
hover
hub
huge
human
humble
humor
hundred
hungry
hunt
hurdle
hurry
hurt
husband
hybrid
ice
icon
idea
identify
idle
ignore
ill
illegal
illness
image
imitate
immense
immune
impact
impose
improve
impulse
inch
include
income
increase
index
indicate
indoor
industry
infant
inflict
inform
inhale
inherit
initial
inject
injury
inmate
inner
innocent
input
inquiry
insane
insect
inside
inspire
install
intact
interest
into
invest
invite
involve
iron
island
isolate
issue
item
ivory
jacket
jaguar
jar
jazz
jealous
jeans
jelly
jewel
job
join
joke
journey
joy
judge
juice
jump
jungle
junior
junk
just
kangaroo
keen
keep
ketchup
key
kick
kid
kidney
kind
kingdom
kiss
kit
kitchen
kite
kitten
kiwi
knee
knife
knock
know
lab
label
labor
ladder
lady
lake
lamp
language
laptop
large
later
latin
laugh
laundry
lava
law
lawn
lawsuit
layer
lazy
leader
leaf
learn
leave
lecture
left
leg
legal
legend
leisure
lemon
lend
length
lens
leopard
lesson
letter
level
liar
liberty
library
license
life
lift
light
like
limb
limit
link
lion
liquid
list
little
live
lizard
load
loan
lobster
local
lock
logic
lonely
long
loop
lottery
loud
lounge
love
loyal
lucky
luggage
lumber
lunar
lunch
luxury
lyrics
machine
mad
magic
magnet
maid
mail
main
major
make
mammal
man
manage
mandate
mango
mansion
manual
maple
marble
march
margin
marine
market
marriage
mask
mass
master
match
material
math
matrix
matter
maximum
maze
meadow
mean
measure
meat
mechanic
medal
media
melody
melt
member
memory
mention
menu
mercy
merge
merit
merry
mesh
message
metal
method
middle
midnight
milk
million
mimic
mind
minimum
minor
minute
miracle
mirror
misery
miss
mistake
mix
mixed
mixture
mobile
model
modify
mom
moment
monitor
monkey
monster
month
moon
moral
more
morning
mosquito
mother
motion
motor
mountain
mouse
move
movie
much
muffin
mule
multiply
muscle
museum
mushroom
music
must
mutual
myself
mystery
myth
naive
name
napkin
narrow
nasty
nation
nature
near
neck
need
negative
neglect
neither
nephew
nerve
nest
net
network
neutral
never
news
next
nice
night
noble
noise
nominee
noodle
normal
north
nose
notable
note
nothing
notice
novel
now
nuclear
number
nurse
nut
oak
obey
object
oblige
obscure
observe
obtain
obvious
occur
ocean
october
odor
off
offer
office
often
oil
okay
old
olive
olympic
omit
once
one
onion
online
only
open
opera
opinion
oppose
option
orange
orbit
orchard
order
ordinary
organ
orient
original
orphan
ostrich
other
outdoor
outer
output
outside
oval
oven
over
own
owner
oxygen
oyster
ozone
pact
paddle
page
pair
palace
palm
panda
panel
panic
panther
paper
parade
parent
park
parrot
party
pass
patch
path
patient
patrol
pattern
pause
pave
payment
peace
peanut
pear
peasant
pelican
pen
penalty
pencil
people
pepper
perfect
permit
person
pet
phone
photo
phrase
physical
piano
picnic
picture
piece
pig
pigeon
pill
pilot
pink
pioneer
pipe
pistol
pitch
pizza
place
planet
plastic
plate
play
please
pledge
pluck
plug
plunge
poem
poet
point
polar
pole
police
pond
pony
pool
popular
portion
position
possible
post
potato
pottery
poverty
powder
power
practice
praise
predict
prefer
prepare
present
pretty
prevent
price
pride
primary
print
priority
prison
private
prize
problem
process
produce
profit
program
project
promote
proof
property
prosper
protect
proud
provide
public
pudding
pull
pulp
pulse
pumpkin
punch
pupil
puppy
purchase
purity
purpose
purse
push
put
puzzle
pyramid
quality
quantum
quarter
question
quick
quit
quiz
quote
rabbit
raccoon
race
rack
radar
radio
rail
rain
raise
rally
ramp
ranch
random
range
rapid
rare
rate
rather
raven
raw
razor
ready
real
reason
rebel
rebuild
recall
receive
recipe
record
recycle
reduce
reflect
reform
refuse
region
regret
regular
reject
relax
release
relief
rely
remain
remember
remind
remove
render
renew
rent
reopen
repair
repeat
replace
report
require
rescue
resemble
resist
resource
response
result
retire
retreat
return
reunion
reveal
review
reward
rhythm
rib
ribbon
rice
rich
ride
ridge
rifle
right
rigid
ring
riot
ripple
risk
ritual
rival
river
road
roast
robot
robust
rocket
romance
roof
rookie
room
rose
rotate
rough
round
route
royal
rubber
rude
rug
rule
run
runway
rural
sad
saddle
sadness
safe
sail
salad
salmon
salon
salt
salute
same
sample
sand
satisfy
satoshi
sauce
sausage
save
say
scale
scan
scare
scatter
scene
scheme
school
science
scissors
scorpion
scout
scrap
screen
script
scrub
sea
search
season
seat
second
secret
section
security
seed
seek
segment
select
sell
seminar
senior
sense
sentence
series
service
session
settle
setup
seven
shadow
shaft
shallow
share
shed
shell
sheriff
shield
shift
shine
ship
shiver
shock
shoe
shoot
shop
short
shoulder
shove
shrimp
shrug
shuffle
shy
sibling
sick
side
siege
sight
sign
silent
silk
silly
silver
similar
simple
since
sing
siren
sister
situate
six
size
skate
sketch
ski
skill
skin
skirt
skull
slab
slam
sleep
slender
slice
slide
slight
slim
slogan
slot
slow
slush
small
smart
smile
smoke
smooth
snack
snake
snap
sniff
snow
soap
soccer
social
sock
soda
soft
solar
soldier
solid
solution
solve
someone
song
soon
sorry
sort
soul
sound
soup
source
south
space
spare
spatial
spawn
speak
special
speed
spell
spend
sphere
spice
spider
spike
spin
spirit
split
spoil
sponsor
spoon
sport
spot
spray
spread
spring
spy
square
squeeze
squirrel
stable
stadium
staff
stage
stairs
stamp
stand
start
state
stay
steak
steel
stem
step
stereo
stick
still
sting
stock
stomach
stone
stool
story
stove
strategy
street
strike
strong
struggle
student
stuff
stumble
style
subject
submit
subway
success
such
sudden
suffer
sugar
suggest
suit
summer
sun
sunny
sunset
super
supply
supreme
sure
surface
surge
surprise
surround
survey
suspect
sustain
swallow
swamp
swap
swarm
swear
sweet
swift
swim
swing
switch
sword
symbol
symptom
syrup
system
table
tackle
tag
tail
talent
talk
tank
tape
target
task
taste
tattoo
taxi
teach
team
tell
ten
tenant
tennis
tent
term
test
text
thank
that
theme
then
theory
there
they
thing
this
thought
three
thrive
throw
thumb
thunder
ticket
tide
tiger
tilt
timber
time
tiny
tip
tired
tissue
title
toast
tobacco
today
toddler
toe
together
toilet
token
tomato
tomorrow
tone
tongue
tonight
tool
tooth
top
topic
topple
torch
tornado
tortoise
toss
total
tourist
toward
tower
town
toy
track
trade
traffic
tragic
train
transfer
trap
trash
travel
tray
treat
tree
trend
trial
tribe
trick
trigger
trim
trip
trophy
trouble
truck
true
truly
trumpet
trust
truth
try
tube
tuition
tumble
tuna
tunnel
turkey
turn
turtle
twelve
twenty
twice
twin
twist
two
type
typical
ugly
umbrella
unable
unaware
uncle
uncover
under
undo
unfair
unfold
unhappy
uniform
unique
unit
universe
unknown
unlock
until
unusual
unveil
update
upgrade
uphold
upon
upper
upset
urban
urge
usage
use
used
useful
useless
usual
utility
vacant
vacuum
vague
valid
valley
valve
van
vanish
vapor
various
vast
vault
vehicle
velvet
vendor
venture
venue
verb
verify
version
very
vessel
veteran
viable
vibrant
vicious
victory
video
view
village
vintage
violin
virtual
virus
visa
visit
visual
vital
vivid
vocal
voice
void
volcano
volume
vote
voyage
wage
wagon
wait
walk
wall
walnut
want
warfare
warm
warrior
wash
wasp
waste
water
wave
way
wealth
weapon
wear
weasel
weather
web
wedding
weekend
weird
welcome
west
wet
whale
what
wheat
wheel
when
where
whip
whisper
wide
width
wife
wild
will
win
window
wine
wing
wink
winner
winter
wire
wisdom
wise
wish
witness
wolf
woman
wonder
wood
wool
word
work
world
worry
worth
wrap
wreck
wrestle
wrist
write
wrong
yard
year
yellow
you
young
youth
zebra
zero
zone
zoo`.split("\n");
    function to(e) {
        if (!Number.isSafeInteger(e) || e < 0)
            throw Error(`Wrong positive integer: ${e}`)
    }
    function ta(e, ...t) {
        if (!(e instanceof Uint8Array || null != e && "object" == typeof e && "Uint8Array" === e.constructor.name))
            throw Error("Expected Uint8Array");
        if (t.length > 0 && !t.includes(e.length))
            throw Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`)
    }
    function ts(e) {
        if ("function" != typeof e || "function" != typeof e.create)
            throw Error("Hash should be wrapped by utils.wrapConstructor");
        to(e.outputLen),
        to(e.blockLen)
    }
    function tl(e, t=!0) {
        if (e.destroyed)
            throw Error("Hash instance has been destroyed");
        if (t && e.finished)
            throw Error("Hash#digest() has already been called")
    }
    function tu(e, t) {
        ta(e);
        let r = t.outputLen;
        if (e.length < r)
            throw Error(`digestInto() expects output buffer of length at least ${r}`)
    }
    var tc = {
        number: to,
        bool: function(e) {
            if ("boolean" != typeof e)
                throw Error(`Expected boolean, not ${e}`)
        },
        bytes: ta,
        hash: ts,
        exists: tl,
        output: tu
    };
    let th = "object" == typeof globalThis && "crypto"in globalThis ? globalThis.crypto : void 0;
    function tf(e) {
        return e instanceof Uint8Array || null != e && "object" == typeof e && "Uint8Array" === e.constructor.name
    }
    let td = e=>new DataView(e.buffer,e.byteOffset,e.byteLength)
      , tp = (e,t)=>e << 32 - t | e >>> t;
    if (68 !== new Uint8Array(new Uint32Array([287454020]).buffer)[0])
        throw Error("Non little-endian hardware is not supported");
    let tg = Array.from({
        length: 256
    }, (e,t)=>t.toString(16).padStart(2, "0"))
      , ty = {
        _0: 48,
        _9: 57,
        _A: 65,
        _F: 70,
        _a: 97,
        _f: 102
    };
    function tb(e) {
        return e >= ty._0 && e <= ty._9 ? e - ty._0 : e >= ty._A && e <= ty._F ? e - (ty._A - 10) : e >= ty._a && e <= ty._f ? e - (ty._a - 10) : void 0
    }
    function tm(e) {
        if ("string" != typeof e)
            throw Error(`utf8ToBytes expected string, got ${typeof e}`);
        return new Uint8Array(new TextEncoder().encode(e))
    }
    function tw(e) {
        if ("string" == typeof e && (e = tm(e)),
        !tf(e))
            throw Error(`expected Uint8Array, got ${typeof e}`);
        return e
    }
    function tv(...e) {
        let t = 0;
        for (let r = 0; r < e.length; r++) {
            let n = e[r];
            if (!tf(n))
                throw Error("Uint8Array expected");
            t += n.length
        }
        let r = new Uint8Array(t);
        for (let t = 0, n = 0; t < e.length; t++) {
            let i = e[t];
            r.set(i, n),
            n += i.length
        }
        return r
    }
    class tE {
        clone() {
            return this._cloneInto()
        }
    }
    let tx = {}.toString;
    function tk(e) {
        let t = t=>e().update(tw(t)).digest()
          , r = e();
        return t.outputLen = r.outputLen,
        t.blockLen = r.blockLen,
        t.create = ()=>e(),
        t
    }
    class tA extends tE {
        constructor(e, t) {
            super(),
            this.finished = !1,
            this.destroyed = !1,
            ts(e);
            let r = tw(t);
            if (this.iHash = e.create(),
            "function" != typeof this.iHash.update)
                throw Error("Expected instance of class which extends utils.Hash");
            this.blockLen = this.iHash.blockLen,
            this.outputLen = this.iHash.outputLen;
            let n = this.blockLen
              , i = new Uint8Array(n);
            i.set(r.length > n ? e.create().update(r).digest() : r);
            for (let e = 0; e < i.length; e++)
                i[e] ^= 54;
            this.iHash.update(i),
            this.oHash = e.create();
            for (let e = 0; e < i.length; e++)
                i[e] ^= 106;
            this.oHash.update(i),
            i.fill(0)
        }
        update(e) {
            return tl(this),
            this.iHash.update(e),
            this
        }
        digestInto(e) {
            tl(this),
            ta(e, this.outputLen),
            this.finished = !0,
            this.iHash.digestInto(e),
            this.oHash.update(e),
            this.oHash.digestInto(e),
            this.destroy()
        }
        digest() {
            let e = new Uint8Array(this.oHash.outputLen);
            return this.digestInto(e),
            e
        }
        _cloneInto(e) {
            e || (e = Object.create(Object.getPrototypeOf(this), {}));
            let {oHash: t, iHash: r, finished: n, destroyed: i, blockLen: o, outputLen: a} = this;
            return e.finished = n,
            e.destroyed = i,
            e.blockLen = o,
            e.outputLen = a,
            e.oHash = t._cloneInto(e.oHash),
            e.iHash = r._cloneInto(e.iHash),
            e
        }
        destroy() {
            this.destroyed = !0,
            this.oHash.destroy(),
            this.iHash.destroy()
        }
    }
    let tB = (e,t,r)=>new tA(e,t).update(r).digest();
    tB.create = (e,t)=>new tA(e,t);
    class tI extends tE {
        constructor(e, t, r, n) {
            super(),
            this.blockLen = e,
            this.outputLen = t,
            this.padOffset = r,
            this.isLE = n,
            this.finished = !1,
            this.length = 0,
            this.pos = 0,
            this.destroyed = !1,
            this.buffer = new Uint8Array(e),
            this.view = td(this.buffer)
        }
        update(e) {
            tl(this);
            let {view: t, buffer: r, blockLen: n} = this
              , i = (e = tw(e)).length;
            for (let o = 0; o < i; ) {
                let a = Math.min(n - this.pos, i - o);
                if (a === n) {
                    let t = td(e);
                    for (; n <= i - o; o += n)
                        this.process(t, o);
                    continue
                }
                r.set(e.subarray(o, o + a), this.pos),
                this.pos += a,
                o += a,
                this.pos === n && (this.process(t, 0),
                this.pos = 0)
            }
            return this.length += e.length,
            this.roundClean(),
            this
        }
        digestInto(e) {
            tl(this),
            tu(e, this),
            this.finished = !0;
            let {buffer: t, view: r, blockLen: n, isLE: i} = this
              , {pos: o} = this;
            t[o++] = 128,
            this.buffer.subarray(o).fill(0),
            this.padOffset > n - o && (this.process(r, 0),
            o = 0);
            for (let e = o; e < n; e++)
                t[e] = 0;
            !function(e, t, r, n) {
                if ("function" == typeof e.setBigUint64)
                    return e.setBigUint64(t, r, n);
                let i = BigInt(32)
                  , o = BigInt(4294967295)
                  , a = Number(r >> i & o)
                  , s = Number(r & o)
                  , l = n ? 4 : 0
                  , u = n ? 0 : 4;
                e.setUint32(t + l, a, n),
                e.setUint32(t + u, s, n)
            }(r, n - 8, BigInt(8 * this.length), i),
            this.process(r, 0);
            let a = td(e)
              , s = this.outputLen;
            if (s % 4)
                throw Error("_sha2: outputLen should be aligned to 32bit");
            let l = s / 4
              , u = this.get();
            if (l > u.length)
                throw Error("_sha2: outputLen bigger than state");
            for (let e = 0; e < l; e++)
                a.setUint32(4 * e, u[e], i)
        }
        digest() {
            let {buffer: e, outputLen: t} = this;
            this.digestInto(e);
            let r = e.slice(0, t);
            return this.destroy(),
            r
        }
        _cloneInto(e) {
            e || (e = new this.constructor),
            e.set(...this.get());
            let {blockLen: t, buffer: r, length: n, finished: i, destroyed: o, pos: a} = this;
            return e.length = n,
            e.pos = a,
            e.finished = i,
            e.destroyed = o,
            n % t && e.buffer.set(r),
            e
        }
    }
    let tU = (e,t,r)=>e & t ^ ~e & r
      , tS = (e,t,r)=>e & t ^ e & r ^ t & r
      , tL = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298])
      , t_ = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225])
      , t$ = new Uint32Array(64);
    class tH extends tI {
        constructor() {
            super(64, 32, 8, !1),
            this.A = 0 | t_[0],
            this.B = 0 | t_[1],
            this.C = 0 | t_[2],
            this.D = 0 | t_[3],
            this.E = 0 | t_[4],
            this.F = 0 | t_[5],
            this.G = 0 | t_[6],
            this.H = 0 | t_[7]
        }
        get() {
            let {A: e, B: t, C: r, D: n, E: i, F: o, G: a, H: s} = this;
            return [e, t, r, n, i, o, a, s]
        }
        set(e, t, r, n, i, o, a, s) {
            this.A = 0 | e,
            this.B = 0 | t,
            this.C = 0 | r,
            this.D = 0 | n,
            this.E = 0 | i,
            this.F = 0 | o,
            this.G = 0 | a,
            this.H = 0 | s
        }
        process(e, t) {
            for (let r = 0; r < 16; r++,
            t += 4)
                t$[r] = e.getUint32(t, !1);
            for (let e = 16; e < 64; e++) {
                let t = t$[e - 15]
                  , r = t$[e - 2]
                  , n = tp(t, 7) ^ tp(t, 18) ^ t >>> 3
                  , i = tp(r, 17) ^ tp(r, 19) ^ r >>> 10;
                t$[e] = i + t$[e - 7] + n + t$[e - 16] | 0
            }
            let {A: r, B: n, C: i, D: o, E: a, F: s, G: l, H: u} = this;
            for (let e = 0; e < 64; e++) {
                let t = u + (tp(a, 6) ^ tp(a, 11) ^ tp(a, 25)) + tU(a, s, l) + tL[e] + t$[e] | 0
                  , c = (tp(r, 2) ^ tp(r, 13) ^ tp(r, 22)) + tS(r, n, i) | 0;
                u = l,
                l = s,
                s = a,
                a = o + t | 0,
                o = i,
                i = n,
                n = r,
                r = t + c | 0
            }
            r = r + this.A | 0,
            n = n + this.B | 0,
            i = i + this.C | 0,
            o = o + this.D | 0,
            a = a + this.E | 0,
            s = s + this.F | 0,
            l = l + this.G | 0,
            u = u + this.H | 0,
            this.set(r, n, i, o, a, s, l, u)
        }
        roundClean() {
            t$.fill(0)
        }
        destroy() {
            this.set(0, 0, 0, 0, 0, 0, 0, 0),
            this.buffer.fill(0)
        }
    }
    let tC = tk(()=>new tH)
      , tR = BigInt(4294967296 - 1)
      , tN = BigInt(32);
    function tO(e, t=!1) {
        return t ? {
            h: Number(e & tR),
            l: Number(e >> tN & tR)
        } : {
            h: 0 | Number(e >> tN & tR),
            l: 0 | Number(e & tR)
        }
    }
    var tK = {
        fromBig: tO,
        split: function(e, t=!1) {
            let r = new Uint32Array(e.length)
              , n = new Uint32Array(e.length);
            for (let i = 0; i < e.length; i++) {
                let {h: o, l: a} = tO(e[i], t);
                [r[i],n[i]] = [o, a]
            }
            return [r, n]
        },
        toBig: (e,t)=>BigInt(e >>> 0) << tN | BigInt(t >>> 0),
        shrSH: (e,t,r)=>e >>> r,
        shrSL: (e,t,r)=>e << 32 - r | t >>> r,
        rotrSH: (e,t,r)=>e >>> r | t << 32 - r,
        rotrSL: (e,t,r)=>e << 32 - r | t >>> r,
        rotrBH: (e,t,r)=>e << 64 - r | t >>> r - 32,
        rotrBL: (e,t,r)=>e >>> r - 32 | t << 64 - r,
        rotr32H: (e,t)=>t,
        rotr32L: (e,t)=>e,
        rotlSH: (e,t,r)=>e << r | t >>> 32 - r,
        rotlSL: (e,t,r)=>t << r | e >>> 32 - r,
        rotlBH: (e,t,r)=>t << r - 32 | e >>> 64 - r,
        rotlBL: (e,t,r)=>e << r - 32 | t >>> 64 - r,
        add: function(e, t, r, n) {
            let i = (t >>> 0) + (n >>> 0);
            return {
                h: e + r + (i / 4294967296 | 0) | 0,
                l: 0 | i
            }
        },
        add3L: (e,t,r)=>(e >>> 0) + (t >>> 0) + (r >>> 0),
        add3H: (e,t,r,n)=>t + r + n + (e / 4294967296 | 0) | 0,
        add4L: (e,t,r,n)=>(e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0),
        add4H: (e,t,r,n,i)=>t + r + n + i + (e / 4294967296 | 0) | 0,
        add5H: (e,t,r,n,i,o)=>t + r + n + i + o + (e / 4294967296 | 0) | 0,
        add5L: (e,t,r,n,i)=>(e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (i >>> 0)
    };
    let[tq,tz] = tK.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map(e=>BigInt(e)))
      , tj = new Uint32Array(80)
      , tT = new Uint32Array(80);
    class tP extends tI {
        constructor() {
            super(128, 64, 16, !1),
            this.Ah = 1779033703,
            this.Al = -205731576,
            this.Bh = -1150833019,
            this.Bl = -2067093701,
            this.Ch = 1013904242,
            this.Cl = -23791573,
            this.Dh = -1521486534,
            this.Dl = 1595750129,
            this.Eh = 1359893119,
            this.El = -1377402159,
            this.Fh = -1694144372,
            this.Fl = 725511199,
            this.Gh = 528734635,
            this.Gl = -79577749,
            this.Hh = 1541459225,
            this.Hl = 327033209
        }
        get() {
            let {Ah: e, Al: t, Bh: r, Bl: n, Ch: i, Cl: o, Dh: a, Dl: s, Eh: l, El: u, Fh: c, Fl: h, Gh: f, Gl: d, Hh: p, Hl: g} = this;
            return [e, t, r, n, i, o, a, s, l, u, c, h, f, d, p, g]
        }
        set(e, t, r, n, i, o, a, s, l, u, c, h, f, d, p, g) {
            this.Ah = 0 | e,
            this.Al = 0 | t,
            this.Bh = 0 | r,
            this.Bl = 0 | n,
            this.Ch = 0 | i,
            this.Cl = 0 | o,
            this.Dh = 0 | a,
            this.Dl = 0 | s,
            this.Eh = 0 | l,
            this.El = 0 | u,
            this.Fh = 0 | c,
            this.Fl = 0 | h,
            this.Gh = 0 | f,
            this.Gl = 0 | d,
            this.Hh = 0 | p,
            this.Hl = 0 | g
        }
        process(e, t) {
            for (let r = 0; r < 16; r++,
            t += 4)
                tj[r] = e.getUint32(t),
                tT[r] = e.getUint32(t += 4);
            for (let e = 16; e < 80; e++) {
                let t = 0 | tj[e - 15]
                  , r = 0 | tT[e - 15]
                  , n = tK.rotrSH(t, r, 1) ^ tK.rotrSH(t, r, 8) ^ tK.shrSH(t, r, 7)
                  , i = tK.rotrSL(t, r, 1) ^ tK.rotrSL(t, r, 8) ^ tK.shrSL(t, r, 7)
                  , o = 0 | tj[e - 2]
                  , a = 0 | tT[e - 2]
                  , s = tK.rotrSH(o, a, 19) ^ tK.rotrBH(o, a, 61) ^ tK.shrSH(o, a, 6)
                  , l = tK.rotrSL(o, a, 19) ^ tK.rotrBL(o, a, 61) ^ tK.shrSL(o, a, 6)
                  , u = tK.add4L(i, l, tT[e - 7], tT[e - 16])
                  , c = tK.add4H(u, n, s, tj[e - 7], tj[e - 16]);
                tj[e] = 0 | c,
                tT[e] = 0 | u
            }
            let {Ah: r, Al: n, Bh: i, Bl: o, Ch: a, Cl: s, Dh: l, Dl: u, Eh: c, El: h, Fh: f, Fl: d, Gh: p, Gl: g, Hh: y, Hl: b} = this;
            for (let e = 0; e < 80; e++) {
                let t = tK.rotrSH(c, h, 14) ^ tK.rotrSH(c, h, 18) ^ tK.rotrBH(c, h, 41)
                  , m = tK.rotrSL(c, h, 14) ^ tK.rotrSL(c, h, 18) ^ tK.rotrBL(c, h, 41)
                  , w = c & f ^ ~c & p
                  , v = h & d ^ ~h & g
                  , E = tK.add5L(b, m, v, tz[e], tT[e])
                  , x = tK.add5H(E, y, t, w, tq[e], tj[e])
                  , k = 0 | E
                  , A = tK.rotrSH(r, n, 28) ^ tK.rotrBH(r, n, 34) ^ tK.rotrBH(r, n, 39)
                  , B = tK.rotrSL(r, n, 28) ^ tK.rotrBL(r, n, 34) ^ tK.rotrBL(r, n, 39)
                  , I = r & i ^ r & a ^ i & a
                  , U = n & o ^ n & s ^ o & s;
                y = 0 | p,
                b = 0 | g,
                p = 0 | f,
                g = 0 | d,
                f = 0 | c,
                d = 0 | h,
                ({h: c, l: h} = tK.add(0 | l, 0 | u, 0 | x, 0 | k)),
                l = 0 | a,
                u = 0 | s,
                a = 0 | i,
                s = 0 | o,
                i = 0 | r,
                o = 0 | n;
                let S = tK.add3L(k, B, U);
                r = tK.add3H(S, x, A, I),
                n = 0 | S
            }
            ({h: r, l: n} = tK.add(0 | this.Ah, 0 | this.Al, 0 | r, 0 | n)),
            ({h: i, l: o} = tK.add(0 | this.Bh, 0 | this.Bl, 0 | i, 0 | o)),
            ({h: a, l: s} = tK.add(0 | this.Ch, 0 | this.Cl, 0 | a, 0 | s)),
            ({h: l, l: u} = tK.add(0 | this.Dh, 0 | this.Dl, 0 | l, 0 | u)),
            ({h: c, l: h} = tK.add(0 | this.Eh, 0 | this.El, 0 | c, 0 | h)),
            ({h: f, l: d} = tK.add(0 | this.Fh, 0 | this.Fl, 0 | f, 0 | d)),
            ({h: p, l: g} = tK.add(0 | this.Gh, 0 | this.Gl, 0 | p, 0 | g)),
            ({h: y, l: b} = tK.add(0 | this.Hh, 0 | this.Hl, 0 | y, 0 | b)),
            this.set(r, n, i, o, a, s, l, u, c, h, f, d, p, g, y, b)
        }
        roundClean() {
            tj.fill(0),
            tT.fill(0)
        }
        destroy() {
            this.buffer.fill(0),
            this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        }
    }
    let tD = tk(()=>new tP)
      , tM = e=>"あいこくしん" === e[0];
    function tF(e) {
        if ("string" != typeof e)
            throw TypeError(`Invalid mnemonic type: ${typeof e}`);
        return e.normalize("NFKD")
    }
    function tV(e) {
        let t = tF(e)
          , r = t.split(" ");
        if (![12, 15, 18, 21, 24].includes(r.length))
            throw Error("Invalid mnemonic");
        return {
            nfkd: t,
            words: r
        }
    }
    function tZ(e) {
        tc.bytes(e, 16, 20, 24, 28, 32)
    }
    let tG = e=>{
        let t = 8 - e.length / 4;
        return new Uint8Array([tC(e)[0] >> t << t])
    }
    ;
    function tW(e) {
        if (!Array.isArray(e) || 2048 !== e.length || "string" != typeof e[0])
            throw Error("Worlist: expected array of 2048 strings");
        return e.forEach(e=>{
            if ("string" != typeof e)
                throw Error(`Wordlist: non-string element: ${e}`)
        }
        ),
        e8.chain(e8.checksum(1, tG), e8.radix2(11, !0), e8.alphabet(e))
    }
    let tJ = e=>tF(`mnemonic${e}`)
      , tY = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8])
      , tQ = Uint8Array.from({
        length: 16
    }, (e,t)=>t)
      , tX = tQ.map(e=>(9 * e + 5) % 16)
      , t0 = [tQ]
      , t1 = [tX];
    for (let e = 0; e < 4; e++)
        for (let t of [t0, t1])
            t.push(t[e].map(e=>tY[e]));
    let t2 = [[11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8], [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7], [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9], [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6], [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]].map(e=>new Uint8Array(e))
      , t3 = t0.map((e,t)=>e.map(e=>t2[t][e]))
      , t8 = t1.map((e,t)=>e.map(e=>t2[t][e]))
      , t4 = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838])
      , t5 = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0])
      , t6 = (e,t)=>e << t | e >>> 32 - t;
    function t9(e, t, r, n) {
        return 0 === e ? t ^ r ^ n : 1 === e ? t & r | ~t & n : 2 === e ? (t | ~r) ^ n : 3 === e ? t & n | r & ~n : t ^ (r | ~n)
    }
    let t7 = new Uint32Array(16);
    class re extends tI {
        constructor() {
            super(64, 20, 8, !0),
            this.h0 = 1732584193,
            this.h1 = -271733879,
            this.h2 = -1732584194,
            this.h3 = 271733878,
            this.h4 = -1009589776
        }
        get() {
            let {h0: e, h1: t, h2: r, h3: n, h4: i} = this;
            return [e, t, r, n, i]
        }
        set(e, t, r, n, i) {
            this.h0 = 0 | e,
            this.h1 = 0 | t,
            this.h2 = 0 | r,
            this.h3 = 0 | n,
            this.h4 = 0 | i
        }
        process(e, t) {
            for (let r = 0; r < 16; r++,
            t += 4)
                t7[r] = e.getUint32(t, !0);
            let r = 0 | this.h0
              , n = r
              , i = 0 | this.h1
              , o = i
              , a = 0 | this.h2
              , s = a
              , l = 0 | this.h3
              , u = l
              , c = 0 | this.h4
              , h = c;
            for (let e = 0; e < 5; e++) {
                let t = 4 - e
                  , f = t4[e]
                  , d = t5[e]
                  , p = t0[e]
                  , g = t1[e]
                  , y = t3[e]
                  , b = t8[e];
                for (let t = 0; t < 16; t++) {
                    let n = t6(r + t9(e, i, a, l) + t7[p[t]] + f, y[t]) + c | 0;
                    r = c,
                    c = l,
                    l = 0 | t6(a, 10),
                    a = i,
                    i = n
                }
                for (let e = 0; e < 16; e++) {
                    let r = t6(n + t9(t, o, s, u) + t7[g[e]] + d, b[e]) + h | 0;
                    n = h,
                    h = u,
                    u = 0 | t6(s, 10),
                    s = o,
                    o = r
                }
            }
            this.set(this.h1 + a + u | 0, this.h2 + l + h | 0, this.h3 + c + n | 0, this.h4 + r + o | 0, this.h0 + i + s | 0)
        }
        roundClean() {
            t7.fill(0)
        }
        destroy() {
            this.destroyed = !0,
            this.buffer.fill(0),
            this.set(0, 0, 0, 0, 0)
        }
    }
    let rt = tk(()=>new re)
      , rr = eU.ProjectivePoint
      , rn = eF(e3(4, e=>tC(tC(e))), e6);
    function ri(e) {
        return BigInt(`0x${function(e) {
            if (!tf(e))
                throw Error("Uint8Array expected");
            lett = "";
            for (letr = 0; r < e.length; r++)
                t += tg[e[r]];
            return t
        }(e)}`)
    }
    let ro = tm("Bitcoin seed")
      , ra = {
        private: 76066276,
        public: 76067358
    }
      , rs = e=>rt(tC(e))
      , rl = e=>td(e).getUint32(0, !1)
      , ru = e=>{
        if (!Number.isSafeInteger(e) || e < 0 || e > 4294967296 - 1)
            throw Error(`Invalid number=${e}. Should be from 0 to 2 ** 32 - 1`);
        let t = new Uint8Array(4);
        return td(t).setUint32(0, e, !1),
        t
    }
    ;
    class rc {
        get fingerprint() {
            if (!this.pubHash)
                throw Error("No publicKey set!");
            return rl(this.pubHash)
        }
        get identifier() {
            return this.pubHash
        }
        get pubKeyHash() {
            return this.pubHash
        }
        get privateKey() {
            return this.privKeyBytes || null
        }
        get publicKey() {
            return this.pubKey || null
        }
        get privateExtendedKey() {
            let e = this.privateKey;
            if (!e)
                throw Error("No private key");
            return rn.encode(this.serialize(this.versions.private, tv(new Uint8Array([0]), e)))
        }
        get publicExtendedKey() {
            if (!this.pubKey)
                throw Error("No public key");
            return rn.encode(this.serialize(this.versions.public, this.pubKey))
        }
        static fromMasterSeed(e, t=ra) {
            if (ta(e),
            8 * e.length < 128 || 8 * e.length > 512)
                throw Error(`HDKey: wrong seed length=${e.length}. Should be between 128 and 512 bits; 256 bits is advised)`);
            let r = tB(tD, ro, e);
            return new rc({
                versions: t,
                chainCode: r.slice(32),
                privateKey: r.slice(0, 32)
            })
        }
        static fromExtendedKey(e, t=ra) {
            let r = rn.decode(e)
              , n = td(r)
              , i = n.getUint32(0, !1)
              , o = {
                versions: t,
                depth: r[4],
                parentFingerprint: n.getUint32(5, !1),
                index: n.getUint32(9, !1),
                chainCode: r.slice(13, 45)
            }
              , a = r.slice(45)
              , s = 0 === a[0];
            if (i !== t[s ? "private" : "public"])
                throw Error("Version mismatch");
            return new rc(s ? {
                ...o,
                privateKey: a.slice(1)
            } : {
                ...o,
                publicKey: a
            })
        }
        static fromJSON(e) {
            return rc.fromExtendedKey(e.xpriv)
        }
        constructor(e) {
            if (this.depth = 0,
            this.index = 0,
            this.chainCode = null,
            this.parentFingerprint = 0,
            !e || "object" != typeof e)
                throw Error("HDKey.constructor must not be called directly");
            if (this.versions = e.versions || ra,
            this.depth = e.depth || 0,
            this.chainCode = e.chainCode,
            this.index = e.index || 0,
            this.parentFingerprint = e.parentFingerprint || 0,
            !this.depth && (this.parentFingerprint || this.index))
                throw Error("HDKey: zero depth with non-zero index/parent fingerprint");
            if (e.publicKey && e.privateKey)
                throw Error("HDKey: publicKey and privateKey at same time.");
            if (e.privateKey) {
                if (!eU.utils.isValidPrivateKey(e.privateKey))
                    throw Error("Invalid private key");
                this.privKey = "bigint" == typeof e.privateKey ? e.privateKey : ri(e.privateKey),
                this.privKeyBytes = function(e) {
                    if ("string" != typeof e)
                        throw Error("hex string expected, got " + typeof e);
                    let t = e.length
                      , r = t / 2;
                    if (t % 2)
                        throw Error("padded hex string expected, got unpadded hex of length " + t);
                    let n = new Uint8Array(r);
                    for (let t = 0, i = 0; t < r; t++,
                    i += 2) {
                        let r = tb(e.charCodeAt(i))
                          , o = tb(e.charCodeAt(i + 1));
                        if (void 0 === r || void 0 === o)
                            throw Error('hex string expected, got non-hex character "' + (e[i] + e[i + 1]) + '" at index ' + i);
                        n[t] = 16 * r + o
                    }
                    return n
                }(this.privKey.toString(16).padStart(64, "0")),
                this.pubKey = eU.getPublicKey(e.privateKey, !0)
            } else if (e.publicKey)
                this.pubKey = rr.fromHex(e.publicKey).toRawBytes(!0);
            else
                throw Error("HDKey: no public or private key provided");
            this.pubHash = rs(this.pubKey)
        }
        derive(e) {
            if (!/^[mM]'?/.test(e))
                throw Error('Path must start with "m" or "M"');
            if (/^[mM]'?$/.test(e))
                return this;
            let t = e.replace(/^[mM]'?\//, "").split("/")
              , r = this;
            for (let e of t) {
                let t = /^(\d+)('?)$/.exec(e);
                if (!t || 3 !== t.length)
                    throw Error(`Invalid child index: ${e}`);
                let n = +t[1];
                if (!Number.isSafeInteger(n) || n >= 2147483648)
                    throw Error("Invalid index");
                "'" === t[2] && (n += 2147483648),
                r = r.deriveChild(n)
            }
            return r
        }
        deriveChild(e) {
            if (!this.pubKey || !this.chainCode)
                throw Error("No publicKey or chainCode set");
            let t = ru(e);
            if (e >= 2147483648) {
                let e = this.privateKey;
                if (!e)
                    throw Error("Could not derive hardened child key");
                t = tv(new Uint8Array([0]), e, t)
            } else
                t = tv(this.pubKey, t);
            let r = tB(tD, this.chainCode, t)
              , n = ri(r.slice(0, 32))
              , i = r.slice(32);
            if (!eU.utils.isValidPrivateKey(n))
                throw Error("Tweak bigger than curve order");
            let o = {
                versions: this.versions,
                chainCode: i,
                depth: this.depth + 1,
                parentFingerprint: this.fingerprint,
                index: e
            };
            try {
                if (this.privateKey) {
                    let e = ei(this.privKey + n, eU.CURVE.n);
                    if (!eU.utils.isValidPrivateKey(e))
                        throw Error("The tweak was out of range or the resulted private key is invalid");
                    o.privateKey = e
                } else {
                    let e = rr.fromHex(this.pubKey).add(rr.fromPrivateKey(n));
                    if (e.equals(rr.ZERO))
                        throw Error("The tweak was equal to negative P, which made the result key invalid");
                    o.publicKey = e.toRawBytes(!0)
                }
                return new rc(o)
            } catch (t) {
                return this.deriveChild(e + 1)
            }
        }
        sign(e) {
            if (!this.privateKey)
                throw Error("No privateKey set!");
            return ta(e, 32),
            eU.sign(e, this.privKey).toCompactRawBytes()
        }
        verify(e, t) {
            let r;
            if (ta(e, 32),
            ta(t, 64),
            !this.publicKey)
                throw Error("No publicKey set!");
            try {
                r = eU.Signature.fromCompact(t)
            } catch (e) {
                return !1
            }
            return eU.verify(r, e, this.publicKey)
        }
        wipePrivateData() {
            return this.privKey = void 0,
            this.privKeyBytes && (this.privKeyBytes.fill(0),
            this.privKeyBytes = void 0),
            this
        }
        toJSON() {
            return {
                xpriv: this.privateExtendedKey,
                xpub: this.publicExtendedKey
            }
        }
        serialize(e, t) {
            if (!this.chainCode)
                throw Error("No chainCode set");
            return ta(t, 33),
            tv(ru(e), new Uint8Array([this.depth]), ru(this.parentFingerprint), ru(this.index), this.chainCode, t)
        }
    }
    /*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) */
    let rh = e=>e instanceof Uint8Array
      , rf = e=>new Uint32Array(e.buffer,e.byteOffset,Math.floor(e.byteLength / 4));
    if (68 !== new Uint8Array(new Uint32Array([287454020]).buffer)[0])
        throw Error("Non little-endian hardware is not supported");
    function rd(e) {
        if ("string" != typeof e)
            throw Error(`utf8ToBytes expected string, got ${typeof e}`);
        return new Uint8Array(new TextEncoder().encode(e))
    }
    function rp(e) {
        if ("string" == typeof e && (e = rd(e)),
        !rh(e))
            throw Error(`expected Uint8Array, got ${typeof e}`);
        return e
    }
    let rg = e=>"[object Object]" === Object.prototype.toString.call(e) && e.constructor === Object;
    function ry(e, t) {
        if (!(e instanceof Uint8Array))
            throw Error("Uint8Array expected");
        if ("number" == typeof t && e.length !== t)
            throw Error(`Uint8Array length ${t} expected`)
    }
    function rb(e) {
        if (!Number.isSafeInteger(e) || e < 0)
            throw Error(`Wrong positive integer: ${e}`)
    }
    function rm(e, ...t) {
        if (!(e instanceof Uint8Array))
            throw Error("Expected Uint8Array");
        if (t.length > 0 && !t.includes(e.length))
            throw Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`)
    }
    var rw = {
        number: rb,
        bool: function(e) {
            if ("boolean" != typeof e)
                throw Error(`Expected boolean, not ${e}`)
        },
        bytes: rm,
        hash: function(e) {
            if ("function" != typeof e || "function" != typeof e.create)
                throw Error("hash must be wrapped by utils.wrapConstructor");
            rb(e.outputLen),
            rb(e.blockLen)
        },
        exists: function(e, t=!0) {
            if (e.destroyed)
                throw Error("Hash instance has been destroyed");
            if (t && e.finished)
                throw Error("Hash#digest() has already been called")
        },
        output: function(e, t) {
            rm(e);
            let r = t.outputLen;
            if (e.length < r)
                throw Error(`digestInto() expects output buffer of length at least ${r}`)
        }
    };
    let rv = (e,t)=>255 & e[t++] | (255 & e[t++]) << 8;
    class rE {
        constructor(e) {
            this.blockLen = 16,
            this.outputLen = 16,
            this.buffer = new Uint8Array(16),
            this.r = new Uint16Array(10),
            this.h = new Uint16Array(10),
            this.pad = new Uint16Array(8),
            this.pos = 0,
            this.finished = !1,
            ry(e = rp(e), 32);
            let t = rv(e, 0)
              , r = rv(e, 2)
              , n = rv(e, 4)
              , i = rv(e, 6)
              , o = rv(e, 8)
              , a = rv(e, 10)
              , s = rv(e, 12)
              , l = rv(e, 14);
            this.r[0] = 8191 & t,
            this.r[1] = (t >>> 13 | r << 3) & 8191,
            this.r[2] = (r >>> 10 | n << 6) & 7939,
            this.r[3] = (n >>> 7 | i << 9) & 8191,
            this.r[4] = (i >>> 4 | o << 12) & 255,
            this.r[5] = o >>> 1 & 8190,
            this.r[6] = (o >>> 14 | a << 2) & 8191,
            this.r[7] = (a >>> 11 | s << 5) & 8065,
            this.r[8] = (s >>> 8 | l << 8) & 8191,
            this.r[9] = l >>> 5 & 127;
            for (let t = 0; t < 8; t++)
                this.pad[t] = rv(e, 16 + 2 * t)
        }
        process(e, t, r=!1) {
            let {h: n, r: i} = this
              , o = i[0]
              , a = i[1]
              , s = i[2]
              , l = i[3]
              , u = i[4]
              , c = i[5]
              , h = i[6]
              , f = i[7]
              , d = i[8]
              , p = i[9]
              , g = rv(e, t + 0)
              , y = rv(e, t + 2)
              , b = rv(e, t + 4)
              , m = rv(e, t + 6)
              , w = rv(e, t + 8)
              , v = rv(e, t + 10)
              , E = rv(e, t + 12)
              , x = rv(e, t + 14)
              , k = n[0] + (8191 & g)
              , A = n[1] + ((g >>> 13 | y << 3) & 8191)
              , B = n[2] + ((y >>> 10 | b << 6) & 8191)
              , I = n[3] + ((b >>> 7 | m << 9) & 8191)
              , U = n[4] + ((m >>> 4 | w << 12) & 8191)
              , S = n[5] + (w >>> 1 & 8191)
              , L = n[6] + ((w >>> 14 | v << 2) & 8191)
              , _ = n[7] + ((v >>> 11 | E << 5) & 8191)
              , $ = n[8] + ((E >>> 8 | x << 8) & 8191)
              , H = n[9] + (x >>> 5 | (r ? 0 : 2048))
              , C = 0
              , R = 0 + k * o + 5 * p * A + 5 * d * B + 5 * f * I + 5 * h * U;
            C = R >>> 13,
            R &= 8191,
            R += 5 * c * S + 5 * u * L + 5 * l * _ + 5 * s * $ + 5 * a * H,
            C += R >>> 13,
            R &= 8191;
            let N = C + k * a + A * o + 5 * p * B + 5 * d * I + 5 * f * U;
            C = N >>> 13,
            N &= 8191,
            N += 5 * h * S + 5 * c * L + 5 * u * _ + 5 * l * $ + 5 * s * H,
            C += N >>> 13,
            N &= 8191;
            let O = C + k * s + A * a + B * o + 5 * p * I + 5 * d * U;
            C = O >>> 13,
            O &= 8191,
            O += 5 * f * S + 5 * h * L + 5 * c * _ + 5 * u * $ + 5 * l * H,
            C += O >>> 13,
            O &= 8191;
            let K = C + k * l + A * s + B * a + I * o + 5 * p * U;
            C = K >>> 13,
            K &= 8191,
            K += 5 * d * S + 5 * f * L + 5 * h * _ + 5 * c * $ + 5 * u * H,
            C += K >>> 13,
            K &= 8191;
            let q = C + k * u + A * l + B * s + I * a + U * o;
            C = q >>> 13,
            q &= 8191,
            q += 5 * p * S + 5 * d * L + 5 * f * _ + 5 * h * $ + 5 * c * H,
            C += q >>> 13,
            q &= 8191;
            let z = C + k * c + A * u + B * l + I * s + U * a;
            C = z >>> 13,
            z &= 8191,
            z += S * o + 5 * p * L + 5 * d * _ + 5 * f * $ + 5 * h * H,
            C += z >>> 13,
            z &= 8191;
            let j = C + k * h + A * c + B * u + I * l + U * s;
            C = j >>> 13,
            j &= 8191,
            j += S * a + L * o + 5 * p * _ + 5 * d * $ + 5 * f * H,
            C += j >>> 13,
            j &= 8191;
            let T = C + k * f + A * h + B * c + I * u + U * l;
            C = T >>> 13,
            T &= 8191,
            T += S * s + L * a + _ * o + 5 * p * $ + 5 * d * H,
            C += T >>> 13,
            T &= 8191;
            let P = C + k * d + A * f + B * h + I * c + U * u;
            C = P >>> 13,
            P &= 8191,
            P += S * l + L * s + _ * a + $ * o + 5 * p * H,
            C += P >>> 13,
            P &= 8191;
            let D = C + k * p + A * d + B * f + I * h + U * c;
            C = D >>> 13,
            D &= 8191,
            D += S * u + L * l + _ * s + $ * a + H * o,
            C += D >>> 13,
            D &= 8191,
            R = 8191 & (C = (C = (C << 2) + C | 0) + R | 0),
            C >>>= 13,
            N += C,
            n[0] = R,
            n[1] = N,
            n[2] = O,
            n[3] = K,
            n[4] = q,
            n[5] = z,
            n[6] = j,
            n[7] = T,
            n[8] = P,
            n[9] = D
        }
        finalize() {
            let {h: e, pad: t} = this
              , r = new Uint16Array(10)
              , n = e[1] >>> 13;
            e[1] &= 8191;
            for (let t = 2; t < 10; t++)
                e[t] += n,
                n = e[t] >>> 13,
                e[t] &= 8191;
            e[0] += 5 * n,
            n = e[0] >>> 13,
            e[0] &= 8191,
            e[1] += n,
            n = e[1] >>> 13,
            e[1] &= 8191,
            e[2] += n,
            r[0] = e[0] + 5,
            n = r[0] >>> 13,
            r[0] &= 8191;
            for (let t = 1; t < 10; t++)
                r[t] = e[t] + n,
                n = r[t] >>> 13,
                r[t] &= 8191;
            r[9] -= 8192;
            let i = (1 ^ n) - 1;
            for (let e = 0; e < 10; e++)
                r[e] &= i;
            i = ~i;
            for (let t = 0; t < 10; t++)
                e[t] = e[t] & i | r[t];
            e[0] = (e[0] | e[1] << 13) & 65535,
            e[1] = (e[1] >>> 3 | e[2] << 10) & 65535,
            e[2] = (e[2] >>> 6 | e[3] << 7) & 65535,
            e[3] = (e[3] >>> 9 | e[4] << 4) & 65535,
            e[4] = (e[4] >>> 12 | e[5] << 1 | e[6] << 14) & 65535,
            e[5] = (e[6] >>> 2 | e[7] << 11) & 65535,
            e[6] = (e[7] >>> 5 | e[8] << 8) & 65535,
            e[7] = (e[8] >>> 8 | e[9] << 5) & 65535;
            let o = e[0] + t[0];
            e[0] = 65535 & o;
            for (let r = 1; r < 8; r++)
                o = (e[r] + t[r] | 0) + (o >>> 16) | 0,
                e[r] = 65535 & o
        }
        update(e) {
            rw.exists(this);
            let {buffer: t, blockLen: r} = this
              , n = (e = rp(e)).length;
            for (let i = 0; i < n; ) {
                let o = Math.min(r - this.pos, n - i);
                if (o === r) {
                    for (; r <= n - i; i += r)
                        this.process(e, i);
                    continue
                }
                t.set(e.subarray(i, i + o), this.pos),
                this.pos += o,
                i += o,
                this.pos === r && (this.process(t, 0, !1),
                this.pos = 0)
            }
            return this
        }
        destroy() {
            this.h.fill(0),
            this.r.fill(0),
            this.buffer.fill(0),
            this.pad.fill(0)
        }
        digestInto(e) {
            rw.exists(this),
            rw.output(e, this),
            this.finished = !0;
            let {buffer: t, h: r} = this
              , {pos: n} = this;
            if (n) {
                for (t[n++] = 1; n < 16; n++)
                    t[n] = 0;
                this.process(t, 0, !0)
            }
            this.finalize();
            let i = 0;
            for (let t = 0; t < 8; t++)
                e[i++] = r[t] >>> 0,
                e[i++] = r[t] >>> 8;
            return e
        }
        digest() {
            let {buffer: e, outputLen: t} = this;
            this.digestInto(e);
            let r = e.slice(0, t);
            return this.destroy(),
            r
        }
    }
    !function(e) {
        let t = (t,r)=>e(r).update(rp(t)).digest()
          , r = e(new Uint8Array(32));
        t.outputLen = r.outputLen,
        t.blockLen = r.blockLen,
        t.create = t=>e(t)
    }(e=>new rE(e));
    let rx = rd("expand 16-byte k")
      , rk = rd("expand 32-byte k")
      , rA = rf(rx)
      , rB = rf(rk)
      , rI = e=>!(e.byteOffset % 4)
      , rU = (e,t)=>e << t | e >>> 32 - t
      , rS = (e=>{
        let {core: t, rounds: r, counterRight: n, counterLen: i, allow128bitKeys: o, extendNonceFn: a, blockLen: s} = function(e, t) {
            if (void 0 !== t && ("object" != typeof t || !rg(t)))
                throw Error("options must be object or undefined");
            return Object.assign(e, t)
        }({
            rounds: 20,
            counterRight: !1,
            counterLen: 8,
            allow128bitKeys: !0,
            blockLen: 64
        }, e);
        rw.number(i),
        rw.number(r),
        rw.number(s),
        rw.bool(n),
        rw.bool(o);
        let l = s / 4;
        if (s % 4 != 0)
            throw Error("Salsa/ChaCha: blockLen must be aligned to 4 bytes");
        return (e,u,c,h,f=0)=>{
            let d, p;
            if (rw.bytes(e),
            rw.bytes(u),
            rw.bytes(c),
            h || (h = new Uint8Array(c.length)),
            rw.bytes(h),
            rw.number(f),
            f < 0 || f >= 4294967296 - 1)
                throw Error("Salsa/ChaCha: counter overflow");
            if (h.length < c.length)
                throw Error(`Salsa/ChaCha: output (${h.length}) is shorter than data (${c.length})`);
            let g = [];
            if (32 === e.length)
                d = e,
                p = rB;
            else if (16 === e.length && o)
                (d = new Uint8Array(32)).set(e),
                d.set(e, 16),
                p = rA,
                g.push(d);
            else
                throw Error(`Salsa/ChaCha: invalid 32-byte key, got length=${e.length}`);
            if (a) {
                if (u.length <= 16)
                    throw Error("Salsa/ChaCha: extended nonce must be bigger than 16 bytes");
                d = a(p, d, u.subarray(0, 16), new Uint8Array(32)),
                g.push(d),
                u = u.subarray(16)
            }
            let y = 16 - i;
            if (u.length !== y)
                throw Error(`Salsa/ChaCha: nonce must be ${y} or 16 bytes`);
            if (12 !== y) {
                let e = new Uint8Array(12);
                e.set(u, n ? 0 : 12 - u.length),
                g.push(u = e)
            }
            let b = new Uint8Array(s)
              , m = rf(b)
              , w = rf(d)
              , v = rf(u)
              , E = rI(c) && rf(c)
              , x = rI(h) && rf(h);
            g.push(m);
            let k = c.length;
            for (let e = 0, n = f; e < k; n++) {
                if (t(p, w, v, m, n, r),
                n >= 4294967296 - 1)
                    throw Error("Salsa/ChaCha: counter overflow");
                let i = Math.min(s, k - e);
                if (i === s && x && E) {
                    let t = e / 4;
                    if (e % 4 != 0)
                        throw Error("Salsa/ChaCha: invalid block position");
                    for (let e = 0; e < l; e++)
                        x[t + e] = E[t + e] ^ m[e];
                    e += s;
                    continue
                }
                for (let t = 0; t < i; t++)
                    h[e + t] = c[e + t] ^ b[t];
                e += i
            }
            for (let e = 0; e < g.length; e++)
                g[e].fill(0);
            return h
        }
    }
    )({
        core: function(e, t, r, n, i, o=20) {
            let a = e[0]
              , s = e[1]
              , l = e[2]
              , u = e[3]
              , c = t[0]
              , h = t[1]
              , f = t[2]
              , d = t[3]
              , p = t[4]
              , g = t[5]
              , y = t[6]
              , b = t[7]
              , m = r[0]
              , w = r[1]
              , v = r[2]
              , E = a
              , x = s
              , k = l
              , A = u
              , B = c
              , I = h
              , U = f
              , S = d
              , L = p
              , _ = g
              , $ = y
              , H = b
              , C = i
              , R = m
              , N = w
              , O = v;
            for (let e = 0; e < o; e += 2)
                L = L + (C = rU(C ^ (E = E + B | 0), 16)) | 0,
                E = E + (B = rU(B ^ L, 12)) | 0,
                L = L + (C = rU(C ^ E, 8)) | 0,
                B = rU(B ^ L, 7),
                _ = _ + (R = rU(R ^ (x = x + I | 0), 16)) | 0,
                x = x + (I = rU(I ^ _, 12)) | 0,
                _ = _ + (R = rU(R ^ x, 8)) | 0,
                I = rU(I ^ _, 7),
                $ = $ + (N = rU(N ^ (k = k + U | 0), 16)) | 0,
                k = k + (U = rU(U ^ $, 12)) | 0,
                $ = $ + (N = rU(N ^ k, 8)) | 0,
                U = rU(U ^ $, 7),
                H = H + (O = rU(O ^ (A = A + S | 0), 16)) | 0,
                A = A + (S = rU(S ^ H, 12)) | 0,
                H = H + (O = rU(O ^ A, 8)) | 0,
                S = rU(S ^ H, 7),
                $ = $ + (O = rU(O ^ (E = E + I | 0), 16)) | 0,
                E = E + (I = rU(I ^ $, 12)) | 0,
                $ = $ + (O = rU(O ^ E, 8)) | 0,
                I = rU(I ^ $, 7),
                H = H + (C = rU(C ^ (x = x + U | 0), 16)) | 0,
                x = x + (U = rU(U ^ H, 12)) | 0,
                H = H + (C = rU(C ^ x, 8)) | 0,
                U = rU(U ^ H, 7),
                L = L + (R = rU(R ^ (k = k + S | 0), 16)) | 0,
                k = k + (S = rU(S ^ L, 12)) | 0,
                L = L + (R = rU(R ^ k, 8)) | 0,
                S = rU(S ^ L, 7),
                _ = _ + (N = rU(N ^ (A = A + B | 0), 16)) | 0,
                A = A + (B = rU(B ^ _, 12)) | 0,
                _ = _ + (N = rU(N ^ A, 8)) | 0,
                B = rU(B ^ _, 7);
            let K = 0;
            n[K++] = a + E | 0,
            n[K++] = s + x | 0,
            n[K++] = l + k | 0,
            n[K++] = u + A | 0,
            n[K++] = c + B | 0,
            n[K++] = h + I | 0,
            n[K++] = f + U | 0,
            n[K++] = d + S | 0,
            n[K++] = p + L | 0,
            n[K++] = g + _ | 0,
            n[K++] = y + $ | 0,
            n[K++] = b + H | 0,
            n[K++] = i + C | 0,
            n[K++] = m + R | 0,
            n[K++] = w + N | 0,
            n[K++] = v + O | 0
        },
        counterRight: !1,
        counterLen: 4,
        allow128bitKeys: !1
    })
      , rL = new Uint8Array(16)
      , r_ = new Uint8Array([0])
      , r$ = new Uint8Array
      , rH = (e,t,r,n,i)=>{
        var o;
        return function(e, t, r, n=32) {
            if (c.hash(e),
            c.number(n),
            n > 255 * e.outputLen)
                throw Error("Length should be <= 255*HashLen");
            let i = Math.ceil(n / e.outputLen);
            void 0 === r && (r = r$);
            let o = new Uint8Array(i * e.outputLen)
              , a = ew.create(e, t)
              , s = a._cloneInto()
              , l = new Uint8Array(a.outputLen);
            for (let t = 0; t < i; t++)
                r_[0] = t + 1,
                s.update(0 === t ? r$ : l).update(r).update(r_).digestInto(l),
                o.set(l, e.outputLen * t),
                a._cloneInto(s);
            return a.destroy(),
            s.destroy(),
            l.fill(0),
            r_.fill(0),
            o.slice(0, n)
        }(e, (o = r,
        c.hash(e),
        void 0 === o && (o = new Uint8Array(e.outputLen)),
        ew(e, m(o), m(t))), n, i)
    }
    ;
    var rC = Object.defineProperty
      , rR = (e,t)=>{
        for (var r in t)
            rC(e, r, {
                get: t[r],
                enumerable: !0
            })
    }
    ;
    function rN(e) {
        return y(eD.getPublicKey(e))
    }
    rR({}, {
        MessageNode: ()=>rT,
        MessageQueue: ()=>rP,
        insertEventIntoAscendingList: ()=>rj,
        insertEventIntoDescendingList: ()=>rz,
        normalizeURL: ()=>rq,
        utf8Decoder: ()=>rO,
        utf8Encoder: ()=>rK
    });
    var rO = new TextDecoder("utf-8")
      , rK = new TextEncoder;
    function rq(e) {
        let t = new URL(e);
        return t.pathname = t.pathname.replace(/\/+/g, "/"),
        t.pathname.endsWith("/") && (t.pathname = t.pathname.slice(0, -1)),
        ("80" === t.port && "ws:" === t.protocol || "443" === t.port && "wss:" === t.protocol) && (t.port = ""),
        t.searchParams.sort(),
        t.hash = "",
        t.toString()
    }
    function rz(e, t) {
        let r, n = 0, i = e.length - 1, o = n;
        if (i < 0)
            o = 0;
        else if (t.created_at < e[i].created_at)
            o = i + 1;
        else if (t.created_at >= e[n].created_at)
            o = n;
        else
            for (; ; ) {
                if (i <= n + 1) {
                    o = i;
                    break
                }
                if (e[r = Math.floor(n + (i - n) / 2)].created_at > t.created_at)
                    n = r;
                else if (e[r].created_at < t.created_at)
                    i = r;
                else {
                    o = r;
                    break
                }
            }
        return e[o]?.id !== t.id ? [...e.slice(0, o), t, ...e.slice(o)] : e
    }
    function rj(e, t) {
        let r, n = 0, i = e.length - 1, o = n;
        if (i < 0)
            o = 0;
        else if (t.created_at > e[i].created_at)
            o = i + 1;
        else if (t.created_at <= e[n].created_at)
            o = n;
        else
            for (; ; ) {
                if (i <= n + 1) {
                    o = i;
                    break
                }
                if (e[r = Math.floor(n + (i - n) / 2)].created_at < t.created_at)
                    n = r;
                else if (e[r].created_at > t.created_at)
                    i = r;
                else {
                    o = r;
                    break
                }
            }
        return e[o]?.id !== t.id ? [...e.slice(0, o), t, ...e.slice(o)] : e
    }
    var rT = class {
        _value;
        _next;
        get value() {
            return this._value
        }
        set value(e) {
            this._value = e
        }
        get next() {
            return this._next
        }
        set next(e) {
            this._next = e
        }
        constructor(e) {
            this._value = e,
            this._next = null
        }
    }
      , rP = class {
        _first;
        _last;
        get first() {
            return this._first
        }
        set first(e) {
            this._first = e
        }
        get last() {
            return this._last
        }
        set last(e) {
            this._last = e
        }
        _size;
        get size() {
            return this._size
        }
        set size(e) {
            this._size = e
        }
        constructor() {
            this._first = null,
            this._last = null,
            this._size = 0
        }
        enqueue(e) {
            let t = new rT(e);
            return 0 !== this._size && this._last ? this._last.next = t : this._first = t,
            this._last = t,
            this._size++,
            !0
        }
        dequeue() {
            if (0 === this._size || !this._first)
                return null;
            let e = this._first;
            return this._first = e.next,
            e.next = null,
            this._size--,
            e.value
        }
    }
      , rD = Symbol("verified")
      , rM = ((n = rM || {})[n.Metadata = 0] = "Metadata",
    n[n.Text = 1] = "Text",
    n[n.RecommendRelay = 2] = "RecommendRelay",
    n[n.Contacts = 3] = "Contacts",
    n[n.EncryptedDirectMessage = 4] = "EncryptedDirectMessage",
    n[n.EventDeletion = 5] = "EventDeletion",
    n[n.Repost = 6] = "Repost",
    n[n.Reaction = 7] = "Reaction",
    n[n.BadgeAward = 8] = "BadgeAward",
    n[n.ChannelCreation = 40] = "ChannelCreation",
    n[n.ChannelMetadata = 41] = "ChannelMetadata",
    n[n.ChannelMessage = 42] = "ChannelMessage",
    n[n.ChannelHideMessage = 43] = "ChannelHideMessage",
    n[n.ChannelMuteUser = 44] = "ChannelMuteUser",
    n[n.Blank = 255] = "Blank",
    n[n.Report = 1984] = "Report",
    n[n.ZapRequest = 9734] = "ZapRequest",
    n[n.Zap = 9735] = "Zap",
    n[n.RelayList = 10002] = "RelayList",
    n[n.ClientAuth = 22242] = "ClientAuth",
    n[n.NwcRequest = 23194] = "NwcRequest",
    n[n.HttpAuth = 27235] = "HttpAuth",
    n[n.ProfileBadge = 30008] = "ProfileBadge",
    n[n.BadgeDefinition = 30009] = "BadgeDefinition",
    n[n.Article = 30023] = "Article",
    n[n.FileMetadata = 1063] = "FileMetadata",
    n);
    function rF(e, t) {
        return e.pubkey = rN(t),
        e.id = rV(e),
        e.sig = y(eD.sign(rV(e), t)),
        e[rD] = !0,
        e
    }
    function rV(e) {
        return y($(rK.encode(function(e) {
            if (!rG(e))
                throw Error("can't serialize event with wrong or missing properties");
            return JSON.stringify([0, e.pubkey, e.created_at, e.kind, e.tags, e.content])
        }(e))))
    }
    var rZ = e=>e instanceof Object;
    function rG(e) {
        if (!rZ(e) || "number" != typeof e.kind || "string" != typeof e.content || "number" != typeof e.created_at || "string" != typeof e.pubkey || !e.pubkey.match(/^[a-f0-9]{64}$/) || !Array.isArray(e.tags))
            return !1;
        for (let t = 0; t < e.tags.length; t++) {
            let r = e.tags[t];
            if (!Array.isArray(r))
                return !1;
            for (let e = 0; e < r.length; e++)
                if ("object" == typeof r[e])
                    return !1
        }
        return !0
    }
    function rW(e) {
        if ("boolean" == typeof e[rD])
            return e[rD];
        let t = rV(e);
        if (t !== e.id)
            return e[rD] = !1;
        try {
            return e[rD] = eD.verify(e.sig, t, e.pubkey)
        } catch (t) {
            return e[rD] = !1
        }
    }
    function rJ(e, t) {
        let r = t.length + 3
          , n = e.indexOf(`"${t}":`) + r
          , i = e.slice(n).indexOf('"') + n + 1;
        return e.slice(i, i + 64)
    }
    function rY(e, t) {
        let r = t.length
          , n = e.indexOf(`"${t}":`) + r + 3
          , i = e.slice(n)
          , o = Math.min(i.indexOf(","), i.indexOf("}"));
        return parseInt(i.slice(0, o), 10)
    }
    function rQ(e) {
        let t = e.slice(0, 22).indexOf('"EVENT"');
        if (-1 === t)
            return null;
        let r = e.slice(t + 7 + 1).indexOf('"');
        if (-1 === r)
            return null;
        let n = t + 7 + 1 + r
          , i = e.slice(n + 1, 80).indexOf('"');
        return -1 === i ? null : e.slice(n + 1, n + 1 + i)
    }
    function rX(e, t) {
        return t === rJ(e, "id")
    }
    function r0(e, t) {
        return t === rJ(e, "pubkey")
    }
    function r1(e, t) {
        return t === rY(e, "kind")
    }
    rR({}, {
        getHex64: ()=>rJ,
        getInt: ()=>rY,
        getSubscriptionId: ()=>rQ,
        matchEventId: ()=>rX,
        matchEventKind: ()=>r1,
        matchEventPubkey: ()=>r0
    }),
    rR({}, {
        BECH32_REGEX: ()=>r2,
        decode: ()=>r3,
        naddrEncode: ()=>nt,
        neventEncode: ()=>ne,
        noteEncode: ()=>r6,
        nprofileEncode: ()=>r7,
        npubEncode: ()=>r5,
        nrelayEncode: ()=>nr,
        nsecEncode: ()=>r4
    });
    var r2 = /[\x21-\x7E]{1,83}1[023456789acdefghjklmnpqrstuvwxyz]{6,}/;
    function r3(e) {
        let {prefix: t, words: r} = tn.decode(e, 5e3)
          , n = new Uint8Array(tn.fromWords(r));
        switch (t) {
        case "nprofile":
            {
                let e = r8(n);
                if (!e[0]?.[0])
                    throw Error("missing TLV 0 for nprofile");
                if (32 !== e[0][0].length)
                    throw Error("TLV 0 should be 32 bytes");
                return {
                    type: "nprofile",
                    data: {
                        pubkey: y(e[0][0]),
                        relays: e[1] ? e[1].map(e=>rO.decode(e)) : []
                    }
                }
            }
        case "nevent":
            {
                let e = r8(n);
                if (!e[0]?.[0])
                    throw Error("missing TLV 0 for nevent");
                if (32 !== e[0][0].length)
                    throw Error("TLV 0 should be 32 bytes");
                if (e[2] && 32 !== e[2][0].length)
                    throw Error("TLV 2 should be 32 bytes");
                if (e[3] && 4 !== e[3][0].length)
                    throw Error("TLV 3 should be 4 bytes");
                return {
                    type: "nevent",
                    data: {
                        id: y(e[0][0]),
                        relays: e[1] ? e[1].map(e=>rO.decode(e)) : [],
                        author: e[2]?.[0] ? y(e[2][0]) : void 0,
                        kind: e[3]?.[0] ? parseInt(y(e[3][0]), 16) : void 0
                    }
                }
            }
        case "naddr":
            {
                let e = r8(n);
                if (!e[0]?.[0])
                    throw Error("missing TLV 0 for naddr");
                if (!e[2]?.[0])
                    throw Error("missing TLV 2 for naddr");
                if (32 !== e[2][0].length)
                    throw Error("TLV 2 should be 32 bytes");
                if (!e[3]?.[0])
                    throw Error("missing TLV 3 for naddr");
                if (4 !== e[3][0].length)
                    throw Error("TLV 3 should be 4 bytes");
                return {
                    type: "naddr",
                    data: {
                        identifier: rO.decode(e[0][0]),
                        pubkey: y(e[2][0]),
                        kind: parseInt(y(e[3][0]), 16),
                        relays: e[1] ? e[1].map(e=>rO.decode(e)) : []
                    }
                }
            }
        case "nrelay":
            {
                let e = r8(n);
                if (!e[0]?.[0])
                    throw Error("missing TLV 0 for nrelay");
                return {
                    type: "nrelay",
                    data: rO.decode(e[0][0])
                }
            }
        case "nsec":
        case "npub":
        case "note":
            return {
                type: t,
                data: y(n)
            };
        default:
            throw Error(`unknown prefix ${t}`)
        }
    }
    function r8(e) {
        let t = {}
          , r = e;
        for (; r.length > 0; ) {
            let e = r[0]
              , n = r[1];
            if (!n)
                throw Error(`malformed TLV ${e}`);
            let i = r.slice(2, 2 + n);
            if (r = r.slice(2 + n),
            i.length < n)
                throw Error(`not enough data to read on TLV ${e}`);
            t[e] = t[e] || [],
            t[e].push(i)
        }
        return t
    }
    function r4(e) {
        return r9("nsec", b(e))
    }
    function r5(e) {
        return r9("npub", b(e))
    }
    function r6(e) {
        return r9("note", b(e))
    }
    function r9(e, t) {
        let r = tn.toWords(t);
        return tn.encode(e, r, 5e3)
    }
    function r7(e) {
        return r9("nprofile", nn({
            0: [b(e.pubkey)],
            1: (e.relays || []).map(e=>rK.encode(e))
        }))
    }
    function ne(e) {
        let t;
        return void 0 != e.kind && (t = function(e) {
            let t = new Uint8Array(4);
            return t[0] = e >> 24 & 255,
            t[1] = e >> 16 & 255,
            t[2] = e >> 8 & 255,
            t[3] = 255 & e,
            t
        }(e.kind)),
        r9("nevent", nn({
            0: [b(e.id)],
            1: (e.relays || []).map(e=>rK.encode(e)),
            2: e.author ? [b(e.author)] : [],
            3: t ? [new Uint8Array(t)] : []
        }))
    }
    function nt(e) {
        let t = new ArrayBuffer(4);
        return new DataView(t).setUint32(0, e.kind, !1),
        r9("naddr", nn({
            0: [rK.encode(e.identifier)],
            1: (e.relays || []).map(e=>rK.encode(e)),
            2: [b(e.pubkey)],
            3: [new Uint8Array(t)]
        }))
    }
    function nr(e) {
        return r9("nrelay", nn({
            0: [rK.encode(e)]
        }))
    }
    function nn(e) {
        let t = [];
        return Object.entries(e).forEach(([e,r])=>{
            r.forEach(r=>{
                let n = new Uint8Array(r.length + 2);
                n.set([parseInt(e)], 0),
                n.set([r.length], 1),
                n.set(r, 2),
                t.push(n)
            }
            )
        }
        ),
        w(...t)
    }
    async function ni(e, t, r) {
        let n = na(eU.getSharedSecret(e, "02" + t))
          , i = Uint8Array.from(x(16))
          , o = rK.encode(r)
          , a = await crypto.subtle.importKey("raw", n, {
            name: "AES-CBC"
        }, !1, ["encrypt"])
          , s = await crypto.subtle.encrypt({
            name: "AES-CBC",
            iv: i
        }, a, o)
          , l = e4.encode(new Uint8Array(s))
          , u = e4.encode(new Uint8Array(i.buffer));
        return `${l}?iv=${u}`
    }
    async function no(e, t, r) {
        let[n,i] = r.split("?iv=")
          , o = na(eU.getSharedSecret(e, "02" + t))
          , a = await crypto.subtle.importKey("raw", o, {
            name: "AES-CBC"
        }, !1, ["decrypt"])
          , s = e4.decode(n)
          , l = e4.decode(i)
          , u = await crypto.subtle.decrypt({
            name: "AES-CBC",
            iv: l
        }, a, s);
        return rO.decode(u)
    }
    function na(e) {
        return e.slice(1, 33)
    }
    rR({}, {
        decrypt: ()=>no,
        encrypt: ()=>ni
    }),
    "undefined" != typeof crypto && !crypto.subtle && crypto.webcrypto && (crypto.subtle = crypto.webcrypto.subtle),
    rR({}, {
        NIP05_REGEX: ()=>ns,
        queryProfile: ()=>nc,
        searchDomain: ()=>nu,
        useFetchImplementation: ()=>nl
    });
    var ns = /^(?:([\w.+-]+)@)?([\w.-]+)$/;
    try {
        i = fetch
    } catch {}
    function nl(e) {
        i = e
    }
    async function nu(e, t="") {
        try {
            return (await (await i(`https://${e}/.well-known/nostr.json?name=${t}`)).json()).names
        } catch (e) {
            return {}
        }
    }
    async function nc(e) {
        let t = e.match(ns);
        if (!t)
            return null;
        let[r,n="_",o] = t;
        try {
            let e = await i(`https://${o}/.well-known/nostr.json?name=${n}`)
              , {names: t, relays: r} = function(e) {
                let t = {
                    names: {}
                };
                for (let[r,n] of Object.entries(e.names))
                    "string" == typeof r && "string" == typeof n && (t.names[r] = n);
                if (e.relays)
                    for (let[r,n] of (t.relays = {},
                    Object.entries(e.relays)))
                        "string" == typeof r && Array.isArray(n) && (t.relays[r] = n.filter(e=>"string" == typeof e));
                return t
            }(await e.json())
              , a = t[n];
            return a ? {
                pubkey: a,
                relays: r?.[a]
            } : null
        } catch (e) {
            return null
        }
    }
    function nh(e, t) {
        let r = rc.fromMasterSeed(function(e, t="") {
            return function(e, t, r, n) {
                var i;
                let o;
                let {c: a, dkLen: s, DK: l, PRF: u, PRFSalt: c} = function(e, t, r, n) {
                    ts(e);
                    let {c: i, dkLen: o, asyncTick: a} = function(e, t) {
                        if (void 0 !== t && "[object Object]" !== tx.call(t))
                            throw Error("Options should be object or undefined");
                        return Object.assign(e, t)
                    }({
                        dkLen: 32,
                        asyncTick: 10
                    }, n);
                    if (to(i),
                    to(o),
                    to(a),
                    i < 1)
                        throw Error("PBKDF2: iterations (c) should be >= 1");
                    let s = tw(t)
                      , l = tw(r)
                      , u = new Uint8Array(o)
                      , c = tB.create(e, s)
                      , h = c._cloneInto().update(l);
                    return {
                        c: i,
                        dkLen: o,
                        asyncTick: a,
                        DK: u,
                        PRF: c,
                        PRFSalt: h
                    }
                }(e, t, r, n)
                  , h = new Uint8Array(4)
                  , f = td(h)
                  , d = new Uint8Array(u.outputLen);
                for (let e = 1, t = 0; t < s; e++,
                t += u.outputLen) {
                    let r = l.subarray(t, t + u.outputLen);
                    f.setInt32(0, e, !1),
                    (o = c._cloneInto(o)).update(h).digestInto(d),
                    r.set(d.subarray(0, r.length));
                    for (let e = 1; e < a; e++) {
                        u._cloneInto(o).update(d).digestInto(d);
                        for (let e = 0; e < r.length; e++)
                            r[e] ^= d[e]
                    }
                }
                return i = o,
                u.destroy(),
                c.destroy(),
                i && i.destroy(),
                d.fill(0),
                l
            }(tD, tV(e).nfkd, tJ(t), {
                c: 2048,
                dkLen: 64
            })
        }(e, t)).derive("m/44'/1237'/0'/0/0").privateKey;
        if (!r)
            throw Error("could not derive private key");
        return y(r)
    }
    function nf() {
        return function(e, t=128) {
            var r;
            if (tc.number(t),
            t % 32 != 0 || t > 256)
                throw TypeError("Invalid entropy");
            return tZ(r = function(e=32) {
                if (th && "function" == typeof th.getRandomValues)
                    return th.getRandomValues(new Uint8Array(e));
                throw Error("crypto.getRandomValues must be defined")
            }(t / 8)),
            tW(e).encode(r).join(tM(e) ? "　" : " ")
        }(ti)
    }
    function nd(e) {
        return function(e, t) {
            try {
                !function(e, t) {
                    let {words: r} = tV(e)
                      , n = tW(t).decode(r);
                    tZ(n)
                }(e, t)
            } catch (e) {
                return !1
            }
            return !0
        }(e, ti)
    }
    function np(e) {
        let t = {
            reply: void 0,
            root: void 0,
            mentions: [],
            profiles: []
        }
          , r = [];
        for (let n of e.tags)
            "e" === n[0] && n[1] && r.push(n),
            "p" === n[0] && n[1] && t.profiles.push({
                pubkey: n[1],
                relays: n[2] ? [n[2]] : []
            });
        for (let e = 0; e < r.length; e++) {
            let[n,i,o,a] = r[e]
              , s = {
                id: i,
                relays: o ? [o] : []
            }
              , l = 0 === e
              , u = e === r.length - 1;
            if ("root" === a) {
                t.root = s;
                continue
            }
            if ("reply" === a) {
                t.reply = s;
                continue
            }
            if ("mention" === a) {
                t.mentions.push(s);
                continue
            }
            if (l) {
                t.root = s;
                continue
            }
            if (u) {
                t.reply = s;
                continue
            }
            t.mentions.push(s)
        }
        return t
    }
    rR({}, {
        generateSeedWords: ()=>nf,
        privateKeyFromSeedWords: ()=>nh,
        validateWords: ()=>nd
    }),
    rR({}, {
        parse: ()=>np
    });
    var ng = {};
    function ny(e) {
        let t = 0;
        for (let r = 0; r < e.length; r++) {
            let n = parseInt(e[r], 16);
            if (0 === n)
                t += 4;
            else {
                t += Math.clz32(n) - 28;
                break
            }
        }
        return t
    }
    function nb(e, t) {
        let r = 0
          , n = ["nonce", "0", t.toString()];
        for (e.tags.push(n); ; ) {
            let i = Math.floor(new Date().getTime() / 1e3);
            if (i !== e.created_at && (r = 0,
            e.created_at = i),
            n[1] = (++r).toString(),
            e.id = rV(e),
            ny(e.id) >= t)
                break
        }
        return e
    }
    function nm(e, t, r, n) {
        return rF({
            kind: 6,
            tags: [...e.tags ?? [], ["e", t.id, r], ["p", t.pubkey]],
            content: "" === e.content ? "" : JSON.stringify(t),
            created_at: e.created_at
        }, n)
    }
    function nw(e) {
        let t, r;
        if (6 === e.kind) {
            for (let n = e.tags.length - 1; n >= 0 && (void 0 === t || void 0 === r); n--) {
                let i = e.tags[n];
                i.length >= 2 && ("e" === i[0] && void 0 === t ? t = i : "p" === i[0] && void 0 === r && (r = i))
            }
            if (void 0 !== t)
                return {
                    id: t[1],
                    relays: [t[2], r?.[2]].filter(e=>"string" == typeof e),
                    author: r?.[1]
                }
        }
    }
    function nv(e, {skipVerification: t}={}) {
        let r;
        let n = nw(e);
        if (void 0 !== n && "" !== e.content) {
            try {
                r = JSON.parse(e.content)
            } catch (e) {
                return
            }
            if (r.id === n.id && (t || rW(r)))
                return r
        }
    }
    rR(ng, {
        getPow: ()=>ny,
        minePow: ()=>nb
    }),
    rR({}, {
        finishRepostEvent: ()=>nm,
        getRepostedEvent: ()=>nv,
        getRepostedEventPointer: ()=>nw
    }),
    rR({}, {
        NOSTR_URI_REGEX: ()=>nE,
        parse: ()=>nk,
        test: ()=>nx
    });
    var nE = RegExp(`nostr:(${r2.source})`);
    function nx(e) {
        return "string" == typeof e && RegExp(`^${nE.source}$`).test(e)
    }
    function nk(e) {
        let t = e.match(RegExp(`^${nE.source}$`));
        if (!t)
            throw Error(`Invalid Nostr URI: ${e}`);
        return {
            uri: t[0],
            value: t[1],
            decoded: r3(t[1])
        }
    }
    function nA(e, t, r) {
        let n = t.tags.filter(e=>e.length >= 2 && ("e" === e[0] || "p" === e[0]));
        return rF({
            ...e,
            kind: 7,
            tags: [...e.tags ?? [], ...n, ["e", t.id], ["p", t.pubkey]],
            content: e.content ?? "+"
        }, r)
    }
    function nB(e) {
        let t, r;
        if (7 === e.kind) {
            for (let n = e.tags.length - 1; n >= 0 && (void 0 === t || void 0 === r); n--) {
                let i = e.tags[n];
                i.length >= 2 && ("e" === i[0] && void 0 === t ? t = i : "p" === i[0] && void 0 === r && (r = i))
            }
            if (void 0 !== t && void 0 !== r)
                return {
                    id: t[1],
                    relays: [t[2], r[2]].filter(e=>void 0 !== e),
                    author: r[1]
                }
        }
    }
    function nI(e, t) {
        let r = [];
        (t.kind || -1) >= 0 && r.push(`kind=${t.kind}`),
        t.until && r.push(`created_at<${t.until}`),
        t.since && r.push(`created_at>${t.since}`);
        let n = r.join("&");
        if ("" === n)
            throw Error("refusing to create a delegation without any conditions");
        let i = $(rK.encode(`nostr:delegation:${t.pubkey}:${n}`))
          , o = y(eD.sign(i, e));
        return {
            from: rN(e),
            to: t.pubkey,
            cond: n,
            sig: o
        }
    }
    function nU(e) {
        let t = e.tags.find(e=>"delegation" === e[0] && e.length >= 4);
        if (!t)
            return null;
        let r = t[1]
          , n = t[2]
          , i = t[3]
          , o = n.split("&");
        for (let t = 0; t < o.length; t++) {
            let[r,n,i] = o[t].split(/\b/);
            if ("kind" !== r || "=" !== n || e.kind !== parseInt(i)) {
                if ("created_at" === r && "<" === n && e.created_at < parseInt(i))
                    continue;
                if ("created_at" === r && ">" === n && e.created_at > parseInt(i))
                    continue;
                else
                    return null
            }
        }
        let a = $(rK.encode(`nostr:delegation:${e.pubkey}:${n}`));
        return eD.verify(i, a, r) ? r : null
    }
    rR({}, {
        finishReactionEvent: ()=>nA,
        getReactedEventPointer: ()=>nB
    }),
    rR({}, {
        createDelegation: ()=>nI,
        getDelegator: ()=>nU
    }),
    rR({}, {
        matchAll: ()=>nL,
        regex: ()=>nS,
        replaceAll: ()=>n_
    });
    var nS = ()=>RegExp(`\\b${nE.source}\\b`, "g");
    function *nL(e) {
        for (let t of e.matchAll(nS()))
            try {
                let[e,r] = t;
                yield{
                    uri: e,
                    value: r,
                    decoded: r3(r),
                    start: t.index,
                    end: t.index + e.length
                }
            } catch (e) {}
    }
    function n_(e, t) {
        return e.replaceAll(nS(), (e,r)=>t({
            uri: e,
            value: r,
            decoded: r3(r)
        }))
    }
    rR({}, {
        channelCreateEvent: ()=>n$,
        channelHideMessageEvent: ()=>nR,
        channelMessageEvent: ()=>nC,
        channelMetadataEvent: ()=>nH,
        channelMuteUserEvent: ()=>nN
    });
    var n$ = (e,t)=>{
        let r;
        if ("object" == typeof e.content)
            r = JSON.stringify(e.content);
        else {
            if ("string" != typeof e.content)
                return;
            r = e.content
        }
        return rF({
            kind: 40,
            tags: [...e.tags ?? []],
            content: r,
            created_at: e.created_at
        }, t)
    }
      , nH = (e,t)=>{
        let r;
        if ("object" == typeof e.content)
            r = JSON.stringify(e.content);
        else {
            if ("string" != typeof e.content)
                return;
            r = e.content
        }
        return rF({
            kind: 41,
            tags: [["e", e.channel_create_event_id], ...e.tags ?? []],
            content: r,
            created_at: e.created_at
        }, t)
    }
      , nC = (e,t)=>{
        let r = [["e", e.channel_create_event_id, e.relay_url, "root"]];
        return e.reply_to_channel_message_event_id && r.push(["e", e.reply_to_channel_message_event_id, e.relay_url, "reply"]),
        rF({
            kind: 42,
            tags: [...r, ...e.tags ?? []],
            content: e.content,
            created_at: e.created_at
        }, t)
    }
      , nR = (e,t)=>{
        let r;
        if ("object" == typeof e.content)
            r = JSON.stringify(e.content);
        else {
            if ("string" != typeof e.content)
                return;
            r = e.content
        }
        return rF({
            kind: 43,
            tags: [["e", e.channel_message_event_id], ...e.tags ?? []],
            content: r,
            created_at: e.created_at
        }, t)
    }
      , nN = (e,t)=>{
        let r;
        if ("object" == typeof e.content)
            r = JSON.stringify(e.content);
        else {
            if ("string" != typeof e.content)
                return;
            r = e.content
        }
        return rF({
            kind: 44,
            tags: [["p", e.pubkey_to_mute], ...e.tags ?? []],
            content: r,
            created_at: e.created_at
        }, t)
    }
    ;
    rR({}, {
        useFetchImplementation: ()=>nO,
        validateGithub: ()=>nK
    });
    try {
        o = fetch
    } catch {}
    function nO(e) {
        o = e
    }
    async function nK(e, t, r) {
        try {
            return await (await o(`https://gist.github.com/${t}/${r}/raw`)).text() === `Verifying that I control the following Nostr public key: ${e}`
        } catch (e) {
            return !1
        }
    }
    rR({}, {
        authenticate: ()=>nq
    });
    var nq = async({challenge: e, relay: t, sign: r})=>{
        let n = {
            kind: 22242,
            created_at: Math.floor(Date.now() / 1e3),
            tags: [["relay", t.url], ["challenge", e]],
            content: ""
        };
        return t.auth(await r(n))
    }
    ;
    rR({}, {
        decrypt: ()=>nT,
        encrypt: ()=>nj,
        utils: ()=>nz
    });
    var nz = {
        v2: {
            maxPlaintextSize: 65408,
            minCiphertextSize: 100,
            maxCiphertextSize: 102400,
            getConversationKey: (e,t)=>eU.getSharedSecret(e, "02" + t).subarray(1, 33),
            getMessageKeys(e, t) {
                let r = rH($, e, t, "nip44-v2", 76);
                return {
                    encryption: r.subarray(0, 32),
                    nonce: r.subarray(32, 44),
                    auth: r.subarray(44, 76)
                }
            },
            calcPadding(e) {
                if (!Number.isSafeInteger(e) || e < 0)
                    throw Error("expected positive integer");
                if (e <= 32)
                    return 32;
                let t = 1 << Math.floor(Math.log2(e - 1)) + 1
                  , r = t <= 256 ? 32 : t / 8;
                return r * (Math.floor((e - 1) / r) + 1)
            },
            pad(e) {
                let t = rK.encode(e)
                  , r = t.length;
                if (r < 1 || r >= nz.v2.maxPlaintextSize)
                    throw Error("invalid plaintext length: must be between 1b and 64KB");
                let n = nz.v2.calcPadding(r)
                  , i = new Uint8Array(n - r)
                  , o = new Uint8Array(2);
                return new DataView(o.buffer).setUint16(0, r),
                w(o, t, i)
            },
            unpad(e) {
                let t = new DataView(e.buffer).getUint16(0)
                  , r = e.subarray(2, 2 + t);
                if (0 === t || r.length !== t || e.length !== 2 + nz.v2.calcPadding(t))
                    throw Error("invalid padding");
                return rO.decode(r)
            }
        }
    };
    function nj(e, t, r={}) {
        let n = r.version ?? 2;
        if (2 !== n)
            throw Error("unknown encryption version " + n);
        let i = r.salt ?? x(32);
        ry(i, 32);
        let o = nz.v2.getMessageKeys(e, i)
          , a = nz.v2.pad(t)
          , s = rS(o.encryption, o.nonce, a)
          , l = ew($, o.auth, s);
        return e4.encode(w(new Uint8Array([n]), i, s, l))
    }
    function nT(e, t) {
        let r;
        let n = nz.v2;
        ry(e, 32);
        let i = t.length;
        if (i < n.minCiphertextSize || i >= n.maxCiphertextSize)
            throw Error("invalid ciphertext length: " + i);
        if ("#" === t[0])
            throw Error("unknown encryption version");
        try {
            r = e4.decode(t)
        } catch (e) {
            throw Error("invalid base64: " + e.message)
        }
        let o = r.subarray(0, 1)[0];
        if (2 !== o)
            throw Error("unknown encryption version " + o);
        let a = r.subarray(1, 33)
          , s = r.subarray(33, -32)
          , l = r.subarray(-32)
          , u = n.getMessageKeys(e, a);
        if (!function(e, t) {
            if (e.length !== t.length)
                throw Error("equalBytes: Different size of Uint8Arrays");
            let r = !0;
            for (let n = 0; n < e.length; n++)
                r && (r = e[n] === t[n]);
            return r
        }(ew($, u.auth, s), l))
            throw Error("invalid MAC");
        let c = rS(u.encryption, u.nonce, s);
        return n.unpad(c)
    }
    function nP(e) {
        let {pathname: t, searchParams: r} = new URL(e)
          , n = r.get("relay")
          , i = r.get("secret");
        if (!t || !n || !i)
            throw Error("invalid connection string");
        return {
            pubkey: t,
            relay: n,
            secret: i
        }
    }
    async function nD({pubkey: e, secret: t, invoice: r}) {
        let n = await ni(t, e, JSON.stringify({
            method: "pay_invoice",
            params: {
                invoice: r
            }
        }));
        return rF({
            kind: 23194,
            created_at: Math.round(Date.now() / 1e3),
            content: n,
            tags: [["p", e]]
        }, t)
    }
    rR({}, {
        makeNwcRequestEvent: ()=>nD,
        parseConnectionString: ()=>nP
    }),
    rR({}, {
        getZapEndpoint: ()=>nF,
        makeZapReceipt: ()=>nG,
        makeZapRequest: ()=>nV,
        useFetchImplementation: ()=>nM,
        validateZapRequest: ()=>nZ
    });
    try {
        a = fetch
    } catch {}
    function nM(e) {
        a = e
    }
    async function nF(e) {
        try {
            let t = ""
              , {lud06: r, lud16: n} = JSON.parse(e.content);
            if (r) {
                let {words: e} = tn.decode(r, 1e3)
                  , n = tn.fromWords(e);
                t = rO.decode(n)
            } else {
                if (!n)
                    return null;
                let[e,r] = n.split("@");
                t = `https://${r}/.well-known/lnurlp/${e}`
            }
            let i = await a(t)
              , o = await i.json();
            if (o.allowsNostr && o.nostrPubkey)
                return o.callback
        } catch (e) {}
        return null
    }
    function nV({profile: e, event: t, amount: r, relays: n, comment: i=""}) {
        if (!r)
            throw Error("amount not given");
        if (!e)
            throw Error("profile not given");
        let o = {
            kind: 9734,
            created_at: Math.round(Date.now() / 1e3),
            content: i,
            tags: [["p", e], ["amount", r.toString()], ["relays", ...n]]
        };
        return t && o.tags.push(["e", t]),
        o
    }
    function nZ(e) {
        let t;
        try {
            t = JSON.parse(e)
        } catch (e) {
            return "Invalid zap request JSON."
        }
        if (!rG(t))
            return "Zap request is not a valid Nostr event.";
        if (!rW(t))
            return "Invalid signature on zap request.";
        let r = t.tags.find(([e,t])=>"p" === e && t);
        if (!r)
            return "Zap request doesn't have a 'p' tag.";
        if (!r[1].match(/^[a-f0-9]{64}$/))
            return "Zap request 'p' tag is not valid hex.";
        let n = t.tags.find(([e,t])=>"e" === e && t);
        return n && !n[1].match(/^[a-f0-9]{64}$/) ? "Zap request 'e' tag is not valid hex." : t.tags.find(([e,t])=>"relays" === e && t) ? null : "Zap request doesn't have a 'relays' tag."
    }
    function nG({zapRequest: e, preimage: t, bolt11: r, paidAt: n}) {
        let i = JSON.parse(e).tags.filter(([e])=>"e" === e || "p" === e || "a" === e)
          , o = {
            kind: 9735,
            created_at: Math.round(n.getTime() / 1e3),
            content: "",
            tags: [...i, ["bolt11", r], ["description", e]]
        };
        return t && o.tags.push(["preimage", t]),
        o
    }
    rR({}, {
        getToken: ()=>nJ,
        unpackEventFromToken: ()=>nQ,
        validateEvent: ()=>nX,
        validateToken: ()=>nY
    });
    var nW = "Nostr ";
    async function nJ(e, t, r, n=!1) {
        if (!e || !t)
            throw Error("Missing loginUrl or httpMethod");
        let i = function(e=255) {
            return {
                kind: e,
                content: "",
                tags: [],
                created_at: 0
            }
        }(27235);
        i.tags = [["u", e], ["method", t]],
        i.created_at = Math.round(new Date().getTime() / 1e3);
        let o = await r(i);
        return (n ? nW : "") + e4.encode(rK.encode(JSON.stringify(o)))
    }
    async function nY(e, t, r) {
        let n = await nQ(e).catch(e=>{
            throw e
        }
        );
        return await nX(n, t, r).catch(e=>{
            throw e
        }
        )
    }
    async function nQ(e) {
        if (!e)
            throw Error("Missing token");
        e = e.replace(nW, "");
        let t = rO.decode(e4.decode(e));
        if (!t || 0 === t.length || !t.startsWith("{"))
            throw Error("Invalid token");
        return JSON.parse(t)
    }
    async function nX(e, t, r) {
        if (!e)
            throw Error("Invalid nostr event");
        if (!rW(e))
            throw Error("Invalid nostr event, signature invalid");
        if (27235 !== e.kind)
            throw Error("Invalid nostr event, kind invalid");
        if (!e.created_at)
            throw Error("Invalid nostr event, created_at invalid");
        if (Math.round(new Date().getTime() / 1e3) - e.created_at > 60)
            throw Error("Invalid nostr event, expired");
        let n = e.tags.find(e=>"u" === e[0]);
        if (n?.length !== 1 && n?.[1] !== t)
            throw Error("Invalid nostr event, url tag invalid");
        let i = e.tags.find(e=>"method" === e[0]);
        if (i?.length !== 1 && i?.[1].toLowerCase() !== r.toLowerCase())
            throw Error("Invalid nostr event, method tag invalid");
        return !0
    }
}

var u = {};
var t = {};

u.r = function(e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
    }),
    Object.defineProperty(e, "__esModule", {
        value: !0
    })
}
u.d = function(e, t) {
    for (var n in t)
        u.o(t, n) && !u.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        })
}
u.o = function(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
}
uu(null, t, u);

function computeEventId(ts) {
    return (0, t.s_)({
        "kind": 1,
        "created_at": ts,
        "tags": [
            [
                "p",
                "9be107b0d7218c67b4954ee3e6bd9e4dba06ef937a93f684e42f730a0c3d053c"
            ],
            [
                "e",
                "51ed7939a984edee863bfbb2e66fdc80436b000a8ddca442d83e6a2bf1636a95",
                "wss://relay.noscription.org/",
                "root"
            ],
            [
                "e",
                "000005e2de17f67a139069a94b63ad43f5c0eb25de2689bfebc3d482cc7db4ff",
                "wss://relay.noscription.org/",
                "reply"
            ],
            [
                "seq_witness",
                "166316035",
                "0xc72e83cc58be17e6b84c611b6ae955b3c6df1429e04009cd1a00d1277463ed79"
            ],
            [
                "nonce",
                "kmql6pjz8dm",
                "21"
            ]
        ],
        "content": "{\"p\":\"nrc-20\",\"op\":\"mint\",\"tick\":\"noss\",\"amt\":\"10\"}",
        "pubkey": "966491d34a8efb8a4a389102c40922059d7d56bd2ea99980b5b1982626caca9f"
    });
}


// var ts = Math.floor(new Date().getTime() / 1e3);
// for (let i = 0; i < 1000000; i++) {
//     const newTs = ts + i;
//     const eventId = computeEventId(newTs);
//     if (t.GB.getPow(eventId) > 21) {
//         console.log(newTs, eventId);
//     }
// }

// while (true) {
//     const ts = Math.floor(new Date().getTime() / 1e3);
//     const eventId = computeEventId(ts);
//     if (t.GB.getPow(eventId) > 21) {
//         console.log(newTs, eventId);
//     }
// }

console.log(computeEventId(170419954512), t.GB.getPow(computeEventId(1704199545)));