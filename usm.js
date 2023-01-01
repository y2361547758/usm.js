var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var CRID = /** @class */ (function () {
    function CRID(key1, key2) {
        if (key1 === void 0) { key1 = null; }
        if (key2 === void 0) { key2 = 0; }
        this.video = new Uint8Array();
        this.audio = new Uint8Array();
        this.strings = [];
        this.constString = new Set(["", "<NULL>", "fmtver", "filename", "filesize", "datasize", "stmid", "chno", "minchk", "minbuf", "avbps", "CRIUSF_DIR_STREAM"]);
        this._vm1 = new Uint8Array(0x20);
        this._vm2 = new Uint8Array(0x20);
        this._am = new Uint8Array(0x20);
        if (key1 === null) {
            key1 = this.parseKey(0x43484A86);
            key2 = this.parseKey(0x00000001);
        }
        else if (typeof key1 === 'number') {
            key1 = this.parseKey(key1);
            key2 = this.parseKey(key2 ? key2 : key1 >> 32);
        }
        else if (typeof key1 === 'string') {
            key1 = parseInt(key1) || parseInt("0x" + key1);
            ;
            key1 = this.parseKey(key1);
            key2 = this.parseKey(key2 ? key2 : key1 >> 32);
        }
        else {
            key1 = this.parseKey(key1);
            key2 = this.parseKey(key2);
        }
        this.initMask(key1, key2);
    }
    CRID.prototype.parseKey = function (key) {
        var buff = new Uint8Array(4);
        try {
            switch (typeof key) {
                case "string":
                    key = parseInt(key) || parseInt("0x" + key);
                case 'number':
                    buff[0] = key & 0xff;
                    buff[1] = key >> 8 & 0xff;
                    buff[2] = key >> 16 & 0xff;
                    buff[3] = key >> 24 & 0xff;
                    break;
                case 'object':
                    if (key instanceof Uint8Array)
                        return key;
            }
        }
        catch (_a) {
            // key parse error
        }
        finally {
            return buff;
        }
    };
    CRID.prototype.initMask = function (key1, key2) {
        this._vm1[0x00] = key1[0];
        this._vm1[0x01] = key1[1];
        this._vm1[0x02] = key1[2];
        this._vm1[0x03] = key1[3] - 0x34;
        this._vm1[0x04] = key2[0] + 0xF9;
        this._vm1[0x05] = key2[1] ^ 0x13;
        this._vm1[0x06] = key2[2] + 0x61;
        this._vm1[0x07] = this._vm1[0x00] ^ 0xFF;
        this._vm1[0x08] = this._vm1[0x02] + this._vm1[0x01];
        this._vm1[0x09] = this._vm1[0x01] - this._vm1[0x07];
        this._vm1[0x0A] = this._vm1[0x02] ^ 0xFF;
        this._vm1[0x0B] = this._vm1[0x01] ^ 0xFF;
        this._vm1[0x0C] = this._vm1[0x0B] + this._vm1[0x09];
        this._vm1[0x0D] = this._vm1[0x08] - this._vm1[0x03];
        this._vm1[0x0E] = this._vm1[0x0D] ^ 0xFF;
        this._vm1[0x0F] = this._vm1[0x0A] - this._vm1[0x0B];
        this._vm1[0x10] = this._vm1[0x08] - this._vm1[0x0F];
        this._vm1[0x11] = this._vm1[0x10] ^ this._vm1[0x07];
        this._vm1[0x12] = this._vm1[0x0F] ^ 0xFF;
        this._vm1[0x13] = this._vm1[0x03] ^ 0x10;
        this._vm1[0x14] = this._vm1[0x04] - 0x32;
        this._vm1[0x15] = this._vm1[0x05] + 0xED;
        this._vm1[0x16] = this._vm1[0x06] ^ 0xF3;
        this._vm1[0x17] = this._vm1[0x13] - this._vm1[0x0F];
        this._vm1[0x18] = this._vm1[0x15] + this._vm1[0x07];
        this._vm1[0x19] = 0x21 - this._vm1[0x13];
        this._vm1[0x1A] = this._vm1[0x14] ^ this._vm1[0x17];
        this._vm1[0x1B] = this._vm1[0x16] + this._vm1[0x16];
        this._vm1[0x1C] = this._vm1[0x17] + 0x44;
        this._vm1[0x1D] = this._vm1[0x03] + this._vm1[0x04];
        this._vm1[0x1E] = this._vm1[0x05] - this._vm1[0x16];
        this._vm1[0x1F] = this._vm1[0x1D] ^ this._vm1[0x13];
        var t2 = 'URUC';
        for (var i = 0; i < 0x20; i++) {
            this._vm2[i] = this._vm1[i] ^ 0xFF;
            this._am[i] = (i & 1) ? t2[(i >> 1) & 3].charCodeAt(0) : this._vm2[i];
        }
    };
    CRID.prototype.parseString = function (data, len) {
        var fp = new DataView(data, 0, len);
        var sign = fp.getUint32(0, true);
        var size = fp.getUint32(4);
        var valueOffset = fp.getUint32(8);
        var stringOffset = fp.getUint32(12);
        var dataOffset = fp.getUint32(16);
        var nameOffset = fp.getUint32(20);
        var elementCount = fp.getUint16(24);
        var valueSize = fp.getUint16(26);
        var valueCount = fp.getUint32(28);
        var _sl = dataOffset - stringOffset;
        var p = new Uint8Array(data, 8 + stringOffset, _sl);
        var jisdecoder = new TextDecoder('shift-jis');
        var i = 0;
        var j = 0;
        while (i < _sl) {
            while (p[i])
                ++i;
            var s = jisdecoder.decode(p.slice(j, i));
            j = ++i;
            if (this.constString.has(s))
                continue;
            this.strings.push(s);
        }
    };
    CRID.prototype.parseTrunk = function (data, async) {
        if (async === void 0) { async = false; }
        var ftell = 0;
        var v_trunks = [];
        var a_trunks = [];
        var v_trunks_a = [];
        var a_trunks_a = [];
        var v_size = 0;
        var a_size = 0;
        this.strings = [];
        while (ftell < data.byteLength) {
            var fp = new DataView(data, ftell, 32);
            var magic = fp.getUint32(0, true);
            var len = fp.getUint32(4);
            var off = fp.getUint16(8);
            var pad = fp.getUint16(10);
            var type = fp.getUint32(12);
            var frameTime = fp.getUint32(16);
            var frameRate = fp.getUint32(20);
            var p = void 0;
            switch (magic) {
                case 0x44495243: // CRID
                    this.parseString(data.slice(ftell + off + 8), len - off - pad);
                    break;
                case 0x56465340: // @SFV
                    if (type)
                        break;
                    p = new Uint8Array(data, ftell + off + 8, len - off - pad);
                    v_size += p.byteLength;
                    if (async)
                        v_trunks_a.push(this.maskVideoAsync(p));
                    else
                        v_trunks.push(this.maskVideo(p));
                    break;
                case 0x41465340: // @SFA
                    if (type)
                        break;
                    p = new Uint8Array(data, ftell + off + 8, len - off - pad);
                    a_size += p.byteLength;
                    if (async)
                        a_trunks_a.push(this.maskAudioAsync(p));
                    else
                        a_trunks.push(this.maskAudio(p));
                    break;
                default: // @CUE ...
            }
            ftell += len + 8;
        }
        return { v_trunks: v_trunks, v_trunks_a: v_trunks_a, v_size: v_size, a_trunks: a_trunks, a_trunks_a: a_trunks_a, a_size: a_size };
    };
    CRID.prototype.demuxAsync = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = this.parseTrunk(data, true);
                        this.video = new Uint8Array(result.v_size);
                        this.audio = new Uint8Array(result.a_size);
                        return [4 /*yield*/, Promise.all([
                                this.concatAsync(result.v_trunks_a, this.video),
                                this.concatAsync(result.a_trunks_a, this.audio)
                            ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                video: this.video,
                                audio: this.audio
                            }];
                }
            });
        });
    };
    CRID.prototype.demux = function (data) {
        var result = this.parseTrunk(data);
        this.video = new Uint8Array(result.v_size);
        this.audio = new Uint8Array(result.a_size);
        this.concat(result.v_trunks, this.video);
        this.concat(result.a_trunks, this.audio);
        return {
            video: this.video,
            audio: this.audio
        };
    };
    CRID.prototype.maskVideo = function (p) {
        if (p.byteLength >= 0x240) {
            var mask = new Uint8Array(this._vm2);
            for (var j = 0x140; j < p.byteLength; j++)
                mask[j & 0x1f] = (p[j] ^= mask[j & 0x1f]) ^ this._vm2[j & 0x1f];
            mask = new Uint8Array(this._vm1);
            for (var j = 0x40; j < 0x140; j++)
                p[j] ^= mask[j & 0x1f] ^= p[j + 0x100];
        }
        return p;
    };
    CRID.prototype.maskVideoAsync = function (p) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.maskVideo(p)];
        }); });
    };
    CRID.prototype.maskAudio = function (p) {
        for (var j = 0x140; j < p.byteLength; j++)
            p[j] ^= this._am[j & 0x1f];
        return p;
    };
    CRID.prototype.maskAudioAsync = function (p) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.maskAudio(p)];
        }); });
    };
    CRID.prototype.concatAsync = function (trunks, dist) {
        return __awaiter(this, void 0, void 0, function () {
            var offset, _i, trunks_1, i, buff;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        offset = 0;
                        _i = 0, trunks_1 = trunks;
                        _a.label = 1;
                    case 1:
                        if (!(_i < trunks_1.length)) return [3 /*break*/, 4];
                        i = trunks_1[_i];
                        return [4 /*yield*/, i];
                    case 2:
                        buff = _a.sent();
                        dist.set(buff, offset);
                        offset += buff.byteLength;
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, dist];
                }
            });
        });
    };
    CRID.prototype.concat = function (trunks, dist) {
        var offset = 0;
        for (var _i = 0, trunks_2 = trunks; _i < trunks_2.length; _i++) {
            var i = trunks_2[_i];
            var buff = i;
            dist.set(buff, offset);
            offset += buff.byteLength;
        }
        return dist;
    };
    return CRID;
}());
