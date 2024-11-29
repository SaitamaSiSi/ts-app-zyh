
/*
  自定义方法
*/
// int len, int radix
export function MakeUuid(len, radix) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('')
    var uuid = []
    var i
    radix = radix || chars.length

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
    } else {
        // rfc4122, version 4 form
        var r

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | (Math.random() * 16)
                uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
            }
        }
    }

    return uuid.join('')
}

// string plate
export function CheckPlate(plate) {
    var express1 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    var express2 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[D,F]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    var express3 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[应急]{1}$/;
    var flag = false
    if (plate === null || plate === '') {
        return false
    }
    if (plate.length === 7 && express1.test(plate)) {
        flag = true
    }
    if (plate.length === 8 && (!express2.test(plate) || !express3.test(plate))) {
        flag = true
    }
    return flag
}

// Decimal num, byte max
export function NumberToIntList(num, max) {
    var Num = num
    var res = []
    for (var i = 0; i < max; i++) {
        if ((Num & (1 << i)) != 0) {
            res.push(idx)
        }
    }
    return res
}

// Decimal num, byte max, int addnum
export function NumberToList(num, max, addnum) {
    var res = NumberToIntList(num, max)
    return res.map((t) => t + addnum)
}

const FatalErrorList = [1, 2, 4, 12, 13, 14, 15, 16, 17, 18,
    19, 23, 24, 102]

// byte fault, int detail, byte ctrlmode
export function FaultIsFatal(fault, detail, ctrlmode) {
    if (FatalErrorList.indexOf(fault) === -1 && fault !== 0) {
        return false
    }

    if (fault === 15 && (parseInt(((detail >>> 24) & 0xFF).toString(16))) !== 0) {
        return false
    }

    // 未知控制模式 0, 严重故障模式 8
    if (fault === 23 && ctrlmode !== 8) {
        return false
    }

    return true
}

// int s1, int e1, int s2, int e2, bool ignorecritical = false
export function IsRangeSuperposition(s1, e1, s2, e2, ignorecritical = false) {
    var s12 = s1
    var e12 = e1
    if (s1 > e1) {
        s12 = e1
        e12 = s1
    }
    var s22 = s2
    var e22 = e2
    if (s2 > e2) {
        s22 = e2
        e22 = s2
    }
    if (ignorecritical) {
        if (e12 <= s22) {
            return false
        }
        if (s12 >= e22) {
            return false
        }
    } else {
        if (e12 < s22) {
            return false
        }
        if (s12 > e22) {
            return false
        }
    }
    return true
}

// DayOfWeek(枚举) 0 日 1 一 ... 6 六
export function DayOfWeek2String(dayOfWeek) {
    switch (dayOfWeek) {
        case 0:
            return '日'
        case 1:
            return '一'
        case 2:
            return '二'
        case 3:
            return '三'
        case 4:
            return '四'
        case 5:
            return '五'
        case 6:
            return '六'
    }
    return ''
}

// List<PhasicBase> infos, string ids
export function VerifyConflictPhasic(infos, ids) {
    if (ids === null || ids === '') {
        return ''
    }
    var strs = ids.split(',')
    var its = []
    strs.forEach(r => {
        its.push(parseInt(r))
    });

    for (var i = 0; i < its.length; i++) {
        var r = its[i]
        var pb1 = infos.find(t => t.PhasicId === r)
        if (pb1 === null) {
            continue
        }
        for (var j = 0; j < its.length; j++) {
            var r2 = its[j]
            if (r === r2) {
                continue
            }
            if ((pb1.ConflictPhasic & (1 << (r2 - 1))) !== 0) {
                return `相位[${r}]与相位[${r2}]冲突`
            }
        }
    }
    return null
}

// byte[] data, int len
export function HexDataStr(data, len) {
    for (var hex = [], i = 0; i < data.length; i++) {
        hex.push((data[i] >>> 0).toString(16).padStart(2, '0'))
    }
    return hex.join(' ')
}

// double d
export function rad(d) {
    return d * Math.PI / 180.0
}

// 地球长半轴
const EarchLRadius = 6378245.0;
// 地球偏心率（平方）
const EarchEccentricity = 0.00669342162296594323;
const GPI = 3.14159265358979324 * 3000.0 / 180.0;

// double x, double y, out double merX, out double merY
export function GeoToMer(x, y) {
    var out = {
        flag: true,
        merX: x,
        merY: y
    }
    out.merX = x * 20037508.34 / 180;
    out.merY = Math.Log(Math.Tan((90 + y) * Math.PI / 360)) / (Math.PI / 180);
    out.merY = out.merY * 20037508.34 / 180;
    return out;
}

// 经纬度是否在国内
// double x, double y
export function OutOfChina(x, y) {
    return !(x > 73.66 && x < 135.05 && y > 3.86 && y < 53.55);
}

