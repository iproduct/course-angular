import {Injectable} from '@angular/core';
import {Subject}    from 'rxjs/Subject';
@Injectable()
export class MissionService {

    // Observable string sources
    private _missionAnnounced = new Subject<string>();
    private _missionConfirmed = new Subject<string>();

    public get missionAnnounced() {
        return this._missionAnnounced.asObservable();
    }
    public get missionConfirmed() {
        return this._missionConfirmed.asObservable();
    }

    // Service message commands
    announceMission(mission: string) {
        this._missionAnnounced.next(mission);
    }
    confirmMission(astronaut: string) {
        this._missionConfirmed.next(astronaut);
    }
}
