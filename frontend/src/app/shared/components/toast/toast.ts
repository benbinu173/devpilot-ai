import {
    Component,
    inject
} from '@angular/core';

import { NotificationService } from '../../services/notification.service';

@Component({

    selector: 'app-toast',

    standalone: true,

    templateUrl: './toast.html',

    styleUrl: './toast.css'

})
export class Toast {

    private notificationService = inject(NotificationService);

    readonly notifications =
        this.notificationService.notifications;

    remove(id: string): void {

        this.notificationService.remove(id);

    }

}