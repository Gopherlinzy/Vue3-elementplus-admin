

declare namespace API {
    type loginForm = {
        login_id: string,
        password: string,
        captcha_id: string,
        captcha_answer: string,
    }

    type menuForm = {
        id: number,
        name: string,
        permissions: string,
        router_name: string,
        router_path: string,
        vue_path: string,
        status: boolean,
        created_at: string
    }
}