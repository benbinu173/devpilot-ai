import {
    Injectable,
    signal
} from '@angular/core';

import { Notification } from '../models/notification.interface';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    // =====================================================
    // Notification Queue
    // =====================================================

    readonly notifications = signal<Notification[]>([]);

    // =====================================================
    // Success
    // =====================================================

    success(
        title: string,
        message: string,
        duration = 4000
    ): void {

        this.show(
            'success',
            title,
            message,
            duration
        );

    }

    // =====================================================
    // Error
    // =====================================================

    error(
        title: string,
        message: string,
        duration = 5000
    ): void {

        this.show(
            'error',
            title,
            message,
            duration
        );

    }

    // =====================================================
    // Warning
    // =====================================================

    warning(
        title: string,
        message: string,
        duration = 4500
    ): void {

        this.show(
            'warning',
            title,
            message,
            duration
        );

    }

    // =====================================================
    // Info
    // =====================================================

    info(
        title: string,
        message: string,
        duration = 4000
    ): void {

        this.show(
            'info',
            title,
            message,
            duration
        );

    }

    // =====================================================
    // Remove Notification
    // =====================================================

    remove(id: string): void {

        this.notifications.update(list =>
            list.filter(item => item.id !== id)
        );

    }

    // =====================================================
    // Private
    // =====================================================

    private show(
        type: Notification['type'],
        title: string,
        message: string,
        duration: number
    ): void {

        const notification: Notification = {

            id: crypto.randomUUID(),

            type,

            title,

            message,

            duration

        };

        this.notifications.update(list => [

            ...list,

            notification

        ]);

        setTimeout(() => {

            this.remove(notification.id);

        }, duration);

    }

}