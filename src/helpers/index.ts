// eslint-disable-next-line no-unused-vars
const getPermission = (title: string, options: any) => {
    Notification.requestPermission(permission => {
        if (permission === 'granted') { // Если права успешно получены, отправляем уведомление
            // console.log('myLog notification', notification);
        } else {
            // alert('Вы запретили показывать уведомления'); // Юзер отклонил наш запрос на показ уведомлений
        }
    });
};
export const sendNotification = (title: string, options: any) => {
    if (!('Notification' in window)) {
        alert('Ваш браузер не поддерживает HTML Notifications, его необходимо обновить.');
    } else if (Notification.permission === 'granted') { // Проверим, есть ли права на отправку уведомлений
        // Если права есть, отправим уведомление
        const notification = new Notification(title, options);

        notification.onclick = () => {
            alert('Пользователь кликнул на уведомление');
        };
    } else if (Notification.permission !== 'denied') { // Если прав нет, пытаемся их получить
        getPermission(title, options);
    } else {
        // Пользователь ранее отклонил наш запрос на показ уведомлений
        getPermission(title, options);
    }
};
