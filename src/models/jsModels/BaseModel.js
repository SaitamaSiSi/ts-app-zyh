
/*
  nuget包、程序集类
*/
export class BayonetInfo {
    constructor() {
        this.BAYONET_ID = ''
        this.BAYONET_NAME = ''
        this.BAYONET_DESC = ''
    }
}

export class BayonetPlate {
    constructor() {
        this.VIP_PLATE_ID = ''
        this.VIP_PRIORITY = 0
    }
}

export class BayonetTsmRelation {
    constructor() {
        this.TSMID = 0
        this.BAYONET_ID = ''
        this.BAYONET_TYPE = 0
    }
}

export class BayonetVipDetail {
    constructor() {
        this.VIP_ID = 0
        this.TSMID = 0
        this.VIPORDER = 0
        this.VIPCTYPE = 0
        this.VIPDATA_A = 0
        this.VIPDATA_B = 0
        this.BAYONET_ID_S = ''
        this.BAYONET_ID_E = ''
        this.VIPCTIME_S = 0
        this.VIPCTIME_E = 0
        this.VIP_PHASIC = 0
        this.VIP_TIME_REMAIN = 0
        // byte
        this.VIP_PP_TSM = null
    }
}

export class BayonetVipMain {
    constructor() {
        this.VIP_ID = 0
        this.VIP_NAME = ''
        this.VIP_NUM = 0
        this.VIP_DESC = ''
        this.VIP_STATUS = 0
        this.VIP_PLATE = ''
        this.VIP_CONTRAREA = 0
        this.VIP_BAYONET_ET = 0
        this.VIP_TYPE = 0
        // byte
        this.VIP_PP_LINE = null
        // BayonetVipDetail[]
        this.BayonetVipDetails = []
        // string[]
        this.BayonetLinePlates = []
        // string[]
        this.BayonetLineSchs = []
    }
}

export class BayonetScheduleMain {
    constructor() {
        // BayonetScheduleDetail[]
        this.Weeks = []
        // BayonetScheduleDetail[]
        this.Days = []
    }
}

export class BayonetSchedule {
    constructor() {
        this.ID = ''
        this.SCHEDULE_NAME = ''
        this.SCHEDULE_WEEK = ''
        this.SCHEDULE_DATE = ''
    }

    GetBayonetScheduleDate() {
        if (this.SCHEDULE_DATE == null) {
            return null
        }
        return JSON.parse < BayonetScheduleMain > (this.SCHEDULE_DATE)
    }

    GetBayonetScheduleWeek() {
        if (this.SCHEDULE_WEEK == null) {
            return null
        }
        return JSON.parse < BayonetScheduleMain > (this.SCHEDULE_WEEK)
    }

    SetBayonetScheduleDate(date) {
        this.SCHEDULE_DATE = JSON.stringify(date);
    }

    SetBayonetScheduleWeek(week) {
        this.SCHEDULE_WEEK = JSON.stringify(week);
    }
}

export class BayonetScheduleTiming {
    constructor() {
        this.StartHour = 0
        this.StartMin = 0
        this.EndHour = 23
        this.EndMin = 59
    }
}

export class BayonetScheduleDetail {
    constructor() {
        this.Week = 0
        this.StartDate = new Date(2000, 0, 1)
        this.EndDate = new Date(2000, 11, 31)
        // BayonetScheduleTiming[]
        this.BayonetScheduleTimings = []
    }
}

export class XZAreaInfo {
    constructor() {
        this.AreaID = 0
        this.AreaName = ''
        this.Description = ''
        this.AreaCode = 0
        this.AreaDesc = ''
    }
}

export class TsmBase {
    constructor() {
        this.BDI_SOURCE = 0
        this.IOM_ONLINE = 0
        this.TsmId = 0
        this.Address = ''
        this.TsmDesc = ''
        this.AreaID = 0
        this.AreaName = ''
        this.Longitude = 0.0
        this.Latitude = 0.0
        this.IP = ''
        this.Version = ''
        this.LastSyntime = new Date()
        this.LastBackTime = new Date()
        this.HandDisplay = 0
        this.HandType = 0
        this.IsVDetect = 0
        this.IsSingleAdapt = false
        this.LastJiaoShi = new Date()
        this.TimeDiv = 0
        this.IsEleDoor = 0
        this.Identification = ''
        this.TsmAlarm = 0
        this.TsmRType = ''
        this.IsVtsm = 0
        this.IsLdMan = 0
        this.IsSimAdp = 0
        this.HardwareId = ''
        this.StandardFlg = ''
        this.KBCD_SCHID_ALL = 0
        this.KBCD_SCHID_TMP = 0
        this.KBCD_PHASETAB = 0
        this.ADAP_NOR_SCHID = 0
        this.ADAP_GY_SCHID = 0
        this.ADAP_SCH_NUM = 0
        this.KBCDChangeTime = 0
        this.DJ_YW_RATE = 0
        this.DSJ_YW_RATE = 0
        this.DOUBLE_CPU = 0
        this.TSM_CO = ''
    }

    IsSupportTimeDirection() {
        if (this.Identification !== null
            && this.Identification !== '' &&
            this.Identification.startsWith('CQEbos')) {
            var dateTimeStr = this.Identification.replace('CQEbos', '')
            var matches = dateTimeStr.match(/(\d{4})(\d{2})(\d{2})/)
            if (matches) {
                var year = parseInt(matches[1], 10)
                var month = parseInt(matches[2], 10) - 1
                var day = parseInt(matches[3], 10)
                var datetime = new Date(year, month, day, 0, 0, 0)
                if (datetime >= new Date(2022, 3, 8, 0, 0, 0)) {
                    return true;
                }
            }
        }
        return false
    }
}

