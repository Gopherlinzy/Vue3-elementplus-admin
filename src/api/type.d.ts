

declare namespace API {
    type loginForm = {
        login_id: string,
        password: string,
        captcha_id: string,
        captcha_answer: string,
    }

    type menuForm = {
        id: number,
        meta: {
            title: string,
            permission: string,
            keepAlive: boolean,
            icon: string,
        }
        name: string,
        path: string,
        parent_id: string,
        component: string,
        status: boolean,
        sort: number,
        created_at: string
    }
}