import {Injectable} from '@angular/core';
import {Subject}    from 'rxjs/Subject';
@Injectable()
export class MissionService {

    // Observable string sources
    missionAnnounced = new Subject<string>();
    missionConfirmed = new Subject<string>();

    // Service message commands
    announceMission(mission: string) {
        this.missionAnnounced.next(mission);
    }
    confirmMission(astronaut: string) {
        this.missionConfirmed.next(astronaut);
    }
}