export class PhasicLane {
    constructor() {
        this.LaneId = 0
        this.LampId = 0
        this.OutLaneId = 0
    }
}

export class PhasicBase extends PhasicLane {
    constructor() {
        super()
        this.TsmId = 0
        this.PhasicId = 0
        this.OutputChannel = 0
        this.PhasicType = 0
        this.Induction = 0
        this.PhasicCType = 0
        this.MinGreenTime = 0
        this.MaxGreenTime1 = 0
        this.MaxGreenTime2 = 0
        this.EmptyRedTime = 0
        this.EmptyPersonTime = 0
        this.YellowTime = 0
        this.IsUsed = 0
        this.ConflictPhasic = 0
        this.TsmObj = 0
        this.PhasicPro = 0
        this.PhasicUsed = 0
        this.PhasicDesc = ''
    }
}

export class SchemeStage {
    constructor() {
        this.PhaseId = 0
        this.OpenTime = 0
        this.PhasePhasic = ''
        this.PhaseTsmType = 0
    }
}

export class SchemeInfo {
    constructor() {
        this.HistId = 0
        this.TsmId = 0
        this.SchemeId = 0
        this.PhaseTabId = 0
        this.Cycle = 0
        this.CphaseId = 0
        this.PhaseDiv = 0
        this.PhaseEndType = 0
        this.SchemeDesc = ''
        this.UserId = 0
        this.SchemeType = 0
        this.CreateTime = new Date()
        // SchemeStage[]
        this.SchDetail = []
    }
}

export class PhaseBase {
    constructor() {
        this.PhaseId = 0
        this.PhaseTsmType = 0
        this.PhasePhasic = ''
        this.P_ID = 0
    }
}

export class PhaseStage extends PhaseBase {
    constructor() {
        super()
        this.PhaseAdpType = 0
        this.DegradedMode = 0
        this.PriorLeve = 0
        this.ValueType = 0
        this.LSaturTop = 0.0
        this.LSaturLow = 0.0
        this.LimitPhase = ''
        this.IsCoordBorrow = 0
    }
}

export class PhaseTab {
    constructor() {
        this.TsmId = 0
        this.PhaseTabId = 0
        this.PhaseNum = 0
        this.PhaseDesc = ''
        this.PhaseTabDesc = ''
        this.IsLap = 0
        // PhaseBase[]
        this.BaseDetail = []
        // PhaseStage[]
        this.StageDetail = []
    }
}

export class VipPanelBtn {
    constructor() {
        this.TsmId = 0
        this.BtnId = 0
        this.BtnFun = 0
        this.BtnBX = 0
        this.BtnBY = 0
        this.BtnBR = 0
        this.BtnSX = 0
        this.BtnSY = 0
        this.BtnSR = 0
        this.BtnDesc = ''
        this.Id = ''
        this.ANGLE = 0
        this.DISTANCE = 0
    }
}

export class TsmImgVip {
    constructor() {
        this.TsmId = 0
        // byte[]
        this.VipBtnImg = []
    }
}



/*
  自定义类
*/
export class IComboBoxItem {
    constructor(value, display) {
        // string | number
        this.Value = value
        // string
        this.display = display
        this.Tag = {}
        this.IsSelected = false
    }
}

export class BayonetInfoModel {
    constructor(info) {
        this.BayonetInfo = info
    }
}

export class BayonetTsmRelationModel extends BayonetInfoModel {
    constructor(info) {
        super(info)
        // this.BayonetInfo = info
        this.IsChecked = false
        this.BayonetType = 0
    }
}

export class BayonetPlateModel {
    // BayonetPlate
    constructor(info) {
        this.BayonetPlate = info
        this.IsChecked = false
    }
}

export class TsmSelectedModel {
    // TsmBase
    constructor(tb) {
        this.TB = tb
        this.IsChecked = false
    }

    TsmDesc() {
        return `${this.TB.Address}(编号:${this.TB.TsmId})`
    }
    AppMark() {
        return this.TB.Identification === '' ? '未知' : this.TB.Identification
    }
    SupportTimeDirection() {
        return this.TB.IsSupportTimeDirection()
    }
}

export class TsmConfigModel {
    constructor(info, tsmid, tsmdesc, list1, list2, list3) {
        // Int16
        this.TsmId = tsmid
        // String
        this.TsmDesc = tsmdesc
        // BayonetVipDetail
        this.BayonetVipDetail = info
        // IComboBoxItem[]
        this.BAYONET_ID_Ss = list1
        // IComboBoxItem[]
        this.BAYONET_ID_Es = list2
        // IComboBoxItem[]
        this.Phasics = list3
    }

    // TsmBase[]
    SupportTimeDirection(list) {
        var tb = list.find(t => t.TsmId === this.TsmId)
        return tb.IsSupportTimeDirection()
    }

    BAYONET_ID_S_List() {
        var res = []
        if (this.BayonetVipDetail.BAYONET_ID_S !== null
            && this.BayonetVipDetail.BAYONET_ID_S !== ''
            && this.BayonetVipDetail.BAYONET_ID_S !== '0'
        ) {
            var strs = this.BayonetVipDetail.BAYONET_ID_S.split(',')
            strs.forEach(r => {
                res.push(r)
            })
        }
        return res
    }

    BAYONET_ID_S_Selected() {
        var res = []
        this.BAYONET_ID_Ss.forEach(r => {
            if (r.IsSelected) {
                res.Add(r.Value)
            }
        });
        return res
    }

    BAYONET_ID_S() {
        var res = this.BAYONET_ID_S_Selected()
        if (res.length > 0) {
            return res.join(',')
        }
        return '0'
    }
}