// double x, double y
export function GCJTransformLat(x, y) {
    // double
    var ret = 0;
    ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.Sqrt(Math.Abs(x));
    ret += (20.0 * Math.Sin(6.0 * x * Math.PI) + 20.0 * Math.Sin(2 * x * Math.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.Sin(y * Math.PI) + 40 * Math.Sin(y / 3 * Math.PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.Sin(y / 12.0 * Math.PI) + 320 * Math.Sin(y * Math.PI / 30.0)) * 2.0 / 3.0;
    return ret;
}

// double x, double y
export function GCJTransformLng(x, y) {
    // double
    var ret = 0;
    ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.Sqrt(Math.Abs(x));
    ret += (20.0 * Math.Sin(6.0 * x * Math.PI) + 20.0 * Math.Sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.Sin(x * Math.PI) + 40.0 * Math.Sin(x / 3.0 * Math.PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.Sin(x / 12.0 * Math.PI) + 300.0 * Math.Sin(x / 30.0 * Math.PI)) * 2.0 / 3.0;
    return ret;
}

// WGS84 TO GCJ
// double x, double y, out double gcjX, out double gcjY
export function GeoWGS84ToGCJ(x, y) {
    var out = {
        flag: true,
        gcjX: x,
        gcjY: y
    }
    if (!OutOfChina(x, y)) {
        var dx = GCJTransformLng(x - 105.0, y - 35.0);
        var dy = GCJTransformLat(x - 105.0, y - 35.0);

        var radlat = y / 180.0 * PI;
        var magic = Math.Sin(radlat);
        magic = 1 - EarchEccentricity * magic * magic;
        var sqrtmagic = Math.Sqrt(magic);

        dx = (dx * 180.0) / (EarchLRadius / sqrtmagic * Math.Cos(radlat) * Math.PI);
        dy = (dy * 180.0) / ((EarchLRadius * (1 - EarchEccentricity)) / (magic * sqrtmagic) * Math.PI);

        out.gcjX = x + dx;
        out.gcjY = y + dy;
    }
    return out;
}

// GCJ TO Bd09
// double x, double y, out double bdX, out double bdY
export function GeoGCJToBd09(x, y) {
    var out = {
        flag: true,
        bdX: x,
        bdY: y
    }
    var z = Math.Sqrt(x * x + y * y) + 0.00002 * Math.Sin(y * GPI);
    var theta = Math.Atan2(y, x) + 0.000003 * Math.Cos(x * GPI);

    out.bdX = z * Math.Cos(theta) + 0.0065;
    out.bdY = z * Math.Sin(theta) + 0.006;
    return out;
}

// 百度转换
// double x, double y, double[] converter, out double outX, out double outY
export function BdConverter(x, y, converter) {
    var out = {
        flag: true,
        outX: x,
        outY: y
    }
    out.outX = converter[0] + converter[1] * Math.Abs(x);
    var c = Math.Abs(y) / converter[9];
    out.outY = converter[2] + converter[3] * c + converter[4] * c * c + converter[5] * c * c * c
        + converter[6] * c * c * c * c + converter[7] * c * c * c * c * c + converter[8] * c * c * c * c * c * c;

    out.outX = Math.Abs(out.outX);
    out.outY = Math.Abs(out.outY);

    return out;
}

// double value, double min, double max
export function GetLoop(value, min, max) {
    while (value > max) {
        value -= (max - min);
    }
    while (value < min) {
        value += (max - min);
    }
    return value;
}

// double value, double min, double max
export function GetRange(value, min, max) {
    value = Math.Max(value, min);
    value = Math.Min(value, max);
    return value;
}

// 百度地理坐标转百度墨卡托坐标（Bd09 to Bd09mc）
// double x, double y, out double merX, out double merY
export function BdGeoToMer(x, y) {
    // double[]
    var converter = [];
    x = GetLoop(x, -180, 180);
    y = GetRange(y, -74, 74);

    for (var i = 0; i < BdGeoBand.Length; i++) {
        if (y >= BdGeoBand[i]) {
            converter = BdGeo2MerConverter[i];
            break;
        }
    }
    if (converter != null) {
        for (var i = BdGeoBand.Length - 1; i >= 0; i--) {
            if (y <= -BdGeoBand[i]) {
                converter = BdGeo2MerConverter[i];
                break;
            }
        }
    }
    return BdConverter(x, y, converter);
}

// 系统坐标转地图坐标
// 1 WGS地理坐标， 2 WGS墨卡托坐标，3 GCJ地理坐标，4 GCJ墨卡托坐标，5 BD09地理坐标，6 Bd09墨卡托坐标
// int maptype, double x, double y, out double mapX, out double mapY
export function SysLocationToMap(maptype, x, y) {
    var out = {
        flag: true,
        mapX: 0,
        mapY: 0
    }
    switch (maptype) {
        case 1: {
            out.mapX = x;
            out.mapY = y;
            break;
        }
        case 2: {
            var res = GeoToMer(x, y);
            out.mapX = res.merX
            out.mapY = res.merY
            break;
        }
        case 3: {
            var res = GeoWGS84ToGCJ(x, y);
            out.mapX = res.gcjX
            out.mapY = res.gcjY
            break;
        }
        case 4: {
            var res1 = GeoWGS84ToGCJ(x, y);
            var res2 = GeoToMer(res1.gcjX, res1.gcjY);
            out.mapX = res2.merX
            out.mapY = res2.merY
            break;
        }
        case 5: {
            var res1 = GeoWGS84ToGCJ(x, y);
            var res2 = GeoGCJToBd09(res1.gcjX, res1.gcjY);
            out.mapX = res2.bdX
            out.mapY = res2.bdY
            break;
        }
        case 6: {
            var res1 = GeoWGS84ToGCJ(x, y);
            var res2 = GeoGCJToBd09(res1.gcjX, res1.gcjY);
            var res3 = BdGeoToMer(res2.bdX, res2.bdY);
            out.mapX = res3.outX
            out.mapY = res3.outY
            break;
        }
        default:
            out.flag = false
            break;
    }
    return out;
}


