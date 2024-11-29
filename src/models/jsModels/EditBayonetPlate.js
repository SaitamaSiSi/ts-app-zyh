
export class EditBayonetPlateViewModel {
    constructor() {
        // BayonetPlateModel[]
        this.BayonetPlateModels = []
    }

    BayonetPlates() {
        // BayonetPlate[]
        var res = []
        this.BayonetPlateModels.forEach(r => {
            res.push(r.BayonetPlates)
        });
        return res
    }
}