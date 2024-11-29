
import {
    BayonetScheduleMain,
    BayonetSchedule,
    IComboBoxItem,
    BayonetScheduleDetail,
    BayonetScheduleTiming
} from './BaseModel'
import {
    MakeUuid
} from './Utilities'

export class BayonetScheduleTimingVM {
    // BayonetScheduleTiming
    constructor(bayonetScheduleTiming) {
        // TimeSpan
        // this.StartTime = 0
        // TimeSpan
        // this.EndTime = 0
        this.StartHour = bayonetScheduleTiming.StartHour
        this.StartMin = bayonetScheduleTiming.StartMin
        this.EndHour = bayonetScheduleTiming.EndHour
        this.EndMin = bayonetScheduleTiming.EndMin
    }

    GenerateBayonetScheduleTiming(){
        var ret = new BayonetScheduleTiming()
        ret.StartHour = this.StartHour
        ret.StartMin = this.StartMin
        ret.EndHour = this.EndHour
        ret.EndMin = this.EndMin
        return ret
    }
}

export class BayonetScheduleDetailVM {
    // BayonetScheduleDetail
    constructor(bayonetScheduleDetail) {
        // Date
        this.StartDate = null
        // Date
        this.EndDate = null
        // IComboBoxItem
        this.ScheduleWeek = null
        // IComboBoxItem[]
        this.DayOfWeeks = []
        // BayonetScheduleTimingVM[]
        this.BayonetScheduleTimingVMs = []
        // BayonetScheduleTimingVM
        this.CurrentBayonetScheduleTimingVM = null

        this.DayOfWeeks.push(new IComboBoxItem(0, '星期日'))
        this.DayOfWeeks.push(new IComboBoxItem(1, '星期一'))
        this.DayOfWeeks.push(new IComboBoxItem(2, '星期二'))
        this.DayOfWeeks.push(new IComboBoxItem(3, '星期三'))
        this.DayOfWeeks.push(new IComboBoxItem(4, '星期四'))
        this.DayOfWeeks.push(new IComboBoxItem(5, '星期五'))
        this.DayOfWeeks.push(new IComboBoxItem(6, '星期六'))

        this.StartDate = bayonetScheduleDetail.StartDate
        this.EndDate = bayonetScheduleDetail.EndDate
        this.ScheduleWeek = this.DayOfWeeks.find(t => t.Value === bayonetScheduleDetail.Week)
        bayonetScheduleDetail.BayonetScheduleTimings.forEach(r => {
            this.BayonetScheduleTimingVMs.push(
                new BayonetScheduleTimingVM(r)
            )
        });
    }

    DateStart() {
        return new Date(2000, 0, 1)
    }

    DateEnd() {
        return new Date(2000, 11, 31)
    }

    GenerateBayonetScheduleDetail() {
        var ret = new BayonetScheduleDetail()
        ret.StartDate = this.StartDate
        ret.EndDate = this.EndDate
        ret.Week = this.ScheduleWeek.Value
        this.BayonetScheduleTimingVMs.forEach(r => {
            ret.BayonetScheduleTimings.push(r.GenerateBayonetScheduleTiming())
        });
        return ret
    }
}

export class BayonetScheduleVM {
    // BayonetSchedule
    constructor(bayonetSchedule) {
        this.ID = ''
        this.SCHEDULE_NAME = ''
        // BayonetScheduleDetailVM
        this.CurrentBayonetScheduleWeekDetailVM = null
        // BayonetScheduleDetailVM
        this.CurrentBayonetScheduleDateDetailVM = null
        // BayonetScheduleDetailVM[]
        this.BayonetScheduleDetailVMs_Week = []
        // BayonetScheduleDetailVM[]
        this.BayonetScheduleDetailVMs_Date = []
        this.ScheduleDetail = ''
        this.IsChecked = false

        this.ID = bayonetSchedule.ID
        this.SCHEDULE_NAME = bayonetSchedule.SCHEDULE_NAME

        var GetBayonetScheduleDate = bayonetSchedule.GetBayonetScheduleDate()
        if (GetBayonetScheduleDate !== null) {
            GetBayonetScheduleDate.Days.forEach(r => {
                this.BayonetScheduleDetailVMs_Date.push(
                    new BayonetScheduleDetailVM(r)
                )
            });
        }
        if (BayonetScheduleDetailVMs_Date.length > 0) {
            this.CurrentBayonetScheduleDateDetailVM = BayonetScheduleDetailVMs_Date[0]
        }

        var GetBayonetScheduleWeek = bayonetSchedule.GetBayonetScheduleWeek()
        if (GetBayonetScheduleWeek !== null) {
            GetBayonetScheduleWeek.Weeks.forEach(r => {
                this.BayonetScheduleDetailVMs_Week.push(
                    new BayonetScheduleDetailVM(r)
                )
            });
        }
        if (GetBayonetScheduleWeek.length > 0) {
            this.CurrentBayonetScheduleWeekDetailVM = GetBayonetScheduleWeek[0]
        }
    }

    GenerateBayonetScheduleMainDate() {
        var ret = new BayonetScheduleMain()
        this.BayonetScheduleDetailVMs_Date.forEach(r => {
            r.Days.push(r.GenerateBayonetScheduleDetail())
        });
        return ret
    }

    GenerateBayonetScheduleMainWeek() {
        var ret = new BayonetScheduleMain()
        this.BayonetScheduleDetailVMs_Week.forEach(r => {
            r.Days.push(r.GenerateBayonetScheduleDetail())
        });
        return ret
    }

    GenerateBayonetSchedule() {
        var ret = new BayonetSchedule()
        if (this.ID === null || this.ID === '') {
            ID = MakeUuid(32, 16)
        }
        ret.ID = this.ID
        ret.SCHEDULE_NAME = this.SCHEDULE_NAME
        ret.SetBayonetScheduleDate(this.GenerateBayonetScheduleMainDate())
        ret.SetBayonetScheduleWeek(this.GenerateBayonetScheduleMainWeek())
        return ret
    }
}

export class EditBayonetScheduleVM {
    constructor() {
        // BayonetScheduleVM[]
        this.BayonetScheduleVMs = []
        // BayonetScheduleVM
        this.CurrentBayonetScheduleVM = null
    }

    CanEditDetail() {
        return this.CurrentBayonetScheduleVM !== null
    }
}


