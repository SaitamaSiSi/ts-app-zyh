
export class EditBayonetInfoViewModel {
    constructor() {
        // BayonetInfoModel[]
        this.BayonetInfoModels = []
        // BayonetTsmRelationModel[]
        this.BayonetTsmRelationModels = []
    }

    BayonetInfos() {
        // BayonetInfos
        var res = []
        this.BayonetInfoModels.forEach(r => {
            res.push(r.BayonetInfo)
        });
        return res
    }
}