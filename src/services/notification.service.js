import { notifications } from "@mantine/notifications"

export const parseError = (error) => {
    if(error.response) {
        const errorMessage = error.response.data.error
        notifications.show({
            color: 'red',
            title: 'Error',
            message: errorMessage,
        })
    }
}

export const showSuccess = (message) => {
    notifications.show({
        color: 'green',
        title: 'Success',
        message: message,
    })
}