import { LikerModel } from "./Liker"
import { VacationDraftModel } from "./VacationDraft"

export interface VacationModel extends VacationDraftModel {
    id: string
    createdAt: string
    updatedAt: string
    imageUrl: string
    likers: LikerModel[]
}

